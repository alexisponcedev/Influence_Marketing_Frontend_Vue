<template>
  <v-container fluid>

    <div v-if="editMode" class="d-flex justify-space-between align-center">
      <breadcrumbs :locations="locations"/>
    </div>

    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab href="#Redirects">Redirect Details</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-form ref="form" @submit.prevent="submit">
    <v-tabs-items v-model="tab">
      <v-tab-item value="Redirects">
        <v-card-text>

          <v-row>
            <form-field-select-page-name
              :field="selectField"
              v-model="Redirect.page_id"
              :rules="selectField.rules"
              :placeholder="selectField.placeholder"/>


            <form-field-select :field="redirectionTypeField" v-model="Redirect.redirect_type"/>

            <form-field-select :field="redirectionCodeField" v-model="Redirect.redirect_code"/>

            <v-col>
              <hr class="tw-bg-gray-500" />
            </v-col>

            <structure-editor-url :showTitle="false" :hasBackground="false" :inline="true" :options="options" v-model="redirectionObj"/>

          </v-row>




        </v-card-text>



      </v-tab-item>


    </v-tabs-items>

    </v-form>

    <button
      class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
      @click="submit">Save
    </button>


    <loading-overlay :show="Api.Redirect.loading"/>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import Validation from "@/utils/validation";
import {Redirect} from "@/repositories";
import {FormField} from "@/models";
import {Api} from "@/store";
import HoverButton from "~/components/base/HoverButton.vue";
import {RedirectCodeEnum, RedirectTypeEnum} from "~/interfaces/RedirectTypeEnum";
import {UrlTypeEnum} from "~/interfaces/UrlTypeEnum";

@Component({
  components: {HoverButton},
  layout: "panel"
})
export default class EntityForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;

  Api = Api;

  tab = "";

  selectField = {
    label: "Page",
    placeholder: 'Enter page name',
    'item-text': 'title',
    'item-value': 'id',
    rules: [],
    colAttrs: {cols: 6},
  }

  redirectionTypeField = {
    label: 'Redirection Type',
    rules: [],
    'item-text': 'title',
    'item-value': 'value',
    colAttrs: {cols: 3},
    items: [
      {title: RedirectTypeEnum.To, value: RedirectTypeEnum.To},
      {title: RedirectTypeEnum.From, value: RedirectTypeEnum.From},
    ]
  }

  redirectionCodeField = {
    label: 'Redirection Code',
    rules: [],
    'item-text': 'title',
    'item-value': 'value',
    colAttrs: {cols: 3},
    items: [
      {title: '301', value: RedirectCodeEnum.code301},
      {title: '302', value: RedirectCodeEnum.code302},
      {title: '303', value: RedirectCodeEnum.code303},
      {title: '307', value: RedirectCodeEnum.code307},
      {title: '308', value: RedirectCodeEnum.code308},
    ]
  }

  redirectionObj: any = {id: -1, title: 'Redirect To', value: '' , redirection_code : 301};

  options = [
    {title: 'Page URLs', value: UrlTypeEnum.Internal},
    {title: 'Custom URL', value: UrlTypeEnum.Custom},
  ]

  Redirect: Redirect = {
    id: 0,
    page_id : 0,
    redirect_code : RedirectCodeEnum.code301,
    redirect_url : '',
    redirect_type : RedirectTypeEnum.To
  };

  locations: Array<{ title: string; to: string }> = [];

  formFields: Array<FormField> = [];

  mounted() {
    this.init();
  }

  async init() {
    await this.initRedirectsTab();
    this.updateLocations();
  }

  updateLocations() {
    this.locations = [
      {
        title: "Redirects",
        to: "/redirection",
      },
      {
        title: this.Redirect.redirect_url || "",
        to: "/redirection/edit/" + this.Redirect.id!,
      },
    ];
  }

  async initRedirectsTab() {
    await this.getEntity();
    this.updateRedirectFormFields();
  }

  async getEntity() {
    if (this.editMode)
    {
      this.Redirect = (await Api.Redirect.get(+this.$route.params.id)) as Redirect;
      this.redirectionObj.redirection_url;
    }
  }

  updateRedirectFormFields() {
    this.formFields = [
      {
        type: "form-field-text",
        label: "Name",
        modelKey: "name",
        placeholder: 'enter the redirect name',
        rules: [Validation.required],
        colAttrs: {cols: 12},
      },
    ];
  }

  async submit() {
    if (this.formValidate()) {

      this.Redirect.redirect_url = this.redirectionObj.value;

      if (this.editMode)
        await Api.Redirect.update({
          id: +this.Redirect.id!,
          Redirect: this.Redirect,
        });
      else await Api.Redirect.create(this.Redirect);
      if (!this.editMode) this.$router.push("/redirection");
    }
  }

  formValidate() {
    return (this.$refs.form as any).validate();
  }

  @Watch("tab")
  tabChanged(newTab: string, _: string) {
    switch (newTab) {
      case "Redirects":
        this.initRedirectsTab();
        break;
      default:
        break;
    }
  }


}
</script>
