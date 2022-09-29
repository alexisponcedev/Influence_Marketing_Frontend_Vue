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

      <div class="bg-white tw-col-span-5 tw-rounded-lg tw-overflow-hidden">
        <block-introduction ref="BlockIntroduction"  @get:structure="loadStructure"/>
      </div>

      <div class="bg-white tw-rounded-lg tw-p-5">
        <v-text-field  v-if="currentStructure.hasOwnProperty('largeTitle')" type="text" v-model="currentStructure.smallTitle.value"        />
        <v-text-field  v-if="currentStructure.hasOwnProperty('largeTitle')" type="text" v-model="currentStructure.largeTitle.value"        />
        <v-text-field  v-if="currentStructure.hasOwnProperty('largeTitle')" type="text" v-model="currentStructure.paragraph.value"        />
<!--        <pre>{{currentStructure}}</pre>-->
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

  currentStructure = {};

  loadStructure(structure : any){
    this.currentStructure = structure
  }
}
</script>
