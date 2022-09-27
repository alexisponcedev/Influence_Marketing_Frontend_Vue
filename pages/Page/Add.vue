<template>
  <v-container fluid>

    <div v-if="editMode" class="d-flex justify-space-between align-center">
      <breadcrumbs  :locations="locations" />
      <v-btn elevation="0" color="grey darken-4 white--text"  class="btn" :to="`/Page/Edit/${Page.id}/PageBuilder`">
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
            :fields="detailsFormFields"
            @submit="submit"
          />
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>

    <loading-overlay :show="Api.Page.loading" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { fromResource } from "@/utils/fromResource";
import Validation from "@/utils/validation";
import { Page } from "@/repositories";
import { FormField } from "@/models";
import { Api } from "@/store";
import selectItems from "~/utils/select-items";
import HoverButton from "~/components/base/HoverButton.vue";

@Component({
  components: {HoverButton},
  layout: "panel" })
export default class PageForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;

  Api = Api;

  tab = "";

  Page: Page = {
    meta : [{rel : '' , name : '' , content : ''}]
  };

  locations: Array<{ title: string; to: string }> = [];

  detailsFormFields: Array<FormField> = [];

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
        title: this.Page.name || "",
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
    this.detailsFormFields = [
      {
        type: "form-field-text",
        label: "Name",
        modelKey: "name",
        placeholder : 'First letter should be capital ex: Product',
        rules: [Validation.required],
        colAttrs: { cols: 12 },
      },
      {
        type: "form-field-text",
        label: "Route",
        placeholder : 'ex: products/[product_id]',
        modelKey: "route",
        rules: [Validation.required],
        colAttrs: { cols: 12 },
      },
      {
        type: "form-field-text",
        label: "Fetch From Url",
        placeholder : 'ex: https://impim.dev-api.hisenseportal.com/api/',
        modelKey: "fetchUrl",
        rules: [Validation.url],
        colAttrs: { cols: 12 },
      },
      {
        type: "form-field-checkbox",
        label: "Show Header",
        modelKey: "showHeader",
        rules: [],
        colAttrs: { cols: 3 },
      },
      {
        type: "form-field-checkbox",
        label: "Show Footer",
        modelKey: "showFooter",
        rules: [],
        colAttrs: { cols: 9 },
      },
      {
        label: "Theme",
        modelKey: "theme",
        "item-text": "title",
        "item-value": "value",
        placeholder : 'Select theme of this page',
        type: "form-field-select",
        rules: [Validation.required],
        items: selectItems.themes,
        colAttrs: { cols: 6 },
      },
      {
        type: "form-field-text",
        label: "Page Custom Class",
        placeholder : 'ex: bg-gray-50 text-black hover:red-500 transition duration-100 ...',
        modelKey: "class",
        rules: [],
        colAttrs: { cols: 6 },
      },
      {
        type: "form-field-meta",
        label: "Meta",
        modelKey: "meta",
        rules: [],
        colAttrs: { cols: 12 },
      },
    ];
  }

  // async detailsFormSubmit() {
  //   if (this.formValidate()) {
  //     if (this.editMode)
  //       await Api.Page.update({
  //         id: +this.Page.id!,
  //         Page: this.Page,
  //       });
  //     else await Api.Page.create(this.Page);
  //     if (!this.editMode) this.$router.push("/Page/All");
  //   }
  // }

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
