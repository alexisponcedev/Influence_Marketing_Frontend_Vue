<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-container tw-mx-auto tw-p-4">
                <h5 class="tw-text-skyblue tw-text-2xl tw-font-normal tw-mb-7">
                    {{ model.subtitle.value }}
                </h5>
                <h2
                    class="tw-font-bold tw-text-white tw-text-4xl md:tw-text-6xl tw-mb-16 -tw-tracking-wide tw-uppercase"
                    v-html="model.title.value"
                ></h2>
                <div class="tw-grid tw-grid-cols-3 tw-gap-4">
                    <div
                        v-for="(item, index) in model.list.value"
                        :key="index"
                        class="tw-col-span-3 md:tw-col-span-1 tw-h-0 tw-pt-[160%] tw-relative tw-rounded-md tw-overflow-hidden"
                    >
                        <img
                            :src="item.background.src"
                            :alt="item.background.alt"
                            class="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-full tw-object-cover"
                        />
                        <div
                            class="tw-absolute tw-left-0 tw-w-full tw-top-1/2 -tw-translate-y-1/2 tw-text-white tw-text-center tw-p-4 md:tw-p-8"
                        >
                            <img
                                :src="item.image.src"
                                :alt="item.image.alt"
                                class="tw-w-2/3 tw-h-auto tw-max-w-[160px] sm:tw-max-w-[260px] md:tw-max-w-[160px] xl:tw-max-w-xs tw-mx-auto tw-mb-6 md:tw-mb-8"
                            />
                            <div
                                class="tw-mb-8 tw-max-w-[260px] tw-mx-auto"
                                v-html="item.title.value"
                            ></div>
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
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class OurFriends extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "subtitle", {
            id: 0,
            type: StructureType.String,
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
