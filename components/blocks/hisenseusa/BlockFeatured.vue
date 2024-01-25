<template>
    <div>
        <img src="/blocks/BlockFeatured.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class BlockFeatured extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "list", {
            id: 3,
            type: StructureType.List,
            title: "List",
            newItem: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "Title",
                    value: "Introducing our CMO, Mr. McHale.",
                },
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "Image Alt",
                },
                video: {
                    id: 2,
                    type: StructureType.Url,
                    title: "Video",
                    value: "",
                },
                text: {
                    id: 3,
                    type: StructureType.String,
                    title: "Text",
                    value: "",
                },
                link: {
                    id: 4,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Learn More",
                    value: "",
                },
                lightbox: {
                    id: 5,
                    type: StructureType.Select,
                    title: "Open Light Box (this option will ignore the Link)",
                    value: true,
                    items: [
                        { title: "Active", value: true },
                        { title: "Deactive", value: false },
                    ],
                },
                lightboxObject: {
                    id: 6,
                    type: StructureType.Object,
                    title: "Light Box Data",
                    value: {
                        caption: {
                            id: 0,
                            type: StructureType.SimpleText,
                            title: "Title",
                            value: "",
                        },
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                            alt: "some note about this asset",
                        },
                        video: {
                            id: 2,
                            type: StructureType.String,
                            title: "Iframe Link",
                            value: "",
                        },
                        link: {
                            id: 3,
                            type: StructureType.Url,
                            title: "Download",
                            value: "/",
                        },
                    },
                },
                activate_date: {
                    id: 7,
                    type: StructureType.Select,
                    title: "Countdown timer activation",
                    value: true,
                    items: [
                        { title: "Active", value: true },
                        { title: "Deactive", value: false },
                    ],
                },
                date: {
                    id: 8,
                    type: StructureType.Datetime,
                    title: "Countdown date",
                    value: "",
                },
                itemCenter: {
                    id: 9,
                    type: StructureType.Number,
                    title: "The percentage that the item will be placed in the center of the slider",
                    value: "",
                },
            },
            value: [
                {
                    title: {
                        id: 0,
                        type: StructureType.String,
                        title: "Title",
                        value: "Introducing our CMO, Mr. McHale.",
                    },
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Image",
                        src: "",
                        alt: "Image Alt",
                    },
                    video: {
                        id: 2,
                        type: StructureType.Url,
                        title: "Video",
                        value: "",
                    },
                    text: {
                        id: 3,
                        type: StructureType.String,
                        title: "Text",
                        value: "",
                    },
                    link: {
                        id: 4,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Learn More",
                        value: "",
                    },
                    lightbox: {
                        id: 5,
                        type: StructureType.Select,
                        title: "Open Light Box (this option will ignore the Link)",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    lightboxObject: {
                        id: 6,
                        type: StructureType.Object,
                        title: "Light Box Data",
                        value: {
                            caption: {
                                id: 0,
                                type: StructureType.SimpleText,
                                title: "Title",
                                value: "",
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "",
                                alt: "some note about this asset",
                            },
                            video: {
                                id: 2,
                                type: StructureType.String,
                                title: "Iframe Link",
                                value: "",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                title: "Download",
                                value: "/",
                            },
                        },
                    },
                    activate_date: {
                        id: 7,
                        type: StructureType.Select,
                        title: "Countdown timer activation",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    date: {
                        id: 8,
                        type: StructureType.Datetime,
                        title: "Countdown date",
                        value: "",
                    },
                    itemCenter: {
                        id: 9,
                        type: StructureType.Number,
                        title: "The percentage that the item will be placed in the center of the slider",
                        value: "",
                    },
                },
                {
                    title: {
                        id: 0,
                        type: StructureType.String,
                        title: "Title",
                        value: "TVs big on specs, low on B.S.",
                    },
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Image",
                        src: "",
                        alt: "Image Alt",
                    },
                    video: {
                        id: 2,
                        type: StructureType.Url,
                        title: "Video",
                        value: "",
                    },
                    text: {
                        id: 3,
                        type: StructureType.String,
                        title: "Text",
                        value: "",
                    },
                    link: {
                        id: 4,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Learn More",
                        value: "",
                    },
                    lightbox: {
                        id: 5,
                        type: StructureType.Select,
                        title: "Open Light Box (this option will ignore the Link)",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    lightboxObject: {
                        id: 6,
                        type: StructureType.Object,
                        title: "Light Box Data",
                        value: {
                            caption: {
                                id: 0,
                                type: StructureType.SimpleText,
                                title: "Title",
                                value: "",
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "",
                                alt: "some note about this asset",
                            },
                            video: {
                                id: 2,
                                type: StructureType.String,
                                title: "Iframe Link",
                                value: "",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                title: "Download",
                                value: "/",
                            },
                        },
                    },
                    activate_date: {
                        id: 7,
                        type: StructureType.Select,
                        title: "Countdown timer activation",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    date: {
                        id: 8,
                        type: StructureType.Datetime,
                        title: "Countdown date",
                        value: "",
                    },
                    itemCenter: {
                        id: 9,
                        type: StructureType.Number,
                        title: "The percentage that the item will be placed in the center of the slider",
                        value: "",
                    },
                },
                {
                    title: {
                        id: 0,
                        type: StructureType.String,
                        title: "Title",
                        value: "Kitchen-Suite that’s simply sweet.",
                    },
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Image",
                        src: "",
                        alt: "Image Alt",
                    },
                    video: {
                        id: 2,
                        type: StructureType.Url,
                        title: "Video",
                        value: "",
                    },
                    text: {
                        id: 3,
                        type: StructureType.String,
                        title: "Text",
                        value: "",
                    },
                    link: {
                        id: 4,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Learn More",
                        value: "",
                    },
                    lightbox: {
                        id: 5,
                        type: StructureType.Select,
                        title: "Open Light Box (this option will ignore the Link)",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    lightboxObject: {
                        id: 6,
                        type: StructureType.Object,
                        title: "Light Box Data",
                        value: {
                            caption: {
                                id: 0,
                                type: StructureType.SimpleText,
                                title: "Title",
                                value: "",
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "",
                                alt: "some note about this asset",
                            },
                            video: {
                                id: 2,
                                type: StructureType.String,
                                title: "Iframe Link",
                                value: "",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                title: "Download",
                                value: "/",
                            },
                        },
                    },
                    activate_date: {
                        id: 7,
                        type: StructureType.Select,
                        title: "Countdown timer activation",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    date: {
                        id: 8,
                        type: StructureType.Datetime,
                        title: "Countdown date",
                        value: "",
                    },
                    itemCenter: {
                        id: 9,
                        type: StructureType.Number,
                        title: "The percentage that the item will be placed in the center of the slider",
                        value: "",
                    },
                },
            ],
        });

        this.model = { ...this.model };
    }
}
</script>
