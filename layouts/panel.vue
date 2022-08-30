<template>
  <default-layout>
    <VerticalWhiteSidebar />
  </default-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import defaultLayout from "./default.vue";

@Component({
  components: {
    defaultLayout,
  },
  // middleware: ["auth"],
})
export default class ContactCenterPanelLayout extends Vue {}
</script>
