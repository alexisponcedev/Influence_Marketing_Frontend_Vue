<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-container tw-mx-auto tw-px-4 tw-py-44">
                <div
                    class="tw-grid tw-grid-cols-6 tw-gap-16 tw-overflow-hidden tw-pb-12"
                >
                    <div
                        v-for="(item, index) in model.list.value"
                        :key="index"
                        class="tw-col-span-6 md:tw-col-span-3 xl:tw-col-span-2 tw-relative"
                    >
                        <IconDottedBg />
                        <div
                            class="tw-absolute tw-left-0 tw-top-10 xxs:tw-left-5 sm:tw-left-9 xxs:tw-top-5 sm:tw-top-9 tw-w-full tw-h-full tw-group tw-transition-all tw-duration-300 tw-ease-in tw-max-w-[260px] sm:tw-max-w-[300px] tw-overflow-hidden"
                        >
                            <div class="tw-relative tw-w-full">
                                <img
                                    :src="item.background.src"
                                    :alt="item.background.alt"
                                    class="tw-rounded-md tw-w-full"
                                />
                                <div
                                    class="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-gradient-to-b tw-from-transparent tw-to-[#131e29bf]"
                                ></div>
                            </div>
                            <div
                                class="tw-absolute tw-w-full -tw-bottom-5 sm:group-hover:tw-bottom-0 sm:-tw-bottom-10 group-hover:tw-bottom-8 tw-transition-all tw-duration-300 tw-ease-in tw-left-0 tw-text-white tw-p-4"
                            >
                                <img
                                    :src="item.image.src"
                                    :alt="item.image.alt"
                                    class="tw-mb-2 group-hover:tw-opacity-0 tw-opacity-100 tw-transition-all tw-duration-300 tw-ease-in"
                                />
                                <h6
                                    class="tw-text-xl tw-leading-6 tw-font-normal tw-mb-2"
                                >
                                    {{ item.title.value }}
                                </h6>
                                <p class="tw-font-bold">
                                    {{ item.subtitle.value }}
                                </p>
                                <a
                                    :href="item.link.value"
                                    class="btn tw-w-fit tw-mx-auto tw-cursor-pointer tw-tracking-wide text white_text tw-flex tw-justify-center tw-items-center tw-ml-0 !tw-px-0 tw-mt-2 group-hover:tw-opacity-100 tw-opacity-0"
                                >
                                    <span class="tw-pr-2">{{
                                        item.link.title
                                    }}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="14"
                                        viewBox="0 0 15 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M1.25 13.25L13.75 0.75M13.75 0.75H4.375M13.75 0.75V10.125"
                                            stroke="#fff"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </a>
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
export default class TeamMemberGrid extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    colorList = ["#B6DCE4", "#C5E86C", "#9678D3", "#FA4616", "#FFB81C"];

    mounted() {
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
                subtitle: {
                    id: 1,
                    type: StructureType.String,
                    title: "List item title",
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
                    title: "image",
                    src: "",
                    alt: "featured image",
                },
                background: {
                    id: 4,
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
                    subtitle: {
                        id: 1,
                        type: StructureType.String,
                        title: "List item title",
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
                        title: "image",
                        src: "",
                        alt: "featured image",
                    },
                    background: {
                        id: 4,
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
