<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab>Regions</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-btn
          class="float-right"
          color="primary"
          @click="addRegionShow = true"
        >
          Add Region
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <table-standard
            grid
            :config="config"
            class="row-pointer"
            :items="Api.Region.all"
            :loading="Api.Region.loading"
            @click:row="
              (Region) => $router.push('/Region/' + Region.id + '/Adventure')
            "
          />
        </v-card>
      </v-col>
    </v-row>
    <add-region-modal :show.sync="addRegionShow" @submit="addRegion" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api, AppStore } from "@/store";
import { Region } from "@/repositories";

@Component({ layout: "panel" })
export default class AllRegion extends Vue {
  Api = Api;

  tab = "";

  addRegionShow: boolean = false;

  config = {
    headers: [
      { text: "Name", value: "name" },
      { text: "Image", value: "image", sortable: false },
      { text: "Adventures", value: "" },
      { text: "", value: "actions", sortable: false },
    ],
    actions: [
      {
        type: "delete",
        icon: "mdi-delete",
        onClick: (Region: Region) => {
          AppStore.showDeleteConfirmationModal({
            deleteItemTitle: Region.name || "",
            deleteItem: Region,
            agreeButton: { callback: this.deleteRegion },
          });
        },
      },
    ],
    grid: {
      title: "name",
      image: "image",
      subtitle: "adventures",
    },
  };

  mounted() {
    this.updateRegions();
  }

  updateRegions() {
    Api.Region.getAll();
  }

  deleteRegion(Region: Region) {
    Api.Region.delete(Region.id!).finally(this.updateRegions);
  }

  addRegion(Region: Region) {
    Api.Region.create(Region).finally(this.updateRegions);
  }
}
</script>
