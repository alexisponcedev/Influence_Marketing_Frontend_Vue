<template>
  <div>
    <div class="tw-grid tw-grid-cols-10 tw-gap-6" style="margin-top : 88px !important">

      <div
        class="bg-white tw-col-span-8 tw-rounded-lg tw-overflow-hidden tw-overflow-y-auto tw-max-h-full tw-space-y-2 tw-p-2"
        style="max-height: 88vh">
        <draggable v-model="blocksList" group="people" @start="drag=true" @end="drag=false">
          <block-container v-for="(block , i) in blocksList" :key="block.id"
                           class="tw-mb-2"
                           @edit="editBlock(i)"
                           @delete="deleteBlock(i)"
                           @duplicate="duplicateBlock(i)"
                           @move-up="moveUpBlock(i)"
                           @move-down="moveDownBlock(i)"
                           :block="block">
            <component :is="`block-${block.name}`" :id="block.id" v-model="block.structure"/>
          </block-container>
        </draggable>
        <block-drop/>
      </div>
      <div class="bg-white tw-rounded-lg tw-col-span-2 tw-overflow-hidden tw-overflow-y-auto " style="max-height: 88vh">
        <block-selector v-show="editIndex === -1"  class="tw-p-4" @add-block="addBlock"/>
        <structure-editor v-if="editIndex > -1"
                          @close="cancelEditing"
                          :title="blocksList[editIndex].title"
                          v-model="blocksList[editIndex].structure"/>
      </div>
    </div>

    <template-selector ref="templateManager"/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import draggable from "vuedraggable";

interface BlockInterface {
  id: Number,
  selected: Boolean,
  structure: Object,
  name: String,
  title: String,
  image: String
}

@Component({
  components: {draggable}
})
export default class PageBuilder extends Vue {
  @VModel({type: Object}) model!: Object

}
</script>
