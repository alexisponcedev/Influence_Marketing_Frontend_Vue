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
            :model="newAdventure"
            :fields="adventureFormFields"
            @submit="detailsFormSubmit"
          />
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
    <loading-overlay :show="Api.Adventure.loading" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Adventure, RegionResource } from "@/repositories";
import { fromResource } from "@/utils/fromResource";
import Validation from "@/utils/validation";
import { FormField } from "@/models";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class AdventureForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;

  Api = Api;

  tab = "";

  locations: Array<{ title: string; to: string }> = [];

  Region: RegionResource = {};
  newAdventure: Adventure = {};
  regionId: number | null = null;

  adventureFormFields: Array<FormField> = [];

  mounted() {
    if (this.$route.params.regionId) {
      this.regionId = +this.$route.params.regionId;
      this.updateRegion();
    }
  }

  async initDetailsTab() {
    await this.getAdventure();
    this.updateAdventureFormFields();
    this.updateLocations();
  }

  updateLocations() {
    this.locations = [
      {
        title: "Regions",
        to: "/Region/All",
      },
      {
        title: this.Region.name!,
        to: "/Region/" + this.Region.id + "/Adventures",
      },
      {
        title: this.newAdventure.country_name!,
        to:
          "/Region/" +
          this.regionId +
          "/Adventures/Edit/" +
          this.newAdventure.id,
      },
    ];
  }

  async getAdventure() {
    if (this.editMode)
      this.newAdventure = fromResource<Adventure>(
        await Api.Adventure.get(+this.$route.params.id)
      );
  }

  async updateRegion() {
    if (!Api.Region.all.length)
      this.Region = (await Api.Region.get(this.regionId!))!;
    else {
      const finded = Api.Region.all.filter(
        (Region) => Region.id == this.regionId
      );
      if (finded && finded.length) this.Region = finded[0];
    }
  }

  updateAdventureFormFields() {
    this.adventureFormFields = [
      {
        label: "Country Name",
        modelKey: "country_name",
        type: "form-field-text",
        rules: [Validation.required],
        colAttrs: { cols: 12 },
      },
      {
        label: "Description",
        modelKey: "description",
        type: "form-field-textarea",
        colAttrs: { cols: 12 },
      },
      {
        label: "Testimonial",
        modelKey: "testimonial",
        type: "form-field-textarea",
        colAttrs: { cols: 12 },
      },
      {
        label: "Client Name",
        modelKey: "client_name",
        type: "form-field-text",
        colAttrs: { cols: 12 },
      },
    ];
  }

  async detailsFormSubmit() {
    if (this.formValidate()) {
      if (this.editMode && this.newAdventure.id)
        await Api.Adventure.update({
          id: this.newAdventure.id,
          adventure: this.newAdventure,
        });
      else await Api.Adventure.create(this.newAdventure);
      if (!this.editMode) this.$router.push("/Adventure/All");
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
