<template>
  <v-container fluid>

    <div v-if="editMode" class="d-flex justify-space-between align-center">
      <breadcrumbs :locations="locations"/>
      <v-btn elevation="0" color="grey darken-4 white--text" class="btn" :to="`/Template/Edit/${Template.id}/TemplateBuilder`">
        Go to Template Builder
      </v-btn>
    </div>

    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab href="#Details">Template Details</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-tabs-items v-model="tab">
      <v-tab-item value="Details">
        <v-card-text>
          <form-standard
            ref="TemplatesForm"
            :model="Template"
            :fields="formFields"
            @submit="submit"
          />
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>


    <template-selector @template-selected="templateSelected" ref="templateSelector"/>
    <loading-overlay :show="Api.Template.loading"/>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import Validation from "@/utils/validation";
import {Template} from "@/repositories";
import {FormField} from "@/models";
import {Api} from "@/store";
import HoverButton from "~/components/base/HoverButton.vue";

@Component({
  components: {HoverButton},
  layout: "panel"
})
export default class TemplateForm extends Vue {
  @Prop(Boolean) readonly editMode!: Boolean;

  Api = Api;

  tab = "";

  Template: Template = {
    template_content: [],
  };

  locations: Array<{ title: string; to: string }> = [];

  formFields: Array<FormField> = [];

  mounted() {
    this.init();
  }

  async init() {
    await this.initTemplatesTab();
    this.updateLocations();
  }

  updateLocations() {
    this.locations = [
      {
        title: "Templates",
        to: "/Template/All",
      },
      {
        title: this.Template.name || "",
        to: "/Template/Edit/" + this.Template.id!,
      },
    ];
  }

  async initTemplatesTab() {
    await this.getEntity();
    this.updateTemplateFormFields();
  }

  async getEntity() {
    if (this.editMode)
      this.Template = (await Api.Template.get(+this.$route.params.id)) as Template;
    console.log('get entity for Template : ', this.Template);
  }

  updateTemplateFormFields() {
    this.formFields = [
      {
        type: "form-field-text",
        label: "Name",
        modelKey: "name",
        placeholder: 'enter the template name',
        rules: [Validation.required],
        colAttrs: {cols: 6},
      },
    ];
  }

  async submit() {
    if (this.formValidate()) {
      if (this.editMode)
        await Api.Template.update({
          id: +this.Template.id!,
          Template: this.Template,
        });
      else await Api.Template.create(this.Template);
      if (!this.editMode) this.$router.push("/Template/All");
    }
  }

  formValidate() {
    return (this.$refs.TemplatesForm as any).validate();
  }

  // goToTemplateBuilder() {
  //   if (!this.Template.content || this.Template.content?.length === 0)
  //     (this.$refs.templateSelector as any).open();
  //   else
  //     this.openTemplateBuilder();
  // }

  openTemplateBuilder() {
    this.$router.push(`/Template/Edit/${this.Template.id}/TemplateBuilder`);
  }

  // templateSelected(template: any) {
  //   this.Template.content = template.content;
  //   this.submit().then(this.openTemplateBuilder);
  // }

  @Watch("tab")
  tabChanged(newTab: string, _: string) {
    switch (newTab) {
      case "Details":
        this.initTemplatesTab();
        break;
      default:
        break;
    }
  }


}
</script>
