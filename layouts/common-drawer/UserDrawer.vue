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
      <!-- <template
        v-if="
          getProfile().level == 'IM Admin' ||
          (getProfile().organization && getProfile().organization.length)
        "
      >
        <div class="heading-label pa-0 mb-4">Organization</div>
        <v-list dense>
          <v-list-item-group color="primary" v-model="selectedOrganization">
            <v-list-item
              v-for="Organization in getProfile().level == 'IM Admin'
                ? Api.Organization.all
                : getProfile().organization"
              :key="Organization.id"
              :value="Organization.id"
              @click="setSelectedOrganization(Organization.id)"
            >
              <v-list-item-avatar class="mr-8" v-if="Organization.thumbnail">
                <v-img :src="Organization.thumbnail" />
              </v-list-item-avatar>
              <v-list-item-icon v-else>
                <v-icon x-large> mdi-domain </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="Organization.name" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template> -->
    </div>
  </vue-perfect-scrollbar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import getProfile from "@/utils/getProfile";
import { Api } from "@/store";

@Component
export default class UserDrawer extends Vue {
  getProfile = getProfile;
  Api = Api;

  selectedOrganization: number = +getProfile().active_org?.id! || -1;

  editProfile() {
    this.$router.push("/User/Profile");
  }

  mounted() {
    // if (!Api.Organization.all.length) Api.Organization.getAll();
  }

  // async setSelectedOrganization(org_id: number) {
  //   if (getProfile().level == "IM Admin")
  //     await Api.Organization.attachUser({
  //       user_id: getProfile().user_id!,
  //       org_ids: Api.Organization.all.map((org) => org.id!),
  //     });
  //   await Api.User.setActiveOrg(org_id);
  //   this.$router.push("/Auth");
  // }
}
</script>
