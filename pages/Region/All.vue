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
    <add-region-modal :show.sync="addRegionShow" @submit="addRegion" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Region, RegionFullResource } from "@/repositories";
import assetsPath from "@/utils/assetsPath";
import { Api, AppStore } from "@/store";

@Component({ layout: "panel" })
export default class AllRegion extends Vue {
  Api = Api;

  tab = "";

  regions: Array<RegionFullResource> = [];
  addRegionShow: boolean = false;

  config = {
    headers: [
      { text: "Name", value: "name" },
      { text: "Image", value: "image", sortable: false },
      { text: "Adventures", value: "" },
      { text: "", value: "actions", sortable: false, width: "0" },
    ],
    actions: [
      {
        type: "delete",
        icon: "mdi-delete",
        onClick: (Region: RegionFullResource) => {
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
      image: (Region: RegionFullResource) => assetsPath(Region.image),
      chips: (Region: RegionFullResource) =>
        Region.adventures?.map((adventure) => adventure.country_name),
    },
  };

  mounted() {
    this.updateRegions();
  }

  async updateRegions() {
    if (this.activeSite)
      this.regions = (await Api.Region.getBySiteId(this.activeSite)) || [];
  }

  deleteRegion(Region: Region) {
    Api.Region.delete(Region.id!).finally(this.updateRegions);
  }

  addRegion(Region: Region) {
    Api.Region.create(Region).finally(this.updateRegions);
  }

  get activeSite() {
    const active_site = localStorage.getItem("active_site");
    return active_site ? +active_site : null;
  }
}
</script>
