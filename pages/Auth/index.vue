<template>
  <loading-overlay :show="true" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/store";

@Component
export default class Auth extends Vue {
  mounted() {
    this.init();
  }

  async init() {
    if (localStorage.getItem("access_token")) {
      if (!Api.Site.all.length) await Api.Site.getAll();
      if (!localStorage.getItem("active_site"))
        localStorage.setItem("active_site", "" + Api.Site.all[0].id || "0");
      this.$router.push("/Region/All");
    } else this.$router.push("/Auth/Login");
  }
}
</script>
