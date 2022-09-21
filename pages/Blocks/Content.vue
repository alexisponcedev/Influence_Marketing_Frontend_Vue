<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab>Content Blocks</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text> Content Blocks </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <loading-overlay :show="Api.Site.loading" /> -->
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class ContentBlocks extends Vue {
  Api = Api;

  tab = "";
}
</script>
