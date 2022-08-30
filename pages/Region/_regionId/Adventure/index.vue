<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab>Regions</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-btn class="float-right" color="primary" to="Add"> Add Region </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <table-standard
            :config="config"
            class="row-pointer"
            :items="Adventures"
            :loading="Api.Adventure.loading"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api, AppStore } from "@/store";
import { AdventureResource, Region } from "@/repositories";

@Component({ layout: "panel" })
export default class AllAdventures extends Vue {
  Api = Api;

  tab = "";

  regionId: number | null = null;
  Adventures: Array<AdventureResource> = [];

  config = {
    headers: [
      { text: "Name", value: "name" },
      { text: "Adventures", value: "", sortable: false },
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
    grid:{
      title: 'country_name'
    }
  };

  mounted() {
    if (this.$route.query.regionId) {
      this.regionId = +this.$route.query.regionId;
      this.updateAdventures();
    }
  }

  async updateAdventures() {
    this.Adventures = (await Api.Adventure.getByRegionId(this.regionId!)) || [];
  }

  deleteRegion(Adventure: AdventureResource) {
    Api.Adventure.delete(Adventure.id!).finally(this.updateAdventures);
  }
}
</script>
