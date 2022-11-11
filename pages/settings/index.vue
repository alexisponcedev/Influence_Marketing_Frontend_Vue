<template>
  <v-container fluid>


    <v-row>
      <v-col>
        <v-tabs background-color="transparent">
          <v-tab>All Templates</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <table-standard
            :config="config"
            class="row-pointer"
            :items="Api.Setting.all"
            :loading="Api.Setting.loading"
            @click:row="(Setting) => $router.push('/settings/edit/' + Setting.id)"
          />
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { SettingResource } from "@/repositories";
import { Api, AppStore } from "@/store";

@Component({ layout: "panel" })
export default class AllSettings extends Vue {
  Api = Api;


  config = {
    headers: [
      { text: "Title", value: "title" },
      { text: "Key", value: "key" },
      { text: "Value", value: "value" },
      { text: "", value: "actions", sortable: false, width: "0" },
    ],
    actions: [
      {
        type: "edit",
        icon: "mdi-pencil",
        to: "/settings/edit/[id]",
      },
      {
        type: "delete",
        icon: "mdi-delete",
        onClick: (Setting: SettingResource) => {
          AppStore.showDeleteConfirmationModal({
            deleteItemTitle: Setting.title || "",
            deleteItem: Setting,
            agreeButton: { callback: this.deleteSetting },
          });
        },
      },
    ],
    globalActions: [
      {
        text: "Add Setting",
        class : 'btn',
        color: "primary",
        icon: "mdi-plus",
        to: "/settings/add",
      },
    ],
  };

  mounted() {
    this.updateSettings();
  }

  async updateSettings() {
    await Api.Setting.getAll();
  }

  deleteSetting(Setting: SettingResource) {
    Api.Setting.delete(Setting.id!).then(this.updateSettings);
  }
}
</script>
