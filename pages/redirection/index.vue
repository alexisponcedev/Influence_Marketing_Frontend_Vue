<template>
  <v-container fluid>


    <v-row>
      <v-col>
        <v-tabs background-color="transparent">
          <v-tab>All Redirects</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <table-standard
            :config="config"
            class="row-pointer"
            :items="Api.Redirect.all"
            :loading="Api.Redirect.loading"
            @click:row="(Redirect) => $router.push('/redirection/edit/' + Redirect.id)"
          />
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { RedirectResource } from "@/repositories";
import { Api, AppStore } from "@/store";

@Component({ layout: "panel" })
export default class AllRedirects extends Vue {
  Api = Api;


  config = {
    headers: [
      { text: "Page Route", value: "page_route" },
      { text: "Redirect Type", value: "redirect_type" },
      { text: "Redirect URL", value: "redirect_url" },
      { text: "Redirect Code", value: "redirect_code" },
      { text: "", value: "actions", sortable: false, width: "0" },
    ],
    actions: [
      {
        type: "edit",
        icon: "mdi-pencil",
        to: "/redirection/edit/[id]",
      },
      {
        type: "delete",
        icon: "mdi-delete",
        onClick: (Redirect: RedirectResource) => {
          AppStore.showDeleteConfirmationModal({
            deleteItemTitle: Redirect.redirect_url || "",
            deleteItem: Redirect,
            agreeButton: { callback: this.deleteRedirect },
          });
        },
      },
    ],
    globalActions: [
      {
        text: "Add Redirect",
        class : 'btn',
        color: "primary",
        icon: "mdi-plus",
        to: "/redirection/add",
      },
    ],
  };

  mounted() {
    this.updateRedirects();
  }

  async updateRedirects() {
    await Api.Redirect.getAll();
  }

  deleteRedirect(Redirect: RedirectResource) {
    Api.Redirect.delete(Redirect.id!).then(this.updateRedirects);
  }
}
</script>
