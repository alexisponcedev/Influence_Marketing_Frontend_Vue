<template>
  <v-container fluid>
    <breadcrumbs v-if="editMode" :locations="locations" />
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
            ref="detailsForm"
            :model="Page"
            :fields="detailsFormFields"
            @submit="detailsFormSubmit"
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

@Component({ layout: "panel" })
export default class PageForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;

  Api = Api;

  tab = "";

  Page: Page = {};

  locations: Array<{ title: string; to: string }> = [];

  detailsFormFields: Array<FormField> = [];

  mounted() {
    this.init();
  }

  async init() {
    await this.initDetailsTab();
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

  async initDetailsTab() {
    await this.getEntity();
    this.updateDetailsFormFields();
  }

  async getEntity() {
    if (this.editMode)
      this.Page = fromResource<Page>(
        await Api.Page.get(+this.$route.params.id)
      );
  }

  updateDetailsFormFields() {
    this.detailsFormFields = [
      {
        type: "form-field-text",
        label: "Title",
        modelKey: "title",
        rules: [Validation.required],
        colAttrs: { cols: 12 },
      },
      {
        type: "form-field-text",
        label: "URL",
        modelKey: "url",
        colAttrs: { cols: 12 },
      },
    ];
  }

  async detailsFormSubmit() {
    if (this.detailsFormValidate()) {
      if (this.editMode)
        await Api.Page.update({
          id: +this.Page.id!,
          Page: this.Page,
        });
      else await Api.Page.create(this.Page);
      if (!this.editMode) this.$router.push("/Page/All");
    }
  }

  detailsFormValidate() {
    return (this.$refs.detailsForm as any).validate();
  }

  @Watch("tab")
  tabChanged(newTab: string, _: string) {
    switch (newTab) {
      case "Details":
        this.initDetailsTab();
        break;
      default:
        break;
    }
  }
}
</script>
