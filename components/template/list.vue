<template>
  <v-card>
    <v-card-title>
      Select Template
    </v-card-title>

    <v-card-text>
      <v-row>
        <form-field-text :field="searchField" v-model="search"/>
        <v-col cols="2" class="py-0 pb-6 word-wrap-break-word">
          <button class="tw-p-3.5 tw-bg-gray-100 tw-rounded tw-border tw-border-gray-200 tw-border-solid"
                  @click="addNewTemplate">
            <v-icon>mdi-cloud-upload</v-icon>
          </button>
        </v-col>
      </v-row>


      <div class="tw-space-y-2 tw-max-h-80 tw-overflow-y-auto no-scrollbar">
        <template-item
          v-for="template in Api.Template.all" :key="template.id"
          :template="template"
          @selected="selected"/>
      </div>

      <v-progress-linear class="tw-mt-2" v-show="Api.Template.loading" indeterminate color="cyan"/>

    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="cancel" text color="red"> Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel, Emit} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";
import {Api} from "~/utils/store-accessor";
import {Asset, Template} from "~/repositories";
import {AssetTokens} from "~/models/AssetTokens";


@Component
export default class TemplatesList extends Vue {
  @VModel({type: Object}) item!: any

  Api = Api;

  search: string = '';

  searchField = {
    label: '',
    placeholder: 'search template name',
    rules: [],
    colAttrs: {cols: 10}
  }

  mounted() {
    this.getTemplates();
  }

  async getTemplates() {
    await Api.Template.getAll()
  }

  selected(template: Template) {
    this.$emit('selected', template);
  }

  addNewTemplate() {
    this.$emit('addNewTemplate');
    return true;
  }

  cancel() {
    this.$emit('cancel');
    return true;
  }

  @Watch('search')
  searchUpdated(){
    this.getTemplates()
  }

}
</script>
