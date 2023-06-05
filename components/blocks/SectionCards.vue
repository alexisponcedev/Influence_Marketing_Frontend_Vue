<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-container tw-mx-auto tw-p-4">
                <div
                    class="tw-max-w-5xl tw-mx-auto tw-text-center tw-mb-12 md:tw-mb-[88px]"
                >
                    <h2
                        class="multicolor skyblue tw-text-white tw-text-4xl md:tw-text-6xl tw-font-bold -tw-tracking-wide tw-uppercase tw-mb-4 md:tw-mb-7"
                        v-html="model.title.value"
                    ></h2>
                    <h5
                        class="tw-text-white tw-text-2xl tw-font-normal"
                        v-html="model.subtitle.value"
                    ></h5>
                </div>
                <div class="tw-grid tw-grid-cols-2 tw-gap-4">
                    <div
                        v-for="(item, index) in model.list.value"
                        :key="index"
                        class="col-span-2 md:col-span-1 h-0 pt-[100%] relative rounded-md overflow-hidden"
                    >
                        <img
                            :src="item.image.src"
                            :alt="item.image.alt"
                            class="absolute left-0 top-0 h-full w-full object-cover"
                        />
                        <div
                            class="absolute left-0 w-full top-1/2 -translate-y-1/2 text-white text-center p-4"
                        >
                            <h3
                                class="text-4xl md:text-5xl font-bold -tracking-wide mb-7"
                            >
                                {{ item.title.value }}
                            </h3>
                            <div
                                class="mb-7 max-w-[260px] mx-auto"
                                v-html="item.text.value"
                            ></div>
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
export default class SectionCards extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.SimpleText,
            title: "Title",
            value: ".",
        });
        blockAddItem(this.model, "subtitle", {
            id: 0,
            type: StructureType.SimpleText,
            title: "Subtitle",
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
                text: {
                    id: 1,
                    type: StructureType.SimpleText,
                    title: "List item text",
                    value: "",
                },
                link: {
                    id: 2,
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
                    text: {
                        id: 1,
                        type: StructureType.SimpleText,
                        title: "List item text",
                        value: "",
                    },
                    link: {
                        id: 2,
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
