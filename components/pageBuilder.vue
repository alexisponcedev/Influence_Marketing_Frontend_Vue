<template>
  <div>
    <div class="tw-grid tw-grid-cols-10 tw-gap-6" style="margin-top : 88px !important">

      <div
        class="bg-white tw-col-span-8 tw-rounded-lg tw-overflow-hidden tw-overflow-y-auto tw-max-h-full tw-space-y-2 tw-p-2"
        style="max-height: 88vh">
        <draggable v-model="blocksList" group="people" @start="drag=true" @end="drag=false">
          <blocks-container v-for="(block , i) in blocksList" :key="block.id"
                           class="tw-mb-2"
                           :selectable="selectable"
                           @component-selected="componentSelected(i)"
                           @edit="editBlock(i)"
                           @delete="deleteBlock(i)"
                           @duplicate="duplicateBlock(i)"
                           @reset="resetBlock(i)"
                           @move-up="moveUpBlock(i)"
                           @move-down="moveDownBlock(i)"
                           :block="block">
<!--            <pre>{{block.name}}</pre>-->
            <component :is="`blocks-${block.name}`" :id="block.id" v-model="block.structure"/>
          </blocks-container>
        </draggable>
        <blocks-drop/>
      </div>
      <div class="bg-white tw-rounded-lg tw-col-span-2 tw-overflow-hidden tw-overflow-y-auto " style="max-height: 88vh">
        <blocks-selector v-show="editIndex === -1" class="tw-p-4" @add-block="addBlock"/>
        <structure-editor v-if="editIndex > -1"
                          :key="blocksList[editIndex].title + blocksList[editIndex].id"
                          v-model="blocksList[editIndex].structure"
                          :title="blocksList[editIndex].title"
                          @close="cancelEditing"/>
      </div>
    </div>

    <template-selector ref="templateManager"/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import draggable from "vuedraggable";
import {EventBus} from "~/plugins/event.client";

@Component({
  components: {draggable}
})
export default class PageBuilder extends Vue {
  @VModel({type: Array}) blocksList!: any

  editIndex: Number = -1;

  // selectable: boolean = false;

  selectItem: any = {};

  get selectable() {
    return this.selectItem && Object.keys(this.selectItem).length > 0;
  }

  mounted() {
    EventBus.listen('enable-select-mode', (target: any) => {
      this.selectItem = target;
    });
  }

  destroy() {
    EventBus.remove('enable-select-mode');
  }

  componentSelected(i: number) {
    this.selectItem.value = `#${this.blocksList[i].name}${this.blocksList[i].id}`;
    this.selectItem = {};
  }

  cancelEditing() {
    this.editIndex = -1;
  }

  addBlock(block: any) {
    let id = this.blocksList.length + 1;
    this.blocksList.push({id: id, selected: false, structure: {}, ...block,});
    this.selectBlock(this.blocksList.length - 1);
  }

  selectBlock(index: number) {
    this.blocksList.forEach((item: { selected: boolean; }) => item.selected = false);
    this.blocksList[index].selected = true;
  }


  editBlock(i: number) {
    this.selectBlock(i);
    this.editIndex = i;
  }

  deleteBlock(i: any) {
    this.cancelEditing();
    this.blocksList.splice(i, 1);
  }

  duplicateBlock(i: any) {
    let newBlock = JSON.parse(JSON.stringify(this.blocksList[i]));
    newBlock.id = this.blocksList.length + 1;
    this.blocksList.splice(i + 1, 0, newBlock)
  }

  resetBlock(i: any) {
    this.blocksList[i].structure = [];
  }

  moveUpBlock(i: any) {
    if (i > 0 && this.blocksList.length > 1) {
      const block = this.blocksList.splice(i, 1)[0];
      this.blocksList.splice(i - 1, 0, block)
    }
  }

  moveDownBlock(i: any) {
    if (this.blocksList.length > 1 && i < this.blocksList.length) {
      const block = this.blocksList.splice(i, 1)[0];
      this.blocksList.splice(i + 1, 0, block)
    }
  }
}
</script>
