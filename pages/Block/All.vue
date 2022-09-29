<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
          <v-tab>All Blocks</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-btn
          class="float-right"
          color="primary"
          @click="addNewCategory = true"
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
            :items="blocks"
            class="row-pointer"
            :loading="Api.Block.loading"
            @click:row=" (Block) => $router.push('/Block/Edit/' + Block.id + '/') "
          />
        </v-card>
      </v-col>
    </v-row>
    <!--    <add-region-modal :show.sync="addNewCategory" @submit="addCategory" />-->
  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import assetsPath from "@/utils/assetsPath";
import {Api, AppStore} from "@/store";
import {CategoryResource, Block, BlockResource} from "~/repositories";

@Component({layout: "panel"})
export default class AllComponents extends Vue {
  Api = Api;

  tab = "";

  blocks: Array<BlockResource> = [];
  cetegorise: Array<CategoryResource> = [];
  addNewCategory: boolean = false;

  config = {
    headers: [
      {text: "Name", value: "name", sortable: false},
      {text: "Description", value: "description", sortable: false},
      {text: "", value: "actions", sortable: false, width: "0"},
    ],
    actions: [
      {
        type: "delete",
        icon: "mdi-delete",
        onClick: (Component: BlockResource) => {
          AppStore.showDeleteConfirmationModal({
            deleteItemTitle: Component.name || "",
            deleteItem: Component,
            agreeButton: {callback: this.deleteBlock},
          });
        },
      },
    ],
    grid: {
      title: "name",
      description: "description",
      image: (Block: BlockResource) => assetsPath(Block.image),
    },
  };

  mounted() {
    // this.loadCategories();
    // this.loadBlocks();
  }

  async loadCategories() {
    this.blocks = (await Api.Category.getAll()) || [];
  }

  async loadBlocks() {
    this.blocks = (await Api.Block.getAll()) || [];
  }

  deleteBlock(Component: Block) {
    Api.Region.delete(Component.id!).finally(this.loadBlocks);
  }

  addCategory(Component: Block) {
    Api.Category.create(Component).finally(this.loadCategories);
  }
}
</script>
