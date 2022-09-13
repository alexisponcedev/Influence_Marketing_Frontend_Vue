<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab>Pages</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-btn class="float-right ml-2" color="success" @click="save">
          <v-icon left> mdi-content-save-outline </v-icon>
          Save
        </v-btn>
        <v-btn class="float-right" color="primary" @click="addPage">
          <v-icon left> mdi-plus </v-icon>
          Add Page
        </v-btn>
      </v-col>
    </v-row>
    <v-row :key="forceUpdateIndex">
      <v-col v-for="(page, index) in pages" :key="index" cols="12">
        <page-content
          :data.sync="pages[index]"
          @delete-page="deletePage(index)"
        />
      </v-col>
    </v-row>
    <loading-overlay :show="Api.Constant.loading || Api.Site.loading" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class Contents extends Vue {
  Api = Api;

  tab = "";
  forceUpdateIndex: number = 0;

  activeConstantsId: number | null = null;
  pages: Array<string> = [];

  mounted() {
    this.init();
  }

  async init() {
    if (!Api.Site.all.length) await Api.Site.getAll();
    if (this.activeSiteName) {
      const Constants = await Api.Constant.getBySiteName(this.activeSiteName);
      if (Constants && Constants.length) {
        this.activeConstantsId = Constants[0].id!;
        this.pages = Constants[0].pages || ['{"key":"value"}'];
      } else
        Api.Constant.create({
          site_name: this.activeSiteName,
          text: ['{"key":"value"}'],
        }).then(this.init);
    }
    this.forceUpdateIndex++;
  }

  get activeSiteName() {
    const active_site_id = localStorage.getItem("active_site");
    const finded = Api.Site.all.filter((site) => site.id == +active_site_id!);
    if (finded && finded.length) return finded[0].name;
    return null;
  }

  deletePage(pageIndex: number) {
    this.pages.splice(pageIndex, 1);
    this.forceUpdateIndex++;
  }

  addPage() {
    this.pages.push('{"key":"value"}');
    this.forceUpdateIndex++;
  }

  save() {
    Api.Constant.update({
      id: this.activeConstantsId!,
      Constant: {
        site_name: this.activeSiteName!,
        text: this.pages,
      },
    }).then(this.init);
  }
}
</script>
