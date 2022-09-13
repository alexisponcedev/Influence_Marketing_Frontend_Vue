<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab>Settings</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-switch
              v-model="status"
              label="Site Status"
              @change="statusChanged"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <loading-overlay :show="Api.Site.loading" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class Settings extends Vue {
  Api = Api;

  tab = "";

  status: boolean = false;

  mounted() {
    this.init();
  }

  async init() {
    this.status = !!(await Api.Site.getSiteStatus(this.activeSite || 0));
  }

  statusChanged(value: boolean) {
    Api.Site.setSiteStatus({
      siteId: this.activeSite || 0,
      status: value ? 1 : 0,
    });
  }

  get activeSite() {
    const active_site = localStorage.getItem("active_site");
    return active_site ? +active_site : null;
  }
}
</script>
