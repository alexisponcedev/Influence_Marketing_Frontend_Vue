<template>
    <div>
        <div class="tw-flex tw-items-start tw-gap-4" style="margin-top: 88px">
            <div
                :class="`bg-white tw-rounded-lg tw-flex-1 tw-overflow-hidden tw-overflow-y-auto tw-space-y-2 tw-p-2 tw-max-h-[86vh]`"
            >
                <draggable
                    v-model="blocksList"
                    group="people"
                    @change="addItemByDrag"
                >
                    <blocks-container
                        v-for="(block, i) in blocksList"
                        :key="block.id + '_' + i"
                        class="tw-mb-2"
                        :selectable="selectable"
                        @component-selected="componentSelected"
                        @edit="editBlock(i)"
                        @delete="deleteBlock(i)"
                        @duplicate="duplicateBlock(i)"
                        @reset="resetBlock(i)"
                        @move-up="moveUpBlock(i)"
                        @move-down="moveDownBlock(i)"
                        :block="block"
                    >
                        <component
                            :is="`blocks-${getActiveBrandName()}-${block.name}`"
                            :id="block.id"
                            v-model="block.structure"
                            :page="page"
                        />
                    </blocks-container>

                    <!-- <blocks-drop /> -->
                </draggable>
            </div>
            <resizable v-model="width">
                <div
                    class="tw-h-[86vh] tw-overflow-hidden tw-overflow-y-auto no-scrollbar tw-bg-white tw-w-full"
                >
                    <blocks-selector
                        v-show="editIndex === -1"
                        class="tw-p-4"
                        :blocks-type="blocksType"
                        @add-block="addBlock"
                    />
                    <structure-editor
                        class="tw-h-full"
                        v-if="editIndex > -1"
                        :key="
                            blocksList[editIndex].title +
                            blocksList[editIndex].id
                        "
                        v-model="blocksList[editIndex].structure"
                        :title="blocksList[editIndex].title"
                        @changeWidget="
                            (cwPayload) => changeWidget(cwPayload, editIndex)
                        "
                        @close="cancelEditing"
                    />
                </div>
            </resizable>
        </div>
        <template-selector ref="templateManager" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import draggable from "vuedraggable";
import { EventBus } from "~/plugins/event.client";
import getActiveBrandName from "~/utils/getActiveBrandName";

@Component({
    components: { draggable },
})
export default class PageBuilder extends Vue {
    @Prop({
        type: Object,
        default: () => {},
    })
    page!: any;
    @VModel({ type: Array }) blocksList!: any;

    editIndex: Number = -1;

    selectItem: any = {};

    getActiveBrandName = getActiveBrandName;

    window = window;
    x = 0;
    y = 0;
    width = localStorage.width || 372;
    height = 0;

    get selectable() {
        return this.selectItem && Object.keys(this.selectItem).length > 0;
    }

    get blocksType() {
        return this.page?.post ? this.page.post.type : "page";
    }

    mounted() {
        EventBus.listen("enable-select-mode", (target: any) => {
            this.selectItem = target;
        });
    }

    destroy() {
        EventBus.remove("enable-select-mode");
    }

    componentSelected(block: any) {
        // this.selectItem.value = `#${this.blocksList[i].name}${this.blocksList[i].id}`;
        this.selectItem.value = `#${block.name}${block.id}`;
        this.selectItem = {}; // unlink selectItem
        EventBus.fire("id-selector-changed");
    }

    cancelEditing() {
        this.editIndex = -1;
    }

    addBlock(block: any) {
        const id = this.blocksList.length
            ? Math.max(...this.blocksList.map((item: any) => item.id)) + 1
            : 1;
        this.blocksList.push({
            ...block,
            id,
            selected: false,
            structure: {},
        });
        this.selectBlock(this.blocksList.length - 1);
        this.deploy();
    }

    addItemByDrag(e: any) {
        if (e.hasOwnProperty("added") && this.blocksList.length > 1) {
            e.added.element.id = this.blocksList.length
                ? Math.max(...this.blocksList.map((item: any) => item.id)) + 1
                : 1;
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
        newBlock.id = this.blocksList.length
            ? Math.max(...this.blocksList.map((item: any) => item.id)) + 1
            : 1;
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

    changeWidget(cwPayload: any, index: number) {
        Object.keys(cwPayload.toWidget).forEach((key) => {
            this.blocksList[index][key] = cwPayload.toWidget[key];
        });

        Object.values(this.blocksList[index].structure).forEach((s: any) => {
            s.hidden = true;
        });

        this.refreshEditIndex(index);
    }

    async refreshEditIndex(editIndex: number) {
        this.editIndex = -1;
        await new Promise((resolve) => setTimeout(resolve, 100));
        this.editIndex = editIndex;
    }
}
</script>
