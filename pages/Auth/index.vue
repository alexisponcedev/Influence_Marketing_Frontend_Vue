<template>
  <loading-overlay show />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api, AppStore } from "@/store";

@Component
export default class Auth extends Vue {
  mounted() {
    this.init();
  }

  async init() {
    if (this.$route.query.token)
      await Api.Auth.inquery("" + this.$route.query.token);
    if (localStorage.getItem("access_token")) {
      await Api.Auth.getUser();
      this.goToApp();
    } else if (process.env.PORTAL_URL)
      window.location.href =
        process.env.PORTAL_URL +
        (process.env.APP_NAME
          ? "?application=" + encodeURIComponent(process.env.APP_NAME)
          : "");
    else
      AppStore.showSnackBar({
        message: "Portal URL Not Resolved!",
        color: "error",
      });
  }

  async goToApp() {
    if (!Api.Site.all.length) await Api.Site.getAll();
    this.$router.push("/page");
  }
}
</script>
