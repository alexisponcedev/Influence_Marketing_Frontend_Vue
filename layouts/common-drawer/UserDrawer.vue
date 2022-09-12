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
      <template v-if="Api.Site.all.length">
        <div class="heading-label pa-0 mb-4">Site</div>
        <v-list dense>
          <v-list-item-group color="primary" v-model="selectedSite">
            <v-list-item
              v-for="Site in Api.Site.all"
              :key="Site.id"
              :value="Site.id"
              @click="setActiveSite(Site.id)"
            >
              <v-list-item-avatar class="mr-8" v-if="Site.flag_url">
                <v-img :src="assetsPath(Site.flag_url)" />
              </v-list-item-avatar>
              <v-list-item-icon v-else>
                <v-icon x-large> mdi-domain </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="Site.name" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
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

  selectedSite: number | null = this.activeSite;

  mounted() {
    if (!Api.Site.all.length) Api.Site.getAll();
  }

  editProfile() {
    this.$router.push("/User/Profile");
  }

  get activeSite() {
    const active_site = localStorage.getItem("active_site");
    return active_site ? +active_site : null;
  }

  setActiveSite(site_id: number) {
    localStorage.setItem("active_site", "" + site_id);
    this.$router.push("/Auth");
  }
}
</script>
