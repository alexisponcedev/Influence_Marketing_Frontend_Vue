<template>
  <loading-overlay show />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/store";

@Component
export default class Logout extends Vue {
  mounted() {
    Api.Auth.Logout().finally(() => {
      localStorage.removeItem("profile");
      localStorage.removeItem("active_site");
      localStorage.removeItem("access_token");
      localStorage.removeItem("access_token_expires_at");
      this.$router.push("/Auth");
    });
  }
}
</script>
