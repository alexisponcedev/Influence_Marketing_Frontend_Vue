<template>
    <div v-if="!isEmpty">
        <section class="tw-bg-midnight">
            <div
                v-if="model.template.value === 'v1'"
                class="tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-min-h-screen tw-h-full"
            >
                <img
                    :src="model.image.src"
                    :alt="model.image.alt"
                    class="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-w-[95%] tw-object-cover"
                />
                <div class="tw-relative tw-text-center tw-w-full tw-h-full">
                    <h1
                        class="tw-text-white multicolor skyblue tw-text-5xl md:tw-text-7xl lg:tw-text-[125px] tw-font-bold tw-uppercase -tw-tracking-wide"
                        v-html="model.title.value"
                    ></h1>
                </div>
            </div>
            <div
                v-else
                class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-min-h-screen tw-h-full"
            >
                <img
                    :src="model.image.src"
                    :alt="model.image.alt"
                    class="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-full md:-tw-translate-y-3/4 tw-w-[95%] tw-object-cover"
                />
                <div
                    class="md:tw-absolute md:tw-left-1/2 md:tw-top-[40%] md:-tw-translate-x-1/2 md:-tw-translate-y-1/2 tw-w-full tw-h-[calc(100vh-150px)] tw-flex tw-justify-center tw-items-center tw-text-center"
                >
                    <h1
                        class="tw-text-white multicolor skyblue tw-text-5xl md:tw-text-7xl lg:tw-text-[125px] tw-font-bold tw-uppercase -tw-tracking-wide"
                        v-html="model.title.value"
                    ></h1>
                </div>
                <div
                    class="tw-w-full tw-max-w-7xl tw-px-4 tw-grid tw-grid-cols-3 md:tw-absolute md:tw-left-1/2 md:-tw-translate-x-1/2 md:tw-bottom-10 tw-gap-4 tw-mb-24 md:tw-mb-0"
                >
                    <div
                        v-for="(item, index) in model.list.value"
                        :key="index"
                        class="tw-col-span-3 md:tw-col-span-1 tw-py-14 tw-px-9 tw-text-center tw-rounded-md"
                        :style="`background-color: ${item.bgColor.value}`"
                    >
                        <h6
                            class="tw-text-xl tw-font-normal tw-text-white tw-mb-12"
                        >
                            {{ item.title.value }}
                        </h6>
                        <a
                            :href="item.link.value"
                            class="btn outline_white tw-block tw-w-fit tw-mx-auto tw-cursor-pointer"
                        >
                            {{ item.link.title }}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class HomeBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    prepare() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });
        blockAddItem(this.model, "image", {
            id: 3,
            type: StructureType.Image,
            title: "Upload Image",
            src: "",
            alt: "Some note about this image",
        });

        if (this.model.template.value === "v2") {
            blockAddItem(this.model, "list", {
                id: 4,
                type: StructureType.List,
                title: "Block List",
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
                    },
                ],
            });
        } else blockRemoveItem(this.model, ["list"]);

        this.model = { ...this.model };
    }

    mounted() {
        blockAddItem(this.model, "template", {
            id: 0,
            type: StructureType.Select,
            title: "Template",
            value: "v1",
            items: [
                { title: "Version 1", value: "v1" },
                { title: "Version 2", value: "v2" },
            ],
        });
        this.prepare();
    }

    get template() {
        return this.model && this.model.template
            ? this.model.template.value
            : "";
    }

    @Watch("template")
    onTemplateChanged() {
        this.prepare();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css">
.large-title {
    font-size: 42px;
    font-weight: 700;
}

.paragraph {
    font-size: 18px;
    font-weight: 400;
}
</style>
