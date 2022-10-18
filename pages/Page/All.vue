<template>
  <v-container fluid>


    <v-row>
      <v-col>
        <v-tabs background-color="transparent">
          <v-tab>All Pages</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <table-standard
            :config="config"
            class="row-pointer"
            :items="Api.Page.all"
            :loading="Api.Page.loading"
            @click:row="(Page) => $router.push('/Page/Edit/' + Page.id)"
          />
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { PageResource } from "@/repositories";
import { Api, AppStore } from "@/store";

@Component({ layout: "panel" })
export default class AllPages extends Vue {
  Api = Api;

  config = {
    headers: [
      { text: "Title", value: "title" },
      { text: "Route", value: "route" },
      // { text: "Model", value: "model_type" },
      // { text: "Product", value: "model_id" },
      { text: "", value: "actions", sortable: false, width: "0" },
    ],
    actions: [
      {
        type: "edit",
        icon: "mdi-pencil",
        to: "/Page/Edit/[id]",
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
        to: "/Page/Add",
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
}
</script>
