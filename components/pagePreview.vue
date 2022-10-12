<template>
  <div>
    <component
      :editable="false"
      v-for="block in blocksList" :key="block.id"
      :is="`block-${block.name}`"
      :id="block.id"
      v-model="block.structure"/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import draggable from "vuedraggable";

@Component({
  components: {draggable}
})
export default class PageBuilder extends Vue {
  @VModel({type: Array}) blocksList!: any
}
</script>
