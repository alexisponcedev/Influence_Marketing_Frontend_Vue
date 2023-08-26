<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div
                class="tw-container tw-mx-auto tw-px-4 tw-py-10 md:tw-py-[60px]"
            >
                <h5
                    class="tw-text-skyblue tw-text-2xl tw-font-normal tw-mb-[60px]"
                >
                    {{ model.title.value }}
                </h5>
                <div
                    v-for="(item, index) in model.list.value"
                    :key="index"
                    class="tw-flex tw-items-start tw-justify-start tw-flex-wrap tw-py-[30px] tw-mb-[60px] tw-gap-10"
                >
                    <h2
                        class="tw-w-full md:tw-w-1/2 tw-font-bold tw-text-white tw-text-4xl md:tw-text-5xl lg:tw-text-6xl tw-leading-none -tw-tracking-wide tw-uppercase"
                        style="word-break: break-word"
                    >
                        {{ item.title.value }}
                    </h2>
                    <div
                        class="tw-w-full md:tw-w-1/2 xl:tw-w-1/3 tw-text-white"
                        v-html="item.text.value"
                    ></div>
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
export default class SolutionsTypes extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.String,
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
