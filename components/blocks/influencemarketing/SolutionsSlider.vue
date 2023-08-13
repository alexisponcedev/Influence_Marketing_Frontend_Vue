<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div
                class="tw-container tw-mx-auto tw-px-4 tw-pt-16 md:tw-pt-[100px]"
            >
                <h5 class="tw-text-skyblue tw-text-2xl tw-font-normal tw-mb-7">
                    {{ model.subtitle.value }}
                </h5>
                <h2
                    class="tw-font-bold tw-text-white tw-text-4xl md:tw-text-6xl tw-mb-16 -tw-tracking-wide tw-uppercase"
                    v-html="model.title.value"
                ></h2>
            </div>
            <div class="tw-px-4 sm:tw-px-0 tw-pb-16 md:tw-pb-[100px]">
                <div
                    class="tw-flex tw-items-stretch tw-justify-center tw-overflow-hidden tw-gap-4"
                >
                    <div
                        v-for="(item, index) in model.list.value"
                        class="tw-bg-purple tw-px-4 tw-pt-8 tw-pb-10 tw-min-w-[280px] tw-h-full"
                    >
                        <div
                            class="tw-flex tw-justify-between tw-items-start tw-mb-4"
                        >
                            <h3
                                class="tw-text-center tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white -tw-tracking-wide tw-uppercase"
                            >
                                {{ item.title.value }}
                            </h3>
                            <img
                                src="@/assets/images/Art.png"
                                alt="image"
                                width="86"
                                height="50"
                            />
                        </div>
                        <div
                            class="tw-text-white"
                            v-html="item.text.value"
                        ></div>
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
export default class SolutionsSlider extends Vue {
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
