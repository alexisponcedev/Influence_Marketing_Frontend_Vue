<template>
  <v-container fluid style="background-color: #F2F3F8;height: 100vh">

    <v-card color="#FCFCFC" elevation="0" class="mb-4 px-7 page-builder-header">
      <v-row align="center">
        <v-col cols="12" md="5">
          <h1 class="text-h6 font-weight-bold mb-1">Template builder</h1>
          <span
            class="text-subtitle-2 grey--text text--darken-2">{{ Template.name }}</span>
        </v-col>
        <v-col cols="12" md="7" class="text-right">
          <v-btn @click="discard" elevation="0" outlined color="grey darken-4" class="control-btns">Discard</v-btn>
          <v-btn elevation="0" outlined color="grey darken-4" class="control-btns">Preview</v-btn>
          <v-btn @click="saveTemplate" elevation="0" color="grey darken-4 white--text" class="control-btns">
            Save Template
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <page-builder v-model="Template.widgets"/>

    <loading-overlay :show="Api.Template.loading"/>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {Api} from "@/store";
import {Template} from "~/repositories";
import {BlockInterface} from "~/interfaces/BlockInterface";

@Component
export default class TemplateBuilderSection extends Vue {
  Api = Api;

  tab = "";

  // blocksList: BlockInterface[] = [];

  Template: any = {};

  async mounted() {
    let template = (await Api.Template.get(+this.$route.params.id)) as Template;
    template.widgets = (template.widgets ? template.widgets : []) as Array<BlockInterface>;
    this.Template = template;
  }

  discard() {
    this.$router.push('/template/edit/' + this.Template.id);
  }

  async saveTemplate() {
    await Api.Template.update({id : this.Template.id! , Template : this.Template});
  }
}
</script>
