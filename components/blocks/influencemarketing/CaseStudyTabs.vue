<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="flex flex-col justify-center items-center">
                <ul class="w-full md:h-[100px] flex justify-center items-center gap-4">
                    <li v-for="(item, index) in model.tabs.value" :key=index @click="activeItemIndex = index" :class="`px-4 py-6 md:px-4 h-full w-fit flex justify-center items-center cursor-pointer border-skyblue transition-all duration-500 ease-in
                            ${activeItemIndex === index ? 'border-b-2' : 'border-none'}
                            `">
                        <h6 class="text-white text-center md:text-xl font-normal md:leading-[25px]">
                            {{ item.title.value }}
                        </h6>
                    </li>
                </ul>
                <div
                    class="w-full flex justify-center items-center py-10 md:py-16 border-t border-gray-400 overflow-hidden">
                    <div v-for="(item, index) in model.tabs.value" :key=index :class="`text-white text-base font-normal leading-5 text-center px-4 absolute max-w-2xl transition-[opacity] ease-in ${activeItemIndex === index
                        ? 'opacity-100 z-[1] duration-700' : 'opacity-0 z-[-1] pointer-events-none duration-500'}`"
                        v-html=item.description.value></div>
                    <div v-for="(item, index) in model.tabs.value" :key=index
                        :class="`min-w-[100vw] px-4 relative max-w-2xl opacity-0  z-[-1] pointer-events-none`"
                        v-html=item.description.value></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class CaseStudyTabs extends Vue {
    @VModel({ type: Object }) model!: any;

    activeItemIndex = -1

    mounted() {

        blockAddItem(this.model, "tabs", {
            id: 0,
            type: StructureType.List,
            title: "Tabs",
            newItem: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "Title",
                    value: "",
                },
                description: {
                    id: 1,
                    type: StructureType.SimpleText,
                    title: "Description",
                    value: "",
                },
            },
            value: [],
        });

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
