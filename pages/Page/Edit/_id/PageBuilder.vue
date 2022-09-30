<template>
  <v-container fluid style="background-color: #F2F3F8; height: 100vh">

    <v-card color="#FCFCFC" elevation="0" class="mb-4 px-7 page-builder-header">
      <v-row align="center" justify="">
        <v-col cols="12" md="6">
          <h1 class="text-h6 font-weight-bold mb-1">Page builder</h1>
          <span class="text-subtitle-2 grey--text text--darken-2">65" 4K ULED™ Premium Hisense Android Smart TV (2021)</span>
        </v-col>
        <v-col cols="12" md="6" class="text-right">
          <v-btn elevation="0" outlined color="grey darken-4" class="control-btns" >Discard</v-btn>
          <v-btn elevation="0" outlined color="grey darken-4"  class="control-btns">Preview</v-btn>
          <v-btn elevation="0" color="grey darken-4 white--text"  class="control-btns">Save Page</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <div class="tw-grid tw-grid-cols-6 tw-gap-6" style="margin-top : 88px !important">

      <div class="bg-white tw-col-span-5 tw-rounded-lg tw-overflow-hidden tw-overflow-y-auto tw-space-y-2 tw-p-2">


        <div class="tw-border tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-p-2">
          <block-introduction ref="BlockIntroduction"  @edit-component="editStructure"/>
        </div>

        <div class="tw-border tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-p-2">
          <block-introduction ref="BlockIntroduction"  @edit-component="editStructure"/>
        </div>


      </div>

      <div class="bg-white tw-rounded-lg ">
        <structure-editor v-if="currentComponent"
                         @close="currentComponent = null"
                          :title="currentComponent.title"
                          v-model="currentComponent.structure" />
        <div v-else class="tw-p-4">
          show list of commentents
        </div>
      </div>

    </div>


  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {Api} from "@/store";

@Component
export default class PageBuilder extends Vue {
  Api = Api;

  tab = "";

  currentComponent = null;

  editStructure(component : any){
    this.currentComponent = component
  }
}
</script>
