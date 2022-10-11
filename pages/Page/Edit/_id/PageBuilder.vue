<template>
  <v-container fluid style="background-color: #F2F3F8;height: 100vh">

    <v-card color="#FCFCFC" elevation="0" class="mb-4 px-7 page-builder-header">
      <v-row align="center">
        <v-col cols="12" md="5">
          <h1 class="text-h6 font-weight-bold mb-1">Page builder</h1>
          <span
            class="text-subtitle-2 grey--text text--darken-2">{{ Page.title }}</span>
        </v-col>
        <v-col cols="12" md="7" class="text-right">
          <v-btn @click="discard" elevation="0" outlined color="grey darken-4" class="control-btns">Discard</v-btn>
          <v-btn :to="`/Page/Edit/${Page.id}/PagePreview`" elevation="0" outlined color="grey darken-4" class="control-btns">Preview</v-btn>
          <v-btn @click="saveTemplate" elevation="0" outlined color="grey darken-4" class="control-btns">Save Template
          </v-btn>
          <v-btn @click="saveDraft" outlined elevation="0" color="grey darken-4 white--text" class="control-btns">Save
            Draft
          </v-btn>
          <v-btn @click="savePage" elevation="0" color="grey darken-4 white--text" class="control-btns">
            Publish
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <page-builder v-model="blocksList"/>

    <template-selector ref="templateManager"/>

    <loading-overlay :show="Api.Page.loading"/>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {Api} from "@/store";
import {Content, Page} from "~/repositories";
import {BlockInterface} from "~/interfaces/BlockInterface";

@Component
export default class PageBuilderSection extends Vue {
  Api = Api;

  tab = "";

  blocksList: BlockInterface[] = [];


  Page: Page = {};

  async mounted() {
    this.Page = (await Api.Page.get(+this.$route.params.id)) as Page;
    if (this.Page.draft && this.Page.draft.length > 0)
      this.blocksList = this.Page.draft as Array<BlockInterface>;
    else
      this.blocksList = (this.Page.content ? this.Page.content : []) as Array<BlockInterface>;
  }

  discard() {
    this.$router.push('/Page/Edit/' + this.Page.id);
  }

  async savePage() {
    let content: Content = {page_id: +this.$route.params.id, page_content: this.blocksList}
    await Api.Page.savePageContent(content);
    // this.triggerDeploy();

  }
  // triggerDeploy(){
  //   console.log('trigger deploy public site');
  //   this.$axios.$get('https://forge.laravel.com/servers/580060/sites/1766519/deploy/http?token=zevvn1zF5xg7U1gtp2Rur3dxntCyOKm03Q2lOY4e');
  // }

  saveTemplate() {
    (this.$refs.templateManager as any).open(true, this.blocksList);
  }

  async saveDraft() {
    await Api.Page.saveDraft({page_id: +this.$route.params.id, page_draft: this.blocksList})
  }
}
</script>
