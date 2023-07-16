<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div
                class="container_small tw-mx-auto tw-px-4 tw-py-16 md:tw-py-[100px]"
            >
                <h2
                    class="tw-text-4xl md:tw-text-5xl lg:tw-text-6xl tw-text-white tw-leading-none tw-font-bold tw-uppercase -tw-tracking-[1.2px] tw-mb-4 tw-text-center"
                    v-html="model.title.value"
                ></h2>
                <div
                    class="tw-flex tw-items-center tw-justify-center tw-flex-wrap tw-gap-4"
                >
                    <div
                        v-for="(item, index) in model.list.value"
                        :key="index"
                        class="tw-w-full md:tw-w-[calc(50%-12px)] xl:tw-w-[calc(33.33%-12px)] tw-bg-purple tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-4 tw-py-8 tw-gap-4"
                    >
                        <img
                            src="@/assets/images/floating_cube.png"
                            alt="cube"
                            width="150"
                            height="150"
                        />
                        <h4
                            class="tw-text-2xl md:tw-text-[34px] tw-leading-none tw-font-bold -tw-tracking-wide tw-text-white"
                        >
                            {{ item.title.value }}
                        </h4>
                        <div
                            class="tw-text-center tw-text-white"
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
export default class SolutionsTripleBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
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
