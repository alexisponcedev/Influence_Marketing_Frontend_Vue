<template>
    <section v-if="!isEmpty">
        <div
            class="tw-bg-midnight tw-relative tw-flex tw-flex-wrap tw-items-center"
        >
            <div
                class="tw-container tw-mx-auto tw-p-4 lg:tw-absolute lg:tw-left-1/2 lg:tw-top-1/2 lg:-tw-translate-y-1/2 lg:-tw-translate-x-1/2"
            >
                <div
                    class="tw-max-w-lg lg:tw-max-w-md xl:tw-max-w-lg tw-mb-10 lg:tw-mb-24"
                >
                    <h5
                        class="tw-text-skyblue tw-text-2xl tw-font-normal tw-mb-7"
                    >
                        {{ model.subtitle.value }}
                    </h5>
                    <h2
                        class="tw-font-bold tw-text-white tw-text-4xl md:tw-text-6xl tw-mb-7 -tw-tracking-wide tw-uppercase"
                        v-html="model.title.value"
                    ></h2>
                    <h6
                        class="tw-text-xl tw-text-white tw-font-normal"
                        v-html="model.text.value"
                    ></h6>
                </div>
            </div>
            <div
                class="tw-w-full tw-flex tw-items-center lg:tw-w-1/2 tw-ml-auto tw-mb-24"
            >
                <div
                    v-for="(item, index) in model.list.value"
                    :key="index"
                    class="md:!tw-w-[70%] tw-min-w-[400px]"
                >
                    <div
                        class="tw-relative tw-p-[50%] tw-h-0 tw-w-full tw-rounded-md tw-overflow-hidden"
                    >
                        <img
                            :src="item.background.src"
                            :alt="item.background.alt"
                            class="tw-w-full tw-h-full tw-absolute tw-left-0 tw-top-0"
                        />
                        <div
                            class="tw-absolute tw-left-0 tw-w-full tw-top-1/2 -tw-translate-y-1/2 tw-text-white tw-text-center tw-p-4"
                        >
                            <h4
                                class="tw-text-2xl md:tw-text-[34px] tw-leading-none tw-font-bold -tw-tracking-wide tw-mb-8 md:tw-mb-[60px]"
                            >
                                {{ item.title.value }}
                            </h4>
                            <img
                                :src="item.image.src"
                                :alt="item.image.alt"
                                class="tw-w-1/2 tw-h-auto tw-max-w-xs tw-mx-auto tw-mb-8 md:tw-mb-[60px]"
                            />
                            <a
                                :href="item.link.value"
                                class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer outline_white"
                            >
                                {{ item.link.title }}
                            </a>
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
export default class HomeSlider extends Vue {
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
        blockAddItem(this.model, "text", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Text",
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
                link: {
                    id: 1,
                    type: StructureType.Url,
                    title: "link",
                    value: "/",
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
