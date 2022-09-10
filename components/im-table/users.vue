<template>
  <table-standard
    :config="config"
    class="row-pointer"
    :loading="Api.User.loading"
    :items="items || Api.User.all"
    @click:row="
      (user) =>
        $router.push(
          (prefixPath ? '/' + prefixPath : '') + '/User/Edit/' + user.id
        )
    "
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { UserResource } from "@/repositories";
import { Api, AppStore } from "@/store";

@Component
export default class AllUser extends Vue {
  @Prop(Array) readonly items!: Array<UserResource>;
  @Prop(Array) readonly hiddenHeader!: Array<string>;
  @Prop(Boolean) readonly noActions!: Boolean;
  @Prop(String) readonly prefixPath!: string;
  @Prop(String) readonly addKey!: string;

  Api = Api;

  config = {
    headers: [
      { text: "Name", value: "name" },
      { text: "Level", value: "level" },
      { text: "Email", value: "email" },
      { text: "", value: "actions", sortable: false, width: "0" },
    ]
      .filter((header) => !this.hiddenHeader?.includes(header.value))
      .filter((header) => !this.noActions || header.value != "actions"),
    actions: [
      {
        type: "edit",
        icon: "mdi-pencil",
        to: "/User/Edit/[id]",
      },
      {
        type: "delete",
        icon: "mdi-delete",
        onClick: (user: UserResource) => {
          AppStore.showDeleteConfirmationModal({
            deleteItemTitle: user.name || "",
            deleteItem: user,
            agreeButton: { callback: this.deleteUser },
          });
        },
      },
    ],
    globalActions: [
      {
        text: "Add User",
        color: "primary",
        icon: "mdi-plus",
        to:
          "/User/Add" +
          (this.addKey ? "/?" + this.addKey + "=" + this.$route.params.id : ""),
      },
    ].filter((_) => !this.noActions),
  };

  mounted() {
    if (!this.items) this.updateUsers();
  }

  updateUsers() {
    if (this.items) this.$emit("updateList");
    else Api.User.getAll();
  }

  async deleteUser(user: UserResource) {
    await Api.User.delete(user.id!);
    this.updateUsers();
  }
}
</script>
