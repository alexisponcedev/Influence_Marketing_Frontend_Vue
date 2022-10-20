<template>
  <v-container fluid>

    <div v-if="editMode" class="d-flex justify-space-between align-center">
      <breadcrumbs :locations="locations"/>
      <div class="tw-flex tw-items-center tw-space-x-2">
        <v-btn elevation="0" outlined class="btn" @click="gotoLiveWebsite">
          Live Website
        </v-btn>
        <v-btn elevation="0" color="grey darken-4 white--text" class="btn" @click="goToPageBuilder">
          Go to Page Builder
        </v-btn>
      </div>

    </div>

    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab href="#Details">Page Details</v-tab>
          <v-tab href="#Metas">Page Metas</v-tab>
        </v-tabs>
      </v-col>
    </v-row>


    <v-card>


      <v-tabs-items v-model="tab">
        <v-tab-item value="Details">
          <v-card-text>
            <form-standard
              ref="pagesForm"
              :model="Page"
              :fields="formFields"
              :preview="true"
              @submit="submit"
            />
          </v-card-text>
        </v-tab-item>
        <v-tab-item value="Metas">
          <v-card-text>
            <form-standard
              ref="pagesForm"
              :model="Page"
              :preview="true"
              :fields="formFields"
            />
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>


    </v-card>

    <button
      class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
      @click="submit">Save
    </button>

    <page-preview :value="Page.widgets ?? Page.draft" class="tw-bg-white tw-mt-10 tw-rounded-lg"/>

    <template-selector @template-selected="templateSelected" ref="templateSelector"/>

    <loading-overlay :show="Api.Page.loading"/>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import Validation from "@/utils/validation";
import {Page} from "@/repositories";
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


  meta: Array<{ rel: string, name: string, content: string }> = [];

  Page: Page = {
    title: '',
    route: '',
    meta: [],
    widgets: [],
    draft: [],
    model_id: 0,
    model_type: ''
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
        to: "/page/all",
      },
      {
        title: this.Page.title || "",
        to: "/page/edit/" + this.Page.id!,
      },
    ];
  }

  async initPagesTab() {
    await this.getEntity();
    this.updatePageFormFields();
  }

  async getEntity() {
    if (this.editMode) this.Page = (await Api.Page.get(+this.$route.params.id)) as Page;
  }

  updatePageFormFields() {
    this.formFields = [
      {
        type: "form-field-text",
        label: "Title",
        modelKey: "title",
        placeholder: 'please enter page title',
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
    ];
  }

  updateMetaFormFields() {
    this.formFields = [
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
      Api.Page.clearRoutes();
      if (!this.editMode) this.$router.push("/page/all");
    }
  }

  formValidate() {
    return (this.$refs.pagesForm as any).validate();
  }

  gotoLiveWebsite(){
    window.open('https://public.stage.hisenseportal.com' + this.Page.route , '_blank');
  }

  goToPageBuilder() {
    if (!this.Page.widgets || this.Page.widgets?.length === 0)
      (this.$refs.templateSelector as any).open();
    else
      this.openPageBuilder();
  }

  openPageBuilder() {
    this.$router.push(`/page/edit/${this.Page.id}/PageBuilder`);
  }

  templateSelected(template: any) {
    Api.Page.saveDraft({page_id: this.Page.id, page_draft: template.widgets})
      .then(this.openPageBuilder);
  }

  @Watch("tab")
  tabChanged(newTab: string, _: string) {
    switch (newTab) {
      case "Details":
        this.updatePageFormFields();
        break;
      case "Metas" :
        this.updateMetaFormFields();
        break;
      default:
        break;
    }
  }

  get pageTitle() {
    return this.Page.title;
  }

  get pageRoute() {
    return this.Page.route;
  }

  @Watch('pageRoute')
  onPageRouteChanged() {
    this.Page.meta!.forEach(item => {
      if (item.rel.includes('og:url')) item.content = 'https://hisense-usa.com' + this.Page.route;
    })
  }


  @Watch('pageTitle')
  onPageTitleChanged() {
    let parentRoute = '/';
    if (this.Page.route && this.Page.route !== '') {
      let lastIndexOf = this.Page.route!.lastIndexOf('/') + 1;
      parentRoute = this.Page.route!.substring(0, lastIndexOf === 0 ? lastIndexOf + 1 : lastIndexOf);
    }
    this.Page.route = parentRoute + this.Page.title

    this.Page.meta!.forEach(item => {
      if (item.rel.includes('og:title')) item.content = this.Page.title;
      if (item.rel === 'blank' && item.name === 'title') item.content = this.Page.title;
    })
  }


}
</script>
