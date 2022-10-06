<template>
  <vue-perfect-scrollbar
    :settings="{ suppressScrollX: true, wheelPropagation: false }"
    class="h-100 rtl-ps-none ps scroll"
    style="height: 100%"
  >
    <div class="pa-5 relative">
      <v-app-bar
        :color="$vuetify.theme.dark ? 'dark' : 'grey lighten-4'"
        :dark="$vuetify.theme.dark"
        class="pt-1"
        fixed
        flat
      >
        <div class="d-flex justify-space-between align-center w-full">
          <h6 class="ma-0">My Account</h6>
          <slot name="userDrawerCloseButton"></slot>
        </div>
      </v-app-bar>
    </div>

    <div class="pa-5 mt-10">
      <div class="heading-label pa-0 mb-4">Profile</div>
      <v-list>
        <v-list-item @click="editProfile">
          <v-list-item-avatar v-if="getProfile().avatar">
            <v-img :src="getProfile().avatar" />
          </v-list-item-avatar>
          <v-list-item-icon v-else>
            <v-icon x-large> mdi-account-circle-outline </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="getProfile().name || 'Admin'" />
            <v-list-item-subtitle v-text="getProfile().level || 'Admin'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </vue-perfect-scrollbar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import getProfile from "@/utils/getProfile";
import assetsPath from "@/utils/assetsPath";
import { Api } from "@/store";

@Component
export default class UserDrawer extends Vue {
  getProfile = getProfile;
  assetsPath = assetsPath;
  Api = Api;

  editProfile() {
    this.$router.push("/User/Profile");
  }
}
</script>
