<template>
  <v-container fluid>
    <breadcrumbs v-if="editMode" :locations="locations" />
    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab href="#Details">Details</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tab">
      <v-tab-item value="Details">
        <v-card-text>
          <form-standard
            ref="detailsForm"
            :model="newBrand"
            :fields="brandFormFields"
            @submit="detailsFormSubmit"
          />
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
    <loading-overlay :show="Api.Brand.loading" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Brand, BrandResource } from "@/repositories";
import { fromResource } from "@/utils/fromResource";
import Validation from "@/utils/validation";
import { FormField } from "@/models";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class BrandForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;

  Api = Api;

  tab = "";

  locations: Array<{ title: string; to: string }> = [];

  newBrand: Brand = {};

  brandFormFields: Array<FormField> = [];
  customFieldsFormForceUpdateIndex = 0;

  async initDetailsTab() {
    await this.getBrand();
    this.updateBrandFormFields();
    this.updateLocations();
  }

  updateLocations() {
    this.locations = [
      {
        title: "Brands",
        to: "/Brand/All",
      },
      {
        title: this.newBrand.name!,
        to: "/Brand/Edit/" + this.newBrand.id,
      },
    ];
  }

  async initCustomFieldsTab() {
    this.customFieldsFormForceUpdateIndex++;
  }

  async getBrand() {
    if (this.editMode)
      this.newBrand = fromResource<Brand>(
        await Api.Brand.get(+this.$route.params.id)
      );
  }

  updateBrandFormFields() {
    this.brandFormFields = [
      {
        label: "Name",
        modelKey: "name",
        type: "form-field-text",
        rules: [Validation.required],
        colAttrs: { cols: 12 },
      },
      {
        type: "form-field-file",
        label: "Logo",
        modelKey: "file",
        if: this.media_upload_show,
        colAttrs: { cols: 12 },
      },
      {
        type: "form-field-preview",
        label: "Logo",
        modelKey: "logo",
        if: this.media_preview_show,
        onClick: this.removeLogo,
        colAttrs: { cols: 12 },
      },
    ];
  }

  get_record_id() {
    return this.newBrand.id!;
  }

  media_preview_show() {
    return this.editMode && !!(this.newBrand as BrandResource).thumbnail;
  }

  media_upload_show() {
    return (
      !this.editMode ||
      (this.editMode && !(this.newBrand as BrandResource).thumbnail)
    );
  }

  removeLogo() {
    (this.newBrand as BrandResource).thumbnail = undefined;
  }

  async detailsFormSubmit() {
    if (this.formValidate()) {
      if (this.editMode && this.newBrand.id)
        await Api.Brand.update({
          id: this.newBrand.id,
          name: this.newBrand.name!,
          file: (this.newBrand as any).file,
        });
      else
        await Api.Brand.create({
          name: this.newBrand.name!,
          file: (this.newBrand as any).file,
        });
      if (!this.editMode) this.$router.push("/Brand/All");
    }
  }

  formValidate() {
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
