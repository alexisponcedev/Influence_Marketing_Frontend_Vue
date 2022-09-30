<template>
  <div>
    Upload File for project

  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";

@Component
export default class PageContent extends Vue {
  @VModel({ type: Object }) structure!: Object
}
</script>
