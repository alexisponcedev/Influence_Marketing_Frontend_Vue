

<template>
  <v-container fluid>

    <div v-if="editMode" class="d-flex justify-space-between align-center">
      <breadcrumbs :locations="locations"/>
    </div>

    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab href="#Settings">Setting Details</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-tabs-items v-model="tab">
      <v-tab-item value="Settings">
        <v-card-text>
          <form-standard
            ref="SettingsForm"
            :model="Setting"
            :fields="formFields"
            @submit="submit"
          />
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>

    <loading-overlay :show="Api.Setting.loading"/>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import Validation from "@/utils/validation";
import {Setting} from "@/repositories";
import {FormField} from "@/models";
import {Api} from "@/store";
import HoverButton from "~/components/base/HoverButton.vue";

@Component({
  components: {HoverButton},
  layout: "panel"
})
export default class EntityForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;

  Api = Api;

  tab = "";

  Setting: Setting = {
    id: 0,
    title : '',
    key : '',
    value : '',
  };

  locations: Array<{ title: string; to: string }> = [];

  formFields: Array<FormField> = [];

  mounted() {
    this.init();
  }

  async init() {
    await this.initSettingsTab();
    this.updateLocations();
  }

  updateLocations() {
    this.locations = [
      {
        title: "Settings",
        to: "/settings",
      },
      {
        title: this.Setting.title || "",
        to: "/settings/edit/" + this.Setting.id!,
      },
    ];
  }

  async initSettingsTab() {
    await this.getEntity();
    this.updateSettingFormFields();
  }

  async getEntity() {
    if (this.editMode)
      this.Setting = (await Api.Setting.get(+this.$route.params.id)) as Setting;
  }

  updateSettingFormFields() {
    this.formFields = [
      {
        type: "form-field-text",
        label: "Title",
        modelKey: "title",
        placeholder: 'enter the title for setting',
        rules: [Validation.required],
        colAttrs: {cols: 12},
      },

      {
        type: "form-field-text",
        label: "Key",
        modelKey: "key",
        placeholder: 'enter key value',
        rules: [Validation.required],
        colAttrs: {cols: 4},
      },
      {
        type: "form-field-text",
        label: "Value",
        modelKey: "value",
        placeholder: 'enter value',
        rules: [Validation.required],
        colAttrs: {cols: 8},
      },
    ];
  }

  async submit() {
    if (this.formValidate()) {
      if (this.editMode){
        await Api.Setting.update({
          id: +this.Setting.id!,
          Setting: this.Setting,
        });
        Api.Setting.getAll();
      }

      else await Api.Setting.create(this.Setting);

      if (!this.editMode) this.$router.push("/settings");
    }
  }

  formValidate() {
    return (this.$refs.SettingsForm as any).validate();
  }

  @Watch("tab")
  tabChanged(newTab: string, _: string) {
    switch (newTab) {
      case "Settings":
        this.initSettingsTab();
        break;
      default:
        break;
    }
  }


}
</script>
