<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-flex tw-flex-col tw-justify-center tw-items-center">
                <ul class="tw-w-full md:tw-h-[100px] tw-flex tw-justify-center tw-items-center tw-gap-4">
                    <li v-for="(item, index) in model.tabs.value" :key=index @click="activeItemIndex = index" :class="`tw-px-4 tw-py-6 md:tw-px-4 tw-h-full tw-w-fit tw-flex tw-justify-center tw-items-center tw-cursor-pointer tw-border-skyblue tw-transition-all tw-duration-500 tw-ease-in
                            ${activeItemIndex === index ? 'tw-border-b-2' : 'tw-border-none'}
                            `">
                        <h6 class="tw-text-white tw-text-center md:tw-text-xl tw-font-normal md:tw-leading-[25px]">
                            {{ item.title.value }}
                        </h6>
                    </li>
                </ul>
                <div
                    class="tw-w-full tw-flex tw-justify-center tw-items-center tw-py-10 md:tw-py-16 tw-border-t tw-border-gray-400 tw-overflow-hidden">
                    <div v-for="(item, index) in model.tabs.value" :key=index
                        :class="`tw-text-white tw-text-base tw-font-normal tw-leading-5 tw-text-center tw-px-4 tw-absolute tw-max-w-2xl tw-transition-[opacity] tw-ease-in ${activeItemIndex === index
                            ? 'tw-opacity-100 tw-z-[1] tw-duration-700' : 'tw-opacity-0 tw-z-[-1] tw-pointer-events-none tw-duration-500'}`" v-html=item.description.value></div>
                    <div v-for="(item, index) in model.tabs.value" :key=index
                        :class="`tw-min-w-[100vw] tw-px-4 tw-relative tw-max-w-2xl tw-opacity-0  tw-z-[-1] tw-pointer-events-none`"
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
