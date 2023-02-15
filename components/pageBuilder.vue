<template>
    <div>
        <div class="tw-grid tw-grid-cols-10 tw-gap-6" style="margin-top: 88px">
            <div
                :class="`bg-white tw-rounded-lg tw-overflow-hidden tw-overflow-y-auto tw-space-y-2 tw-p-2 tw-max-h-[88vh]`"
                :style="`width:${window.innerWidth - width - 50}px`"
            >
                <draggable
                    v-model="blocksList"
                    group="people"
                    @change="addItemByDrag"
                >
                    <blocks-container
                        v-for="(block, i) in blocksList"
                        :key="block.id"
                        class="tw-mb-2"
                        :selectable="selectable"
                        @component-selected="componentSelected(i)"
                        @edit="editBlock(i)"
                        @delete="deleteBlock(i)"
                        @duplicate="duplicateBlock(i)"
                        @reset="resetBlock(i)"
                        @move-up="moveUpBlock(i)"
                        @move-down="moveDownBlock(i)"
                        :block="block"
                    >
                        <component
                            :is="`blocks-${block.name}`"
                            :id="block.id"
                            v-model="block.structure"
                            :page="page"
                        />
                    </blocks-container>

                    <blocks-drop />
                </draggable>
            </div>
            <vue-draggable-resizable
                :handles="['ml']"
                :draggable="false"
                :maxWidth="window.innerWidth / 2 - 80"
                axis="x"
                :w="width"
                v-on:dragging="onDrag"
                v-on:resizing="onResize"
                class="bg-white tw-rounded-lg tw-h-full tw-max-h-[88vh] resizable tw-right-[12px]"
            >
                <div
                    class="bg-white th-h-full tw-overflow-hidden tw-overflow-y-auto tw-max-h-[88vh]"
                >
                    <blocks-selector
                        v-show="editIndex === -1"
                        class="tw-p-4 tw-pl-6"
                        :blocks-type="blocksType"
                        @add-block="addBlock"
                    />

                    <structure-editor
                        v-if="editIndex > -1"
                        :key="
                            blocksList[editIndex].title +
                            blocksList[editIndex].id
                        "
                        v-model="blocksList[editIndex].structure"
                        :title="blocksList[editIndex].title"
                        @close="cancelEditing"
                    />
                </div>
            </vue-draggable-resizable>
        </div>

        <template-selector ref="templateManager" />
    </div>
</template>

<style lang="scss">
.resizable {
    transform: translate(0, 0) !important;
    border: none !important;
    .handle-ml {
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid rgb(175, 175, 175);
        border-left: none !important;
        background : transparent;
        width: 0;
        height: 0;
        left: 4px !important;
    }
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Watch, VModel } from "vue-property-decorator";
import draggable from "vuedraggable";
import { EventBus } from "~/plugins/event.client";

import "vue-draggable-resizable/dist/VueDraggableResizable.css";

@Component({
    components: { draggable },
})
export default class PageBuilder extends Vue {
    @Prop({
        type: Object,
        default: () => {},
    })
    page!: any;
    @Prop({ type: String, default: "page" }) blocksType!: string;
    @VModel({ type: Array }) blocksList!: any;

    editIndex: Number = -1;

    selectItem: any = {};

    window = window;
    x = 0;
    y = 0;
    width = 320;
    height = 0;

    get selectable() {
        return this.selectItem && Object.keys(this.selectItem).length > 0;
    }

    onResize(x, y, width, height) {
        console.log(x);
        console.log(y);
        console.log(width);
        console.log(height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    onDrag(x, y) {
        console.log(x);
        console.log(y);
        this.x = x;
        this.y = y;
    }

    mounted() {
        EventBus.listen("enable-select-mode", (target: any) => {
            this.selectItem = target;
        });
    }

    destroy() {
        EventBus.remove("enable-select-mode");
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
        this.blocksList.push({
            ...block,
            id: id,
            selected: false,
            structure: {},
        });
        this.selectBlock(this.blocksList.length - 1);
        this.deploy();
    }

    addItemByDrag(e: any) {
        console.log("item is dropped : ", e);
        if (e.hasOwnProperty("added") && this.blocksList.length > 1) {
            e.added.element.id = this.blocksList.length + 1;
        }
        this.deploy();
    }

    selectBlock(index: number) {
        this.blocksList.forEach(
            (item: { selected: boolean }) => (item.selected = false)
        );
        this.blocksList[index].selected = true;
    }

    editBlock(i: number) {
        this.selectBlock(i);
        this.editIndex = i;
    }

    deleteBlock(i: any) {
        this.cancelEditing();
        this.blocksList.splice(i, 1);
        this.deploy();
    }

    duplicateBlock(i: any) {
        let newBlock = JSON.parse(JSON.stringify(this.blocksList[i]));
        newBlock.id = this.blocksList.length + 1;
        this.blocksList.splice(i + 1, 0, newBlock);
        this.deploy();
    }

    resetBlock(i: any) {
        this.blocksList[i].structure = [];
    }

    moveUpBlock(i: any) {
        if (i > 0 && this.blocksList.length > 1) {
            const block = this.blocksList.splice(i, 1)[0];
            this.blocksList.splice(i - 1, 0, block);
            this.deploy();
        }
    }

    moveDownBlock(i: any) {
        if (this.blocksList.length > 1 && i < this.blocksList.length) {
            const block = this.blocksList.splice(i, 1)[0];
            this.blocksList.splice(i + 1, 0, block);
            this.deploy();
        }
    }

    deploy() {
        this.$emit("needDeploy");
    }
}
</script>
