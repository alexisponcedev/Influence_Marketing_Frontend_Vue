<template>
  <div :class="{'selected tw-border tw-border-solid tw-border-black' : block.selected}"
       @click="edit"
       class="tw-overflow-hidden tw-rounded tw-border-[3px] tw-border-solid tw-border-white hover:tw-border-gray-300 tw-transition tw-duration-300 tw-cursor-pointer tw-relative" >
    <div class="tw-absolute tw-top-2 tw-right-2 tw-flex tw-items-center tw-space-x-1 " v-if="block.selected">
      <button @click="moveUpBlock" class="tw-w-9 tw-h-9 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center hover:bg-gray-200" title="move up"><v-icon>mdi-arrow-up</v-icon></button>
      <button @click="moveDownBlock" class="tw-w-9 tw-h-9 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center hover:bg-gray-200" title="move down"><v-icon>mdi-arrow-down</v-icon></button>
      <button @click="duplicateBlock" class="tw-w-9 tw-h-9 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center hover:bg-gray-200" title="duplicate"><v-icon>mdi-content-copy</v-icon></button>
      <button @click="deleteBlock" class="tw-w-9 tw-h-9 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center hover:bg-gray-200" title="delete"><v-icon>mdi-delete</v-icon></button>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props:{
    block : {type : Object , default : () => {}}
  },
  methods:{
    deleteBlock(){
      this.$emit('delete', this.block);
    },
    duplicateBlock(){
      this.$emit('duplicate' , this.block);
    },
    moveUpBlock(){
      this.$emit('move-up' , this.block);
    },
    moveDownBlock(){
      this.$emit('move-down', this.block);
    },
    edit(){
      this.$emit('edit', this.block);
    }
  }
}
</script>
<style>
.selected{
  border: 3px solid #0F1722 !important;
}
.drag-box {
  border-radius: 10px;
  border: 1px dashed #5c5c5c;
  color: #4D4D4D;
}


</style>
