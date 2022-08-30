<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab>Adventures</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-btn class="float-right" color="primary" to="Adventures/Add">
          Add Adventure
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
import { AdventureResource } from "@/repositories";
import { Api, AppStore } from "@/store";

@Component({ layout: "panel" })
export default class AllAdventures extends Vue {
  Api = Api;

  tab = "";

  regionId: number | null = null;
  Adventures: Array<AdventureResource> = [];

  config = {
    headers: [
      { text: "Country Name", value: "country_name" },
      { text: "Region", value: "region.name" },
      { text: "", value: "actions", sortable: false },
    ],
    actions: [
      {
        type: "delete",
        icon: "mdi-delete",
        onClick: (Adventure: AdventureResource) => {
          AppStore.showDeleteConfirmationModal({
            deleteItemTitle: Adventure.country_name || "",
            deleteItem: Adventure,
            agreeButton: { callback: this.deleteAdventure },
          });
        },
      },
    ],
    grid: {
      image: (Adventure: AdventureResource) =>
        Adventure.slides && Adventure.slides.length
          ? Adventure.slides[0]
          : undefined,
      title: "country_name",
      subtitle: "region.name",
    },
  };

  mounted() {
    if (this.$route.params.regionId) {
      this.regionId = +this.$route.params.regionId;
      this.updateAdventures();
    }
  }

  async updateAdventures() {
    this.Adventures = (await Api.Adventure.getByRegionId(this.regionId!)) || [];
  }

  deleteAdventure(Adventure: AdventureResource) {
    Api.Adventure.delete(Adventure.id!).finally(this.updateAdventures);
  }
}
</script>
