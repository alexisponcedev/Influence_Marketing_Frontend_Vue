<template>
    <div class="tw-relative">
        <div
            v-if="selectable"
            class="tw-z-10 tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-green-500 tw-bg-opacity-30
      tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-4"
            @click="componentSelected">
            <div class="tw-text-2xl tw-text-white tw-font-semibold"> #{{ block.name }}{{ block.id }}</div>
            <!--      <div class="tw-text-lg tw-text-white tw-font-semibold"> click to select </div>-->
        </div>

        <div :class="{'selected tw-border tw-border-solid tw-border-black' : block.selected ,
      'tw-border tw-border-solid tw-border-gray-200' : !block.selected}"
             @click="edit"
             class="tw-overflow-hidden tw-rounded tw-border-[3px] tw-border-solid tw-border-white hover:tw-border-gray-300 tw-transition tw-duration-300 tw-cursor-pointer tw-relative">
            <div class="tw-absolute tw-top-2 tw-right-2 tw-flex tw-items-center tw-space-x-1 tw-z-10 "
                 v-if="block.selected">
                <button
                    @click="moveUpBlock"
                    class="tw-w-9 tw-h-9 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center hover:bg-gray-200"
                    title="move up">
                    <v-icon>mdi-arrow-up</v-icon>
                </button>
                <button
                    @click="moveDownBlock"
                    class="tw-w-9 tw-h-9 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center hover:bg-gray-200"
                    title="move down">
                    <v-icon>mdi-arrow-down</v-icon>
                </button>
                <button
                    @click="resetBlock"
                    class="tw-w-9 tw-h-9 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center hover:bg-gray-200"
                    title="reset">
                    <v-icon>mdi-lock-reset</v-icon>
                </button>
                <button
                    @click="duplicateBlock"
                    class="tw-w-9 tw-h-9 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center hover:bg-gray-200"
                    title="duplicate">
                    <v-icon>mdi-content-copy</v-icon>
                </button>
                <button
                    @click="deleteBlock"
                    class="tw-w-9 tw-h-9 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center hover:bg-gray-200"
                    title="delete">
                    <v-icon>mdi-delete</v-icon>
                </button>
            </div>
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selectable: {type: Boolean, default: false},
        block: {
            type: Object, default: () => {
            }
        }
    },
    data() {
        return {}
    },
    methods: {
        componentSelected() {
            // console.log('blocks/container.vue -> componentSelected : ' , this.block)
            this.$emit('component-selected', this.block);
        },
        deleteBlock() {
            this.$emit('delete', this.block);
        },
        duplicateBlock() {
            this.$emit('duplicate', this.block);
        },
        resetBlock() {
            this.$emit('reset', this.block);
        },
        moveUpBlock() {
            this.$emit('move-up', this.block);
        },
        moveDownBlock() {
            this.$emit('move-down', this.block);
        },
        edit() {
            this.$emit('edit', this.block);
        },
    }
}
</script>
<style>
.selected {
    border: 3px solid #0F1722 !important;
}

.drag-box {
    border-radius: 10px;
    border: 1px dashed #5c5c5c;
    color: #4D4D4D;
}


</style>
