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
          <!--          <v-tab href="#Live">Live Preview</v-tab>-->
        </v-tabs>
      </v-col>
    </v-row>

    <v-form ref="form" @submit.prevent="submit">
      <v-tabs-items v-model="tab" style="background-color: transparent !important;">
        <v-tab-item value="Details">
          <v-card>
            <v-card-text>
              <form-field-text :field="formFields[0]" v-model="Page.title" @input="pageTitleChanged"/>
              <form-field-select-page-route :field="formFields[1]" v-model="Page.route" :pageId="Page.id"/>

              <structure-editor-url
                :inline="true"
                v-model="editingItem"/>

<!--              <p>In case you want to redirect the page from this url please set the target url</p>-->
                <button @click.prevent="resetRedirect" v-if="editingItem.value !== ''" class="tw-ml-2 tw-text-blue-500 tw-bg-gray-50 tw-py-1.5 tw-px-2 tw-rounded-lg">Remove Redirect</button>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="Metas">
          <form-field-meta :field="formFields[2]" v-model="Page.meta" :route="Page.route"/>
        </v-tab-item>
      </v-tabs-items>
    </v-form>
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

  editingItem: any = {id: -1, title: 'Redirect To', value: ''};

  route: string = '';

  meta: Array<{ rel: string, name: string, content: string }> = [];

  Page: Page = {
    id: 0,
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
    this.initMetaTags();
  }

  initMetaTags() {
    if (this.Page.meta?.length === 0) {
      this.Page.meta = [
        {rel: 'blank', name: 'title', content: ''},
        {rel: 'blank', name: 'description', content: 'Hisense USA'},

        {rel: 'property="og:site_name"', name: 'property="og:site_name"', content: 'Hisense USA'},
        {rel: 'property="og:title"', name: 'property="og:title"', content: ''},
        {rel: 'property="og:description"', name: 'property="og:description"', content: 'Hisense USA'},
        {rel: 'property="og:image"', name: 'property="og:image"', content: ''},
        {rel: 'property="og:url"', name: 'property="og:url"', content: ''},
        {rel: 'property="og:type"', name: 'property="og:type"', content: 'website'},
        {rel: 'property="og:locale"', name: 'property="og:locale"', content: 'en_US'},
      ];
    }
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
    if (this.editMode) {
      this.Page = (await Api.Page.get(+this.$route.params.id)) as Page;
      this.editingItem.value = this.Page.redirect;
    }
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
      if (this.editingItem.value)
        this.Page.redirect = this.editingItem.value;
      else
        this.Page.redirect = '';

      if (this.editMode)
        await Api.Page.update({
          id: +this.Page.id!,
          Page: this.Page,
        });
      else {
        let page = await Api.Page.create(this.Page);
        this.$router.push("/page/edit/" + page.id);
      }
      Api.Page.clearRoutes();
    }
  }

  formValidate() {
    return (this.$refs.form as any).validate();
  }

  gotoLiveWebsite() {
    window.open('https://public.stage.hisenseportal.com' + this.Page.route, '_blank');
  }

  goToPageBuilder() {
    if (
      (!this.Page.widgets || this.Page.widgets?.length === 0)
      &&
      (!this.Page.draft || this.Page.draft?.length === 0)
    )
      (this.$refs.templateSelector as any).open();
    else
      this.openPageBuilder();
  }

  // redirectUrlUpdated(item : any){
  //   this.Page.redirect = item.value;
  // }

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
    if (this.Page.meta)
      this.Page.meta!.forEach((item : any) => {
        if (item.rel && item.rel.includes('og:url')) item.content = 'https://hisense-usa.com' + this.Page.route;
      })
  }

  pageTitleChanged() {
    let parentRoute = '/';
    if (this.Page.route && this.Page.route !== '') {
      let lastIndexOf = this.Page.route!.lastIndexOf('/') + 1;
      parentRoute = this.Page.route!.substring(0, lastIndexOf === 0 ? lastIndexOf + 1 : lastIndexOf);
    }
    this.Page.route = parentRoute + this.Page.title
  }

  @Watch('pageTitle')
  onPageTitleChanged() {
    if (this.Page.meta)
      this.Page.meta!.forEach((item : any) => {
        if (item.rel && item.rel.includes('og:title')) item.content = this.Page.title;
        if (item.rel && item.rel === 'blank' && item.name === 'title') item.content = this.Page.title;
      })
  }
  resetRedirect(){
    // this.Page.redirect = '';
    this.editingItem.value = '';
  }
}
</script>
