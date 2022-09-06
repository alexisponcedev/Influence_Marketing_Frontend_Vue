<template>
  <loading-overlay :show="true" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Auth extends Vue {
  mounted() {
    this.init();
  }

  async init() {
    if (localStorage.getItem("access_token")) this.$router.push("/Region/All");
    else this.$router.push("/Auth/Login");
  }
}
</script>
