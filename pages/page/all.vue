<template>
  <v-container fluid>


    <v-row>
      <v-col>
        <v-tabs v-model="tab" background-color="transparent">
          <v-tab :href="`#${PageType.all}`">All Pages</v-tab>
          <v-tab :href="`#${PageType.static}`">Static Pages</v-tab>
          <v-tab :href="`#${PageType.product}`">Product Pages</v-tab>
          <v-tab :href="`#${PageType.support}`">Support Pages</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-card>
          <table-standard
            :config="config"
            class="row-pointer"
            :items="pagesList"
            :loading="Api.Page.loading"
            @click:row="(Page) => $router.push('/page/edit/' + Page.id)"
          />
        </v-card>

  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { PageResource } from "@/repositories";
import { Api, AppStore } from "@/store";
import {PageTypeEnum} from "~/interfaces/PageTypeEnum";

@Component({ layout: "panel" })
export default class AllPages extends Vue {
  Api = Api;

  tab = PageTypeEnum.all;

  PageType = PageTypeEnum;

  config = {
    headers: [
      { text: "Title", value: "title" },
      { text: "Route", value: "route" },
      // { text: "Has Data", value: "hasData" },
      // { text: "Model", value: "model_type" },
      // { text: "Product", value: "model_id" },
      { text: "", value: "actions", sortable: false, width: "0" },
    ],
    actions: [
      {
        type: "edit",
        icon: "mdi-pencil",
        to: "/page/edit/[id]",
      },
      {
        type: "delete",
        icon: "mdi-delete",
        onClick: (Page: PageResource) => {
          AppStore.showDeleteConfirmationModal({
            deleteItemTitle: Page.title || "",
            deleteItem: Page,
            agreeButton: { callback: this.deletePage },
          });
        },
      },
    ],
    globalActions: [
      {
        text: "Add Page",
        class : 'btn',
        color: "primary",
        icon: "mdi-plus",
        to: "/page/add",
      },
    ],
  };

  mounted() {
    this.updatePages();
  }

  async updatePages() {
    await Api.Page.getAll();
  }

  deletePage(Page: PageResource) {
    Api.Page.delete(Page.id!).then(this.updatePages);
  }

  get pagesList(){
    let pages : Array<any> = [];
    console.log(this.tab);
    switch (this.tab) {
      case PageTypeEnum.all : pages = Api.Page.all; break;
      case PageTypeEnum.static : pages = Api.Page.all.filter(page => page.model_type == null); break;
      case PageTypeEnum.product : pages = Api.Page.all.filter(page => page.model_type === 'product'); break;
      case PageTypeEnum.support : pages = Api.Page.all.filter(page => page.model_type === 'support'); break;
    }
    return pages;
  }
}
</script>
