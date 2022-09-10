<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs background-color="transparent">
          <v-tab>All Rules and Regulations</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <table-standard
            :items="Rules"
            :config="config"
            class="row-pointer"
            :loading="Api.Rule.loading"
            @click:row="(Rule) => $router.push('/Rule/Edit/' + Rule.id)"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { RuleResource } from "@/repositories";
import { Api, AppStore } from "@/store";

@Component({ layout: "panel" })
export default class AllRules extends Vue {
  Api = Api;

  Rules: Array<RuleResource> = [];

  config = {
    headers: [
      { text: "Title", value: "title" },
      { text: "", value: "actions", sortable: false, width: "0" },
    ],
    actions: [
      {
        type: "edit",
        icon: "mdi-pencil",
        to: "/Rule/Edit/[id]",
      },
      {
        type: "delete",
        icon: "mdi-delete",
        onClick: (Rule: RuleResource) => {
          AppStore.showDeleteConfirmationModal({
            deleteItemTitle: Rule.title || "",
            deleteItem: Rule,
            agreeButton: { callback: this.deleteRule },
          });
        },
      },
    ],
    globalActions: [
      {
        text: "Add Rule",
        color: "primary",
        icon: "mdi-plus",
        to: "/Rule/Add",
      },
    ],
  };

  mounted() {
    this.updateRules();
  }

  async updateRules() {
    if (this.activeSite)
      this.Rules = (await Api.Rule.getBySiteId(this.activeSite)) || [];
  }

  deleteRule(Rule: RuleResource) {
    Api.Rule.delete(Rule.id!).then(this.updateRules);
  }

  get activeSite() {
    const active_site = localStorage.getItem("active_site");
    return active_site ? +active_site : null;
  }
}
</script>
