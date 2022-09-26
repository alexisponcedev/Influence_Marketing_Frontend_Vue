<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab>All Components</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-btn
          class="float-right"
          color="primary"
          @click="addCetegory = true"
        >
          Add Category
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <table-standard
            grid
            :config="config"
            :items="regions"
            class="row-pointer"
            :loading="Api.Region.loading"
            @click:row="
              (Region) => $router.push('/Region/' + Region.id + '/Adventures')
            "
          />
        </v-card>
      </v-col>
    </v-row>
    <add-region-modal :show.sync="addCetegory" @submit="addRegion" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import assetsPath from "@/utils/assetsPath";
import { Api, AppStore } from "@/store";
import {Component as xComponent , ComponentResource} from "~/repositories";

@Component({ layout: "panel" })
export default class AllComponents extends Vue {
  Api = Api;

  tab = "";

  componenets : Array<ComponentResource> = [];
  addCetegory: boolean = false;

  config = {
    headers: [
      { text: "Image", value: "image" },
      { text: "Name", value: "name" , sortable : false},
      { text: "Description", value: "description", sortable: false },
      { text: "", value: "actions", sortable: false, width: "0" },
    ],
    actions: [
      {
        type: "delete",
        icon: "mdi-delete",
        onClick: (Component: ComponentResource) => {
          AppStore.showDeleteConfirmationModal({
            deleteItemTitle: Component.name || "",
            deleteItem: Component,
            agreeButton: { callback: this.deleteComponent },
          });
        },
      },
    ],
    grid: {
      title: "name",
      description: "description",
      image: (Component: ComponentResource) => assetsPath(Component.image),
    },
  };

  mounted() {
    this.updateComponents();
  }

  async updateComponents() {
      this.componenets = (await Api.Component.getAll()) || [];
  }

  deleteComponent(Component: xComponent) {
    Api.Region.delete(Component.id!).finally(this.updateComponents);
  }

  addRegion(Component: xComponent) {
    Api.Region.create(Component).finally(this.updateComponents);
  }
}
</script>
