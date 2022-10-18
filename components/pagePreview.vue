<template>
  <div>
    <div v-if="showTitle" class="title">Page Preview</div>

    <component
      :editable="false"
      v-for="block in blocksList" :key="block.id"
      :is="`block-${block.name}`"
      :id="block.id"
      v-model="block.structure"/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import draggable from "vuedraggable";

@Component({
  components: {draggable}
})
export default class PageBuilder extends Vue {
  @Prop({type : Boolean , default : true}) showTitle! : boolean
  @VModel({type: Array}) blocksList!: any
}
</script>


<style lang="scss" scoped>
  .title{
    font-weight: bold;
    font-size: 15px !important;
    padding: 0px 5px;
  }
</style>
