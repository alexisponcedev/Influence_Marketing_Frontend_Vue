<template>
  <v-container fluid>
    <breadcrumbs v-if="editMode" :locations="locations" />
    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab href="#Details">Rules and Regulations Details</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tab">
      <v-tab-item value="Details">
        <v-card-text>
          <form-standard
            ref="detailsForm"
            :model="Rule"
            :fields="detailsFormFields"
            @submit="detailsFormSubmit"
          />
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
    <loading-overlay :show="Api.Rule.loading" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { fromResource } from "@/utils/fromResource";
import { Rule } from "@/repositories";
import { FormField } from "@/models";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class RuleForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;

  Api = Api;

  tab = "";

  Rule: Rule = {
    site_id: +(localStorage.getItem("active_site") || 0),
  };

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
        title: "Rules & Regulations",
        to: "/Rule/All",
      },
      {
        title: this.Rule.title || "",
        to: "/Rule/Edit/" + this.Rule.id!,
      },
    ];
  }

  async initDetailsTab() {
    await this.getEntity();
    this.updateDetailsFormFields();
  }

  async getEntity() {
    if (this.editMode)
      this.Rule = fromResource<Rule>(
        await Api.Rule.get(+this.$route.params.id)
      );
  }

  updateDetailsFormFields() {
    this.detailsFormFields = [
      {
        type: "form-field-text",
        label: "Title",
        modelKey: "title",
        colAttrs: { cols: 12 },
      },
      {
        type: "form-field-text-markup",
        label: "Text",
        modelKey: "text",
        colAttrs: { cols: 12 },
      },
    ];
  }

  async detailsFormSubmit() {
    if (this.detailsFormValidate()) {
      if (this.editMode)
        await Api.Rule.update({
          id: +this.Rule.id!,
          Rule: this.Rule,
        });
      else await Api.Rule.create(this.Rule);
      if (!this.editMode) this.$router.push("/Rule/All");
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
