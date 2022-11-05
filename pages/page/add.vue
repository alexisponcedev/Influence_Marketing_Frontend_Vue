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
          <v-tab v-if="Page.id > 0" href="#Redirection"> <v-icon v-if="Page.redirect" class="red--text tw-mr-0.5" small>mdi-arrow-right-bold-circle-outline</v-icon> Redirection</v-tab>
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
        <v-tab-item value="Redirection">
          <div v-if="Page.redirect"
               class="tw-w-full tw-bg-white tw-rounded-xl
               tw-p-3  tw-flex tw-items-center tw-justify-between">
            <div v-if="Page.redirect">
              <div class=" tw-ml-2 tw-mb-1">Redirects To</div>
              <h6 class="tw-ml-2">{{ Page.redirect }}</h6>
              <div
                class="tw-w-min  tw-whitespace-nowrap tw-bg-gray-50 tw-rounded-lg tw-px-2 tw-py-1 tw-text-gray-500 tw-text-center">
                <span v-if="Page.redirect.startsWith('Https://')">External URL</span>
                <span v-else>Internal URL</span>
              </div>
            </div>

            <div class="tw-space-x-1">
              <button class="tw-rounded-lg tw-bg-gray-50 tw-p-2" @click.prevent="openRedirectModal">
                <v-icon>mdi-pencil</v-icon>
              </button>
              <button class="tw-rounded-lg tw-bg-gray-50 tw-p-2" @click.prevent="resetRedirect">
                <v-icon>mdi-delete</v-icon>
              </button>
            </div>

          </div>

          <button v-else
                  class="tw-w-full tw-bg-white tw-border tw-border-dashed tw-border-gray-700 tw-rounded-xl tw-text-center
            tw-py-10 hover:tw-bg-gray-50"
                  @click.prevent="openRedirectModal">
            Add Redirection
          </button>

        </v-tab-item>
        <v-tab-item value="qrcode">

          <div class="tw-flex tw-space-x-4">
            <div class="tw-w-60 tw-h-60 tw-rounded-xl tw-bg-white tw-p-3 ">

              <qr-code
                text="https://goo.gl/9eIWP9"
                size="216"
                color="#000"
                bg-color="#fff"
                error-level="L"/>


            </div>

            <div class="tw-bg-white tw-flex-1 tw-rounded-xl tw-p-3">
              here is the links section
            </div>
          </div>

        </v-tab-item>
      </v-tabs-items>
    </v-form>

    <template-selector @template-selected="templateSelected" ref="templateSelector"/>

    <v-dialog v-model="showRedirectModal" max-width="500">
      <v-card>
        <v-card-title>Page Redirection</v-card-title>
        <v-card-text>
          <structure-editor-url
            :showTitle="false"
            :options="[
              {title: 'Internal URL', value: UrlTypeEnum.Internal},
              {title: 'External URL', value: UrlTypeEnum.External},
            ]"
            :inline="false"
            v-model="redirectionObj"/>
        </v-card-text>
        <v-card-actions>
          <v-btn elevation="0" color="grey darken-4 white--text" block class="btn" @click="saveRedirect">
            Add
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

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
import {UrlTypeEnum} from "~/interfaces/UrlTypeEnum";

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
    return 'https://public.stage.hisenseportal.com' + this.Page.route
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

  // get pageTitle() {
  //   return this.Page.title;
  // }

  // get pageRoute() {
  //   return this.Page.route;
  // }

  // @Watch('pageRoute')
  // onPageRouteChanged() {
  //   if (this.Page.meta && Array.isArray(this.Page.meta))
  //     this.Page.meta!.forEach((item: any) => {
  //       if (item.rel && item.rel.includes('og:url')) item.content = 'https://hisense-usa.com' + this.Page.route;
  //     })
  // }

  pageTitleChanged() {
    let parentRoute = '/';
    if (this.Page.route && this.Page.route !== '') {
      let lastIndexOf = this.Page.route!.lastIndexOf('/') + 1;
      parentRoute = this.Page.route!.substring(0, lastIndexOf === 0 ? lastIndexOf + 1 : lastIndexOf);
    }
    this.Page.route = parentRoute + this.Page.title
  }

  // @Watch('pageTitle')
  // onPageTitleChanged() {
  //   if (this.Page.meta) this.Page.meta!.forEach((item: any) => {
  //       if (item.rel && item.rel.includes('og:title')) item.content = this.Page.title;
  //       if (item.rel && item.rel === 'blank' && item.name === 'title') item.content = this.Page.title;
  //     })
  // }

  resetRedirect() {
    this.Page.redirect = '';
    this.submit();
  }

  openRedirectModal() {
    this.redirectionObj.value = this.Page.redirect;
    this.showRedirectModal = true;
  }

  saveRedirect() {
    this.Page.redirect = this.redirectionObj.value;
    this.showRedirectModal = false;
    this.submit();
  }

  onDataUrlChange(dataUrl: string) {
    console.log(dataUrl);
    // this.dataUrl = dataUrl
  }


}
</script>
