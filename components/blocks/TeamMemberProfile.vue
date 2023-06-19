<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div
                class="tw-container tw-mx-auto tw-px-4 tw-min-h-screen md:tw-h-screen tw-pt-[132px]"
            >
                <div>
                    <a
                        :href="model.backLink.value"
                        class="btn tw-w-fit tw-mx-auto tw-cursor-pointer tw-tracking-wide text white_text tw-flex tw-ml-0 !tw-py-6 !tw-px-7"
                    >
                        <div class="tw-rotate-[90deg]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="14"
                                viewBox="0 0 13 14"
                                fill="none"
                            >
                                <path
                                    d="M6.5 0.75V13.25M6.5 13.25L12.125 7.625M6.5 13.25L0.875 7.625"
                                    stroke="#fff"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                        <span class="tw-ml-2">{{ model.backLink.title }}</span>
                    </a>
                </div>
                <div
                    class="md:tw-h-full tw-flex tw-flex-wrap tw-items-center tw-justify-start"
                >
                    <div class="md:tw-h-3/4 tw-w-full md:tw-w-1/2 tw-relative">
                        <div
                            class="tw-scale-[0.8] xs:tw-scale-100 lg:tw-scale-[1.33] tw-origin-top-left tw-w-fit"
                        >
                            <IconDottedBg />
                        </div>
                        <div
                            class="tw-absolute tw-left-3 tw-top-3 xs:tw-left-10 xs:tw-top-10 tw-w-full tw-h-auto tw-transition-all tw-duration-300 tw-ease-in tw-max-w-[240px] xs:tw-max-w-[300px] lg:tw-max-w-[440px] tw-overflow-hidden"
                        >
                            <div class="tw-relative tw-w-full">
                                <img
                                    :src="model.image.src"
                                    :alt="model.image.alt"
                                    class="tw-rounded-md tw-w-full"
                                />
                                <div
                                    class="tw-absolute tw-w-full tw-bottom-0 tw-right-0 tw-pb-6 tw-px-7 tw-text-white"
                                >
                                    <img
                                        :src="model.icon.src"
                                        :alt="model.icon.alt"
                                        class="tw-ml-auto tw-w-16 lg:tw-w-24"
                                    />
                                </div>
                            </div>
                            <div
                                class="tw-mt-10 tw-flex tw-justify-between tw-items-center"
                            >
                                <span class="tw-text-white">{{
                                    model.subtitle.value
                                }}</span>
                                <div
                                    class="tw-flex tw-items-center tw-justify-between"
                                >
                                    <a :href="model.linkedinLink.value">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="22"
                                            height="18"
                                            viewBox="0 0 22 18"
                                            fill="none"
                                        >
                                            <path
                                                d="M20.75 3.75V14.25C20.75 15.4926 19.7426 16.5 18.5 16.5H3.5C2.25736 16.5 1.25 15.4926 1.25 14.25V3.75M20.75 3.75C20.75 2.50736 19.7426 1.5 18.5 1.5H3.5C2.25736 1.5 1.25 2.50736 1.25 3.75M20.75 3.75V3.99271C20.75 4.77405 20.3447 5.49945 19.6792 5.90894L12.1792 10.5243C11.4561 10.9694 10.5439 10.9694 9.8208 10.5243L2.32078 5.90894C1.65535 5.49945 1.25 4.77405 1.25 3.99271V3.75"
                                                stroke="white"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        :href="model.emailLink.value"
                                        class="tw-ml-4"
                                    >
                                        <svg
                                            width="21"
                                            height="20"
                                            viewBox="0 0 21 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M18.6931 0H1.54581C0.760097 0 0.121704 0.647322 0.121704 1.44196V18.558C0.121704 19.3527 0.760097 20 1.54581 20H18.6931C19.4788 20 20.1217 19.3527 20.1217 18.558V1.44196C20.1217 0.647322 19.4788 0 18.6931 0ZM6.16635 17.1429H3.20206V7.59821H6.17081V17.1429H6.16635ZM4.6842 6.29464C3.73331 6.29464 2.96545 5.52232 2.96545 4.57589C2.96545 3.62946 3.73331 2.85714 4.6842 2.85714C5.63063 2.85714 6.40295 3.62946 6.40295 4.57589C6.40295 5.52679 5.6351 6.29464 4.6842 6.29464ZM17.278 17.1429H14.3137V12.5C14.3137 11.3929 14.2913 9.96875 12.7735 9.96875C11.2288 9.96875 10.9922 11.1741 10.9922 12.4196V17.1429H8.02795V7.59821H10.8717V8.90179H10.9119C11.3092 8.15179 12.278 7.36161 13.7199 7.36161C16.7199 7.36161 17.278 9.33929 17.278 11.9107V17.1429Z"
                                                fill="#fff"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="tw-w-full md:tw-w-1/2 md:tw-h-fit tw-max-w-[500px] md:tw-pl-4 tw-mt-14 xs:tw-mt-20 md:tw-mt-0"
                    >
                        <div class="tw-mb-[60px]">
                            <h3
                                class="tw-mb-4 tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white -tw-tracking-wide tw-uppercase"
                                v-html="model.name.value"
                            ></h3>
                            <h5
                                class="tw-text-xl md:tw-text-2xl tw-text-white tw-uppercase"
                                v-html="model.position.value"
                            ></h5>
                        </div>
                        <div
                            class="tw-flex tw-flex-wrap tw-justify-between tw-items-start tw-mb-[30px] tw-text-white"
                        >
                            <p
                                class="tw-w-full xs:tw-w-1/2 tw-font-bold tw-mb-4 xs:tw-mb-0"
                            >
                                {{ model.about.value }}
                            </p>
                            <div
                                class="tw-w-full xs:tw-w-1/2"
                                v-html="model.aboutDescription.value"
                            ></div>
                        </div>
                        <div
                            v-for="(item, index) in model.list.value"
                            :key="index"
                            class="tw-flex tw-flex-wrap tw-justify-between tw-items-start tw-mb-[30px] tw-text-white"
                        >
                            <p
                                class="tw-w-full xs:tw-w-1/2 tw-font-bold tw-mb-4 xs:tw-mb-0"
                            >
                                {{ item.title.value }}
                            </p>
                            <ul
                                class="tw-w-full xs:tw-w-1/2 tw-list-disc tw-pl-4"
                            >
                                <li
                                    v-for="(info, _index) in item.list.value"
                                    :key="_index"
                                    class="tw-mb-2"
                                    v-html="info.text.value"
                                ></li>
                            </ul>
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
export default class TeamMemberProfile extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "backLink", {
            id: 0,
            type: StructureType.Url,
            title: "Back Button",
            value: "",
        });
        blockAddItem(this.model, "image", {
            id: 1,
            type: StructureType.Image,
            title: "Picture",
            src: "",
            alt: "",
        });
        blockAddItem(this.model, "icon", {
            id: 2,
            type: StructureType.Image,
            title: "Icon",
            src: "",
            alt: "",
        });
        blockAddItem(this.model, "subtitle", {
            id: 3,
            type: StructureType.String,
            title: "Subtitle",
            value: "",
        });
        blockAddItem(this.model, "linkedinLink", {
            id: 4,
            type: StructureType.Url,
            title: "LinkedIn Link",
            value: "",
        });
        blockAddItem(this.model, "emailLink", {
            id: 5,
            type: StructureType.Url,
            title: "Email Link",
            value: "",
        });
        blockAddItem(this.model, "name", {
            id: 6,
            type: StructureType.SimpleText,
            title: "Name",
            value: "",
        });
        blockAddItem(this.model, "position", {
            id: 7,
            type: StructureType.SimpleText,
            title: "Position",
            value: "",
        });
        blockAddItem(this.model, "about", {
            id: 8,
            type: StructureType.String,
            title: "About",
            value: "",
        });
        blockAddItem(this.model, "aboutDescription", {
            id: 9,
            type: StructureType.SimpleText,
            title: "About Text",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 10,
            type: StructureType.List,
            title: "List of info about member",
            newItem: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "List item title",
                    value: "",
                },
                list: {
                    id: 1,
                    type: StructureType.List,
                    title: "List item sublist of info",
                    newItem: {
                        text: {
                            id: 0,
                            type: StructureType.SimpleText,
                            title: "Sublist info",
                            value: "",
                        },
                    },
                    value: [
                        {
                            text: {
                                id: 0,
                                type: StructureType.SimpleText,
                                title: "Sublist info",
                                value: "",
                            },
                        },
                    ],
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
                    list: {
                        id: 1,
                        type: StructureType.List,
                        title: "List item sublist of info",
                        newItem: {
                            text: {
                                id: 0,
                                type: StructureType.SimpleText,
                                title: "Sublist info",
                                value: "",
                            },
                        },
                        value: [
                            {
                                text: {
                                    id: 0,
                                    type: StructureType.SimpleText,
                                    title: "Sublist info",
                                    value: "",
                                },
                            },
                        ],
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
