<template>
  <v-container fluid>


    <div v-if="editMode" class="d-flex justify-space-between align-center">
      <breadcrumbs  :locations="locations" />
<!--      <v-btn elevation="0" color="grey darken-4 white&#45;&#45;text"  class="btn" :to="`/Block/Edit/${Component.id}/`">-->
<!--        Go to Page Builder-->
<!--      </v-btn>-->
    </div>

    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab href="#allBlocks">All Blocks</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-tabs-items v-model="tab">
      <v-tab-item value="allBlocks">
        <v-card-text>
          <form-standard
            ref="refForm"
            :model="Component"
            :fields="formFields"
            @submit="submit"
          />
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>

    <loading-overlay :show="Api.Component.loading" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { fromResource } from "@/utils/fromResource";
import Validation from "@/utils/validation";
import { Component as Block } from "@/repositories";
import { FormField } from "@/models";
import { Api } from "@/store";
import selectItems from "~/utils/select-items";
import HoverButton from "~/components/base/HoverButton.vue";

@Component({
  components: {HoverButton},
  layout: "panel" })
export default class BlockForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;

  Api = Api;

  tab = "";

  Component: Block = {
    props : []
  };

  locations: Array<{ title: string; to: string }> = [];

  formFields: Array<FormField> = [];

  mounted() {
    this.init();
  }

  async init() {
    await this.initBlocksTab();
    this.updateLocations();
  }

  updateLocations() {
    this.locations = [
      {
        title: "All Blocks",
        to: "/Block/All",
      },
      {
        title: this.Component.name || "",
        to: "/Block/Edit/" + this.Component.id!,
      },
    ];
  }

  async initBlocksTab() {
    await this.getEntity();
    this.updateFormFields();
  }

  async getEntity() {
    if (this.editMode)
      this.Component = (await Api.Component.get(+this.$route.params.id)) as Block;
  }

  updateFormFields() {
    this.formFields = [
      {
        type: "form-field-text",
        label: "Name",
        modelKey: "name",
        placeholder : 'name of the component',
        rules: [Validation.required],
        colAttrs: { cols: 12 },
      },
      {
        type: "form-field-textarea",
        label: "Description (optional)",
        placeholder : 'explain functionality of this component',
        modelKey: "description",
        rules: [],
        colAttrs: { cols: 12 },
      },
      {
        type: "form-field-image",
        label: "Component Image",
        modelKey: "image",
        rules: [Validation.url],
        colAttrs: { cols: 12 },
      },
      {
        label: "Theme",
        modelKey: "theme",
        "item-text": "title",
        "item-value": "value",
        placeholder : 'Select theme of this page',
        type: "form-field-select",
        rules: [Validation.required],
        items: selectItems.themes,
        colAttrs: { cols: 6 },
      },
    ];
  }


  async submit() {
      if (this.formValidate()) {
        if (this.editMode)
          await Api.Component.update({
            id: this.Component.id!,
            component: this.Component,
          });
        else await Api.Component.create(this.Component);
        if (!this.editMode) this.$router.push("/Block/All");
      }
  }

  formValidate() {
    return (this.$refs.refForm as any).validate();
  }

  @Watch("tab")
  tabChanged(newTab: string, _: string) {
    switch (newTab) {
      case "allBlocks":
        this.initBlocksTab();
        break;
      default:
        break;
    }
  }
}
</script>
