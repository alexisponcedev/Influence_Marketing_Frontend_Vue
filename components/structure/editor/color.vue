<template>
  <div>
   color editor
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {StructureField} from "~/utils/StructureField";

@Component
export default class PageContent extends Vue {
  @VModel({ type: StructureField }) structure!: StructureField
}
</script>
