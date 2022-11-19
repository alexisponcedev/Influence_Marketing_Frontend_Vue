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
      this.$router.push("/page");
    } else
      // location.replace('https://secure.stage.hisenseportal.com/Auth/Login')
      this.$router.push("/Auth/Login");
  }
}
</script>
