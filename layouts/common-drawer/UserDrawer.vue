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

    <div v-if="getProfile()" class="pa-5 mt-10">
      <div class="heading-label pa-0 mb-4">Profile</div>
      <v-list>
        <v-list-item>
          <v-list-item-avatar v-if="getProfile().avatar">
            <v-img :src="getProfile().avatar" />
          </v-list-item-avatar>
          <v-list-item-icon v-else>
            <v-icon x-large> mdi-account-circle-outline </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="getProfile().user_name || 'Admin'" />
            <v-list-item-subtitle v-text="getProfile().level || 'Admin'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

    <div
      class="pa-5"
      v-if="getProfile().applications && getProfile().applications.length"
    >
      <div class="heading-label pa-0 mb-4">Applications</div>
      <v-list>
        <v-list-group
          no-action
          :key="application.name"
          :value="getApplicationValue(application)"
          v-for="application in getProfile().applications"
        >
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon> mdi-domain</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="application.name" />
            </v-list-item-content>
          </template>
          <v-list-item
            :class="{
              'v-list-item--active': getBrandValue(application, brand.brand),
            }"
            v-for="brand in application.brands"
            :key="brand.brand.id"
            @click="
              (event) =>
                goToApplication(application.name, brand.brand.name, event)
            "
          >
            <v-list-item-content>
              <v-list-item-title v-text="brand.brand.name" />
              <v-list-item-subtitle v-text="brand.role.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
  </vue-perfect-scrollbar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import toClipboard from "@/utils/toClipboard";
import getProfile from "@/utils/getProfile";

@Component
export default class UserDrawer extends Vue {
  getProfile = getProfile;

  goToApplication(application: string, brand: string, event?: any) {
    if (event && event.ctrlKey)
      toClipboard(
        "?application=" +
          application.replace(/ /g, "").toLowerCase() +
          "&brand=" +
          brand.replace(/ /g, "").toLowerCase()
      );
    else {
      window.location.href =
        process.env.PORTAL_URL +
        "?application=" +
        application.replace(/ /g, "").toLowerCase() +
        "&brand=" +
        brand.replace(/ /g, "").toLowerCase();
    }
  }

  getApplicationValue(application: any) {
    return (
      process.env.APP_NAME == application.name.replace(/ /g, "").toLowerCase()
    );
  }

  getBrandValue(application: any, brand: any) {
    return (
      process.env.APP_NAME ==
        application.name.replace(/ /g, "").toLowerCase() &&
      brand.name.replace(/ /g, "").toLowerCase() ==
        localStorage.getItem("active_brand")
    );
  }
}
</script>
