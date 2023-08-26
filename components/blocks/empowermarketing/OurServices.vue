<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-container tw-mx-auto tw-p-4">
                <div class="md:tw-pl-20 tw-mb-8">
                    <h5 class="tw-text-white tw-text-2xl tw-font-normal">
                        {{ model.title.value }}
                    </h5>
                </div>
                <div
                    class="tw-grid tw-grid-cols-4 tw-rounded-md tw-overflow-hidden"
                >
                    <div
                        v-for="(item, index) in model.list.value"
                        :key="index"
                        class="tw-col-span-4 sm:tw-col-span-2 lg:tw-col-span-1 tw-w-full tw-h-full tw-group tw-transition-all"
                    >
                        <div
                            class="tw-w-full tw-h-full tw-relative tw-transition-all"
                            :style="`background-color: ${item.bgColor.value}`"
                        >
                            <img
                                :src="item.background.src"
                                :alt="item.background.alt"
                                class="tw-object-cover tw-w-full group-hover:tw-opacity-0 tw-transition-all"
                            />
                            <div
                                class="tw-absolute tw-w-full tw-h-full tw-bg-black tw-bg-opacity-20 tw-top-0 tw-z-10 tw-group-hover:tw-opacity-0 tw-transition-all"
                            ></div>
                            <div
                                class="tw-flex tw-justify-center tw-flex-col tw-gap-12 tw-items-center tw-w-full tw-h-full tw-absolute tw-top-0 tw-z-20"
                            >
                                <img
                                    :src="item.image.src"
                                    :alt="item.image.alt"
                                />
                                <p
                                    class="tw-text-white tw-text-4xl md:tw-text-5xl tw-font-bold"
                                >
                                    {{ item.title.value }}
                                </p>
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
export default class OurServices extends Vue {
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
                bgColor: {
                    id: 2,
                    type: StructureType.Color,
                    title: "background color",
                    value: "#000",
                },
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Middle image",
                    src: "",
                    alt: "featured image",
                },
                background: {
                    id: 4,
                    type: StructureType.Image,
                    title: "background",
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
                    bgColor: {
                        id: 2,
                        type: StructureType.Color,
                        title: "background color",
                        value: "#fff",
                    },
                    image: {
                        id: 3,
                        type: StructureType.Image,
                        title: "Middle image",
                        src: "",
                        alt: "featured image",
                    },
                    background: {
                        id: 4,
                        type: StructureType.Image,
                        title: "background",
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
