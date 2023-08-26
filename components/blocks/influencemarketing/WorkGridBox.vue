<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-container tw-mx-auto tw-px-4 tw-pt-16 tw-pb-28">
                <h3
                    class="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white -tw-tracking-wide tw-mb-12 md:tw-mb-[72px] tw-uppercase"
                >
                    {{ model.title.value }}
                </h3>
                <div
                    class="tw-grid tw-grid-cols-2 tw-grid-rows-4 md:tw-grid-rows-3 tw-gap-4"
                >
                    <div
                        class="tw-col-span-2 md:tw-col-span-1 tw-row-span-1 md:tw-row-span-2 tw-relative tw-pt-[100%] md:tw-pt-[50%]"
                    >
                        <img
                            :src="model.block1.value.image.src"
                            :alt="model.block1.value.image.alt"
                            class="tw-w-full tw-h-full tw-absolute tw-object-cover tw-left-0 tw-top-0"
                        />
                        <div
                            class="tw-w-full tw-h-full tw-absolute tw-left-0 tw-top-0 tw-bg-midnight tw-opacity-30"
                        ></div>
                        <div
                            class="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
                        >
                            <h3
                                class="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white -tw-tracking-wide tw-mb-7 tw-uppercase"
                            >
                                {{ model.block1.value.title.value }}
                            </h3>
                            <a
                                :href="model.block1.value.link.value"
                                class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer outline_white tw-tracking-wide"
                            >
                                {{ model.block1.value.link.title }}
                            </a>
                        </div>
                    </div>
                    <div
                        class="tw-col-span-2 md:tw-col-span-1 tw-row-span-1 tw-relative tw-pt-[100%] md:tw-pt-[50%]"
                    >
                        <img
                            :src="model.block2.value.image.src"
                            :alt="model.block2.value.image.alt"
                            class="tw-w-full tw-h-full tw-absolute tw-object-cover tw-left-0 tw-top-0"
                        />
                        <div
                            class="tw-w-full tw-h-full tw-absolute tw-left-0 tw-top-0 tw-bg-midnight tw-opacity-30"
                        ></div>
                        <div
                            class="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
                        >
                            <h3
                                class="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white -tw-tracking-wide tw-mb-7 tw-uppercase"
                            >
                                {{ model.block2.value.title.value }}
                            </h3>
                            <a
                                :href="model.block2.value.link.value"
                                class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer outline_white tw-tracking-wide"
                            >
                                {{ model.block2.value.link.title }}
                            </a>
                        </div>
                    </div>
                    <div
                        class="tw-col-span-2 md:tw-col-span-1 tw-row-span-1 md:tw-row-span-2 tw-relative tw-pt-[100%] md:tw-pt-[50%]"
                    >
                        <img
                            :src="model.block3.value.image.src"
                            :alt="model.block3.value.image.alt"
                            class="tw-w-full tw-h-full tw-absolute tw-object-cover tw-left-0 tw-top-0"
                        />
                        <div
                            class="tw-w-full tw-h-full tw-absolute tw-left-0 tw-top-0 tw-bg-midnight tw-opacity-30"
                        ></div>
                        <div
                            class="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
                        >
                            <h3
                                class="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white -tw-tracking-wide tw-mb-7 tw-uppercase"
                            >
                                {{ model.block3.value.title.value }}
                            </h3>
                            <a
                                :href="model.block3.value.link.value"
                                class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer outline_white tw-tracking-wide"
                            >
                                {{ model.block3.value.link.title }}
                            </a>
                        </div>
                    </div>
                    <div
                        class="tw-col-span-2 md:tw-col-span-1 tw-row-span-1 tw-relative tw-pt-[100%] md:tw-pt-[50%]"
                    >
                        <img
                            :src="model.block4.value.image.src"
                            :alt="model.block4.value.image.alt"
                            class="tw-w-full tw-h-full tw-absolute tw-object-cover tw-left-0 tw-top-0"
                        />
                        <div
                            class="tw-w-full tw-h-full tw-absolute tw-left-0 tw-top-0 tw-bg-midnight tw-opacity-30"
                        ></div>
                        <div
                            class="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
                        >
                            <h3
                                class="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white -tw-tracking-wide tw-mb-7 tw-uppercase"
                            >
                                {{ model.block4.value.title.value }}
                            </h3>
                            <a
                                :href="model.block4.value.link.value"
                                class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer outline_white tw-tracking-wide"
                            >
                                {{ model.block4.value.link.title }}
                            </a>
                        </div>
                    </div>
                </div>
                <a
                    :href="model.link.value"
                    class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer outline_white tw-tracking-wide tw-mt-16"
                >
                    {{ model.link.title }}
                </a>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class WorkGridBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.String,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "block1", {
            id: 1,
            type: StructureType.Object,
            title: "Block 1",
            value: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "Block 1 title",
                    value: "",
                },
                link: {
                    id: 1,
                    type: StructureType.Url,
                    title: "Block 1 link",
                    value: "/",
                },
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Block 1 image",
                    src: "",
                    alt: "featured image",
                },
            },
        });
        blockAddItem(this.model, "block2", {
            id: 2,
            type: StructureType.Object,
            title: "Block 2",
            value: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "Block 2 title",
                    value: "",
                },
                link: {
                    id: 1,
                    type: StructureType.Url,
                    title: "Block 2 link",
                    value: "/",
                },
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Block 2 image",
                    src: "",
                    alt: "featured image",
                },
            },
        });
        blockAddItem(this.model, "block3", {
            id: 3,
            type: StructureType.Object,
            title: "Block 3",
            value: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "Block 3 title",
                    value: "",
                },
                link: {
                    id: 1,
                    type: StructureType.Url,
                    title: "Block 3 link",
                    value: "/",
                },
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Block 3 image",
                    src: "",
                    alt: "featured image",
                },
            },
        });
        blockAddItem(this.model, "block4", {
            id: 4,
            type: StructureType.Object,
            title: "Block 4",
            value: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "Block 4 title",
                    value: "",
                },
                link: {
                    id: 1,
                    type: StructureType.Url,
                    title: "Block 4 link",
                    value: "/",
                },
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Block 4 image",
                    src: "",
                    alt: "featured image",
                },
            },
        });
        blockAddItem(this.model, "link", {
            id: 5,
            type: StructureType.Url,
            title: "Link",
            value: "",
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
