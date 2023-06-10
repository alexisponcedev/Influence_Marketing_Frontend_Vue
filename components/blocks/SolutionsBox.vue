<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-container tw-mx-auto tw-px-4 tw-py-20 md:tw-py-28">
                <h3
                    class="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white -tw-tracking-wide tw-mb-12 md:tw-mb-[72px] tw-uppercase"
                >
                    {{ model.title.value }}
                </h3>
                <div class="tw-grid tw-grid-cols-3 tw-gap-4">
                    <div
                        v-for="(item, index) in model.list.value"
                        :key="index"
                        class="tw-col-span-3 md:tw-col-span-1 tw-w-full tw-h-full tw-group tw-transition-all"
                    >
                        <div class="tw-w-full tw-h-0 tw-pt-[100%] tw-relative">
                            <img
                                :src="item.image.src"
                                :alt="item.image.alt"
                                class="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-object-cover tw-w-full tw-transition-all"
                            />
                            <div
                                class="tw-absolute tw-w-full tw-h-full tw-bg-black tw-bg-opacity-20 tw-top-0 tw-z-10 tw-transition-all"
                            ></div>
                            <div
                                class="tw-absolute tw-top-1/2 -tw-translate-y-1/2 tw-left-0 tw-w-full tw-z-20"
                            >
                                <h4
                                    class="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white -tw-tracking-wide tw-mb-7 tw-uppercase tw-text-center"
                                >
                                    {{ item.title.value }}
                                </h4>
                                <a
                                    :href="item.link.value"
                                    class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer outline_white tw-tracking-wide"
                                    >{{ item.link.title }}</a
                                >
                            </div>
                        </div>
                    </div>
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
export default class SolutionsBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.String,
            title: "Title",
            value: ".",
        });
        blockAddItem(this.model, "list", {
            id: 4,
            type: StructureType.List,
            title: "Card List",
            newItem: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "List item title",
                    value: "",
                },
                link: {
                    id: 1,
                    type: StructureType.Url,
                    title: "link",
                    value: "/",
                },
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "background image",
                    src: "",
                    alt: "featured image",
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
                    link: {
                        id: 1,
                        type: StructureType.Url,
                        title: "link",
                        value: "/",
                    },
                    image: {
                        id: 3,
                        type: StructureType.Image,
                        title: "background image",
                        src: "",
                        alt: "featured image",
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
