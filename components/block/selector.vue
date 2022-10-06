<template>
  <div>
    <h5 >Content</h5>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(group,i) in Blocks"
        :key="i"
      >
        <v-expansion-panel-header>
          <span class="tw-font-bold">{{ group.name }}</span>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <div v-for="(block , j) in group.blocks" :key="`${i}-${j}`" class="tw-border-2 tw-border-solid tw-border-gray-200 tw-rounded-lg tw-p-2 tw-bg-gray-50 tw-mb-2" >
            <img :src="`/blocks/${block.image}`" alt="component thumbnail" class="tw-rounded-lg tw-bg-gray-50 tw-h-28 tw-w-full tw-object-cover">
            <div class="tw-flex tw-items-center tw-justify-between">
              <p class="tw-font-italic" style="margin-bottom: 0 !important;">{{block.title}}</p>
              <button @click="addBlock(block)">
                Add
              </button>
            </div>

          </div>
        </v-expansion-panel-content>

      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Emit} from "vue-property-decorator";
import { blocks } from "@/data/blocks";

@Component
export default class BlocksSelector extends Vue {
  blocks = blocks;

  @Emit()
  addBlock(block : any){
    return block;
  }

  get Blocks(){
    return this.blocks().map(i => i);
  }
}
</script>
<style>
.v-expansion-panel-content__wrap{
  padding: 6px;
}
</style>
