<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div
                class="tw-container tw-mx-auto tw-px-4 tw-py-10 md:tw-py-[60px]"
            >
                <h5 class="tw-text-skyblue tw-text-2xl tw-font-normal tw-mb-7">
                    {{ model.subtitle.value }}
                </h5>
                <div
                    class="tw-flex tw-items-start tw-justify-start tw-flex-wrap tw-my-[30px]"
                >
                    <h2
                        class="tw-w-full md:tw-w-1/2 tw-font-bold tw-text-white tw-text-4xl md:tw-text-5xl lg:tw-text-6xl tw-leading-none tw-mb-16 -tw-tracking-wide tw-uppercase"
                        v-html="model.title.value"
                    ></h2>
                    <div class="tw-w-full md:tw-w-1/2 xl:tw-w-1/3">
                        <div
                            v-for="(item, index) in model.list.value"
                            :key="index"
                            class="tw-mb-8 tw-border-b tw-border-purple tw-overflow-hidden tw-transition-all tw-duration-300 tw-ease-in tw-pb-0"
                        >
                            <div
                                class="tw-flex tw-justify-between tw-items-center tw-mb-8 tw-cursor-pointer"
                            >
                                <p class="tw-font-bold !tw-text-white">
                                    {{ item.title.value }}
                                </p>
                                <button
                                    class="!tw-bg-purple tw-cursor-pointer btn accordion_btn tw-tracking-wide tw-flex tw-justify-center tw-items-center !tw-w-6 !tw-h-6"
                                    icon
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="9"
                                        height="14"
                                        viewBox="0 0 9 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M8.36033 7.27288L2.05616 0.968716C1.98355 0.896099 1.84338 0.918053 1.74543 1.016L0.911182 1.85025C0.811545 1.94989 0.789591 2.09006 0.862208 2.16267L6.10414 7.4046L0.852076 12.6567C0.784525 12.7242 0.811545 12.8576 0.911183 12.9573L1.74543 13.7915C1.84507 13.8911 1.97848 13.9165 2.04603 13.8506L8.31304 7.58361C8.41268 7.48397 8.43294 7.34549 8.36033 7.27288Z"
                                            fill="white"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div
                                class="tw-text-white"
                                v-html="item.text.value"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.btn.accordion_btn {
    padding: 6px !important;
}
</style>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class SolutionsFAQ extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "subtitle", {
            id: 0,
            type: StructureType.String,
            title: "Subtitle",
            value: "",
        });
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 3,
            type: StructureType.List,
            title: "Card List",
            newItem: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "List item title",
                    value: "",
                },
                text: {
                    id: 2,
                    type: StructureType.SimpleText,
                    title: "List item title",
                    value: "",
                },
            },
            value: [
                {
                    title: {
                        id: 0,
                        type: StructureType.String,
                        title: "List item title",
                        value: "",
                    },
                    text: {
                        id: 2,
                        type: StructureType.SimpleText,
                        title: "List item title",
                        value: "",
                    },
                },
            ],
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
