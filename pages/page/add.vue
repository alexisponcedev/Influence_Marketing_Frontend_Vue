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
            <!--            <v-icon v-if="Page.redirect" class="red&#45;&#45;text tw-mr-0.5" small>mdi-arrow-right-bold-circle-outline</v-icon>-->
            Redirection
          </v-tab>
          <v-tab v-if="Page.id > 0" href="#qrcode">QR Code</v-tab>
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

              <!--              <v-col>-->
              <!--                <div v-if="Page.redirect" class="tw-flex tw-w-min tw-whitespace-nowrap tw-items-center tw-space-x-2 tw-bg-gray-50 tw-rounded-lg-->
              <!--                tw-p-2 tw-cursor-pointer" @click="tab='Redirection'">-->
              <!--                  <div>This page redirect to <span class="tw-font-bold tw-text-red-500">{{ Page.redirect }}</span></div>-->
              <!--                </div>-->
              <!--              </v-col>-->

            </v-card-text>
          </v-card>
          <button
            class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
            @click="submit">Save
          </button>
          <page-preview :value="Page.widgets ?? Page.draft" class="tw-bg-white tw-mt-10 tw-rounded-lg"/>
        </v-tab-item>
        <v-tab-item value="Metas">
          <!--          <form-field-meta :field="formFields[2]" v-model="Page.meta" :route="Page.route"/>-->
          <form-field-meta :field="formFields[2]" v-model="Page"/>
          <button
            class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
            @click="submit">Save
          </button>

        </v-tab-item>
        <v-tab-item value="Live">
          <iframe :src="liveWebsite" frameborder="0" class="tw-w-full tw-h-screen"/>
        </v-tab-item>

        <!--        <v-tab-item value="Redirection">-->
        <!--          <div v-if="Page.redirect"-->
        <!--               class="tw-w-full tw-bg-white tw-rounded-xl-->
        <!--               tw-p-3  tw-flex tw-items-center tw-justify-between">-->
        <!--            <div v-if="Page.redirect">-->
        <!--              <div class=" tw-ml-2 tw-mb-1">Redirects To</div>-->
        <!--              <h6 class="tw-ml-2">{{ Page.redirect }}</h6>-->
        <!--              <div-->
        <!--                class="tw-w-min  tw-whitespace-nowrap tw-bg-gray-50 tw-rounded-lg tw-px-2 tw-py-1 tw-text-gray-500 tw-text-center">-->
        <!--                <span v-if="Page.redirect.startsWith('Https://')">External URL</span>-->
        <!--                <span v-else>Internal URL</span>-->
        <!--              </div>-->
        <!--            </div>-->

        <!--            <div class="tw-space-x-1">-->
        <!--              <button class="tw-rounded-lg tw-bg-gray-50 tw-p-2" @click.prevent="openRedirectModal">-->
        <!--                <v-icon>mdi-pencil</v-icon>-->
        <!--              </button>-->
        <!--              <button class="tw-rounded-lg tw-bg-gray-50 tw-p-2" @click.prevent="resetRedirect">-->
        <!--                <v-icon>mdi-delete</v-icon>-->
        <!--              </button>-->
        <!--            </div>-->

        <!--          </div>-->
        <!--          <button v-else-->
        <!--                  class="tw-w-full tw-bg-white tw-border tw-border-dashed tw-border-gray-700 tw-rounded-xl tw-text-center-->
        <!--            tw-py-10 hover:tw-bg-gray-50"-->
        <!--                  @click.prevent="openRedirectModal">-->
        <!--            Add Redirection-->
        <!--          </button>-->
        <!--        </v-tab-item>-->


        <v-tab-item value="Redirection">
          <pages-page-redirection :Page="Page"/>
        </v-tab-item>

        <v-tab-item value="qrcode">

          <div class="tw-flex tw-space-x-4">
            <div class="tw-space-y-2">
              <div class="tw-w-60 tw-min-h-60 tw-rounded-xl tw-bg-white tw-p-3 " id="qrcodeViewer">
                <qr-code
                  :text="qrcodeText"
                  size="216"
                  color="#000"
                  bg-color="#fff"
                  error-level="L"/>
              </div>
              <button href="javascript:" class="tw-w-full tw-rounded-lg tw-text-center tw-py-2 tw-bg-white"
                      @click.prevent="clickDownload">Download
              </button>

            </div>

            <div class="tw-bg-white tw-flex-1 tw-rounded-xl tw-p-3">
              <input type="text" v-model="qrcodeText"/>
              <pre>{{ qrcodeText }}</pre>
              here is the links section
            </div>
          </div>

        </v-tab-item>
      </v-tabs-items>
    </v-form>

    <template-selector @template-selected="templateSelected" ref="templateSelector"/>

    <!--    <v-dialog v-model="showRedirectModal" max-width="500">-->
    <!--      <v-card>-->
    <!--        <v-card-title>Page Redirection</v-card-title>-->
    <!--        <v-card-text>-->
    <!--          <structure-editor-url-->
    <!--            :showTitle="false"-->
    <!--            :options="[-->
    <!--              {title: 'Internal URL', value: UrlTypeEnum.Internal},-->
    <!--              {title: 'External URL', value: UrlTypeEnum.External},-->
    <!--            ]"-->
    <!--            :inline="false"-->
    <!--            v-model="redirectionObj"/>-->
    <!--        </v-card-text>-->
    <!--        <v-card-actions>-->
    <!--          <v-btn elevation="0" color="grey darken-4 white&#45;&#45;text" block class="btn" @click="saveRedirect">-->
    <!--            Add-->
    <!--          </v-btn>-->
    <!--        </v-card-actions>-->

    <!--      </v-card>-->
    <!--    </v-dialog>-->

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

  qrcodeText: string = 'this is a test';

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

  // openRedirectModal() {
  //   this.redirectionObj.value = this.Page.redirect;
  //   this.showRedirectModal = true;
  // }

  saveRedirect() {
    this.Page.redirect = this.redirectionObj.value;
    this.showRedirectModal = false;
    this.submit();
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
