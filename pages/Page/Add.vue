<template>
  <v-container fluid>

    <div v-if="editMode" class="d-flex justify-space-between align-center">
      <breadcrumbs :locations="locations"/>
      <v-btn elevation="0" color="grey darken-4 white--text" class="btn" @click="goToPageBuilder">
        Go to Page Builder
      </v-btn>
    </div>

    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab href="#Details">Page Details</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-tabs-items v-model="tab">
      <v-tab-item value="Details">
        <v-card-text>
          <form-standard
            ref="pagesForm"
            :model="Page"
            :fields="formFields"
            @submit="submit"
          />
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>

    <page-preview :value="Page.widgets" class="tw-bg-white tw-mt-10 tw-rounded-lg"/>

    <template-selector @template-selected="templateSelected" ref="templateSelector"/>

    <loading-overlay :show="Api.Page.loading"/>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import Validation from "@/utils/validation";
import {Page, Template} from "@/repositories";
import {FormField} from "@/models";
import {Api} from "@/store";
import HoverButton from "~/components/base/HoverButton.vue";

@Component({
  components: {HoverButton},
  layout: "panel"
})
export default class PageForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;

  Api = Api;

  tab = "";

  Page: Page = {
    meta: [],
    widgets: [],
    draft: [],
    model_id : 0,
    model_type : ''
  };

  locations: Array<{ title: string; to: string }> = [];

  formFields: Array<FormField> = [];

  mounted() {
    this.init();
  }

  async init() {
    await this.initPagesTab();
    this.updateLocations();
  }

  updateLocations() {
    this.locations = [
      {
        title: "Pages",
        to: "/Page/All",
      },
      {
        title: this.Page.title || "",
        to: "/Page/Edit/" + this.Page.id!,
      },
    ];
  }

  async initPagesTab() {
    await this.getEntity();
    this.updatePageFormFields();
  }

  async getEntity() {
    if (this.editMode)
      this.Page = (await Api.Page.get(+this.$route.params.id)) as Page;
  }

  updatePageFormFields() {
    this.formFields = [
      {
        type: "form-field-text",
        label: "Title",
        modelKey: "title",
        placeholder: 'First letter should be capital ex: Product',
        rules: [Validation.required],
        colAttrs: {cols: 12},
      },
      {
        type: "form-field-select-page-route",
        label: "Page URL",
        modelKey: "route",
        rules: [],
        colAttrs: {cols: 12},
      },
      {
        type: "form-field-meta",
        label: "Meta",
        modelKey: "meta",
        rules: [],
        colAttrs: {cols: 12},
      },
    ];
  }

  async submit() {
    if (this.formValidate()) {
      if (this.editMode)
        await Api.Page.update({
          id: +this.Page.id!,
          Page: this.Page,
        });
      else await Api.Page.create(this.Page);
      if (!this.editMode) this.$router.push("/Page/All");
    }
  }

  formValidate() {
    return (this.$refs.pagesForm as any).validate();
  }

  goToPageBuilder() {
    if (!this.Page.widgets || this.Page.widgets?.length === 0)
      (this.$refs.templateSelector as any).open();
    else
      this.openPageBuilder();
  }

  openPageBuilder() {
    this.$router.push(`/Page/Edit/${this.Page.id}/PageBuilder`);
  }

  templateSelected(template: any) {
    Api.Page.savePageWidgets({ page_id : this.Page.id , widgets :  template.widgets})
      .then(this.openPageBuilder);
  }

  @Watch("tab")
  tabChanged(newTab: string, _: string) {
    switch (newTab) {
      case "Details":
        this.initPagesTab();
        break;
      default:
        break;
    }
  }


}
</script>
