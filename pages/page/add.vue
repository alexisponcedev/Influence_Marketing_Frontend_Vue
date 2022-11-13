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
          <v-tab v-if="Page.id > 0" href="#Redirection">
            Redirection
          </v-tab>
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
            </v-card-text>
          </v-card>
          <button
            class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
            @click.prevent="submit">Save
          </button>
          <!--          <page-preview :value="Page.widgets ?? Page.draft" class="tw-bg-white tw-mt-10 tw-rounded-lg"/>-->

          <div v-if="Page.id > 0">
            <div class="tw-text-xl tw-mb-4">Live Preview</div>

            <!--            <page-preview :value="Page.widgets ?? Page.draft" class="tw-bg-white tw-mt-10 tw-rounded-lg"/>-->

            <iframe style="min-height: 700px" @load="iframeLoaded" ref="iframe" :src="liveWebsite" frameborder="0"
                    class="tw-w-full"/>
          </div>
        </v-tab-item>

        <v-tab-item value="Metas">
          <form-field-meta :field="formFields[2]" v-model="Page"/>

          <button
            class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
            @click.prevent="submit">Save
          </button>

        </v-tab-item>
        <v-tab-item value="Live">
          <iframe style="min-height: 700px" :src="liveWebsite" frameborder="0" class="tw-w-full"/>
        </v-tab-item>

        <v-tab-item value="Redirection">
          <pages-page-redirection :Page="Page"/>
        </v-tab-item>

      </v-tabs-items>
    </v-form>

    <template-selector @template-selected="templateSelected" ref="templateSelector"/>

    <loading-overlay :show="Api.Page.loading || Api.Redirect.loading"/>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import Validation from "@/utils/validation";
import {Page} from "@/repositories";
import {FormField} from "@/models";
import {Api} from "@/store";
import HoverButton from "~/components/base/HoverButton.vue";
import {UrlTypeEnum} from "~/interfaces/UrlTypeEnum";


import html2canvas from 'html2canvas';
import {SettingEnum} from "~/interfaces/SettingEnum";

@Component({
  components: {HoverButton},
  layout: "panel"
})
export default class PageForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;

  UrlTypeEnum = UrlTypeEnum;

  Api = Api;

  tab = "";

  showRedirectModal: Boolean = false;

  redirectionObj: any = {id: -1, title: 'Redirect To', value: ''};

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

  livePreviewUrl = '';

  // qrcodeText: string = 'this is a test';

  locations: Array<{ title: string; to: string }> = [];

  formFields: Array<FormField> = [];

  mounted() {
    this.init();
    Api.Setting.getValue(SettingEnum.livePreview).then(value => {
      this.livePreviewUrl = value ? value : '';
    })
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
        to: "/page",
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
    window.open(this.liveWebsite, '_blank');
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

  get liveWebsite() {
    return this.livePreviewUrl + this.Page.route
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
      default:
        break;
    }
  }

  pageTitleChanged() {
    let parentRoute = '/';
    if (this.Page.route && this.Page.route !== '') {
      let lastIndexOf = this.Page.route!.lastIndexOf('/') + 1;
      parentRoute = this.Page.route!.substring(0, lastIndexOf === 0 ? lastIndexOf + 1 : lastIndexOf);
    }
    this.Page.route = parentRoute + this.Page.title
  }

  resetRedirect() {
    this.Page.redirect = '';
    this.submit();
  }

  saveRedirect() {
    this.Page.redirect = this.redirectionObj.value;
    this.showRedirectModal = false;
    this.submit();
  }

  iframeLoaded(e: any) {
    console.log(e);
    console.log(this.$refs.iframe);
  }

  clickDownload() {
    html2canvas(document.querySelector("#qrcodeViewer") as any)
      .then(canvas => {
        let a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "Image.png";
        a.click();
        a.remove();
      });
  }
}
</script>

<style scoped>
a[role='anchor'] {
  color: #002bff;
  width: 100%;
  text-align: center;
  display: block;
  padding: 2px 0px 8px;
}
</style>
