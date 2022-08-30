<template>
  <loading-overlay show />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Index extends Vue {
  created() {
    this.$router.push("/Region/All");
  }
}
</script>
