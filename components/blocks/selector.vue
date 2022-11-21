<template>
    <div>
        <h5>Content</h5>

        <v-text-field
            v-model="search"
            label="Search Components "
            placeholder="please enter name ..."
            clearable
        />

        <v-expansion-panels>
            <v-expansion-panel v-for="(group,i) in Blocks" :key="i">
                <v-expansion-panel-header>
                    <span class="tw-font-bold">{{ group.name }}</span>
                </v-expansion-panel-header>

                <v-expansion-panel-content>

                    <draggable v-model="group.blocks" group="people" @start="drag=true" @end="drag=false">
                        <div v-for="(block , j) in group.blocks" :key="`${i}-${j}`" @click="addBlock(block)"
                             class="tw-border-2 tw-border-solid tw-border-gray-200 tw-rounded-lg tw-bg-gray-50 tw-mb-2
               tw-overflow-hidden tw-cursor-pointer transform hover:tw-scale-105 hover:tw-rotate-2 tw-transition tw-duration-300">
                            <img :src="`/blocks/${block.image}`" alt="component thumbnail" style="min-height: 16px"
                                 class="tw-rounded tw-bg-gray-50 tw-max-h-28 tw-w-full tw-object-cover ">
                            <div class="tw-flex tw-items-start tw-justify-between tw-space-x-2 tw-p-2">
                                <div class="tw-font-italic" style="margin-bottom: 0 !important;">{{ block.title }}</div>
                                <div class="tw-text-xs tw-text-orange-700">{{ block.category }}</div>
                            </div>

                        </div>
                    </draggable>

                </v-expansion-panel-content>

            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Emit, Prop} from "vue-property-decorator";
import {BLOCKS} from "@/data/blocks";

@Component
export default class BlocksSelector extends Vue {
    @Prop({type: String, default: 'page'}) blocksType!: string;

    search = '';

    @Emit()
    addBlock(block: any) {
        return block;
    }

    get Blocks() {
        let search = this.search ? this.search.toLowerCase() : '';
        let blocks = this.blocksType === 'page' ? BLOCKS().page : BLOCKS().blog;

        blocks.forEach(i => {
            i.blocks = i.blocks.filter(j => j.name.toLowerCase().includes(search) ||
                j.title.toLowerCase().includes(search) ||
                j.category?.toLowerCase().includes(search)
            ).map((item: any) => {
                return {id: 0, structure: {}, ...item}
            });
        })
        return blocks
            .filter(i => i.blocks.length > 0)
    }
}
</script>
<style>
.v-expansion-panel-content__wrap {
    padding: 6px;
}
</style>
