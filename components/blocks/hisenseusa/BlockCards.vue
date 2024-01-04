<template>
    <div>
        <img src="/blocks/BlockCards.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class BlockCards extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.Text,
            title: "Title",
            value: "With a lot more to love.",
        });

        blockAddItem(this.model, "list", {
            id: 2,
            type: StructureType.List,
            title: "Items",
            newItem: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "Title",
                    value: "Win a trip to the World Cup finals.",
                },
                backgroundImage: {
                    id: 1,
                    alt: "some note about this asset",
                    src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355af8cdb941.webp",
                    type: StructureType.Image,
                    title: "Background Image",
                },
                topImage: {
                    id: 2,
                    type: StructureType.Image,
                    title: "Top Image",
                    alt: "some note about this asset",
                    src: "",
                },
                bottomImage: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Bottom Image",
                    src: "",
                    alt: "some note about this asset",
                },
                fullWidth: {
                    id: 4,
                    type: StructureType.Select,
                    title: "Full Width",
                    value: false,
                    items: [
                        { title: "True", value: true },
                        { title: "False", value: false },
                    ],
                },
                link: {
                    id: 5,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Learn More",
                    value: "/",
                },
                gradient: {
                    id: 6,
                    type: StructureType.Select,
                    title: "Gradient Fade",
                    value: true,
                    items: [
                        { title: "Active", value: true },
                        { title: "Deactive", value: false },
                    ],
                },
                lightbox: {
                    id: 7,
                    type: StructureType.Select,
                    title: "Open Light Box (this option will ignore the Link)",
                    value: true,
                    items: [
                        { title: "Active", value: true },
                        { title: "Deactive", value: false },
                    ],
                },
                lightboxObject: {
                    id: 8,
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
                    }
                }
            },
            value: [
                {
                    title: {
                        id: 0,
                        type: StructureType.String,
                        title: "Title",
                        value: "Win a trip to the World Cup finals.",
                    },
                    backgroundImage: {
                        id: 1,
                        alt: "some note about this asset",
                        src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355af8cdb941.webp",
                        type: StructureType.Image,
                        title: "Background Image",
                    },
                    topImage: {
                        id: 2,
                        type: StructureType.Image,
                        title: "Top Image",
                        alt: "some note about this asset",
                        src: "",
                    },
                    bottomImage: {
                        id: 3,
                        type: StructureType.Image,
                        title: "Bottom Image",
                        src: "",
                        alt: "some note about this asset",
                    },
                    fullWidth: {
                        id: 4,
                        type: StructureType.Select,
                        title: "Full Width",
                        value: false,
                        items: [
                            { title: "True", value: true },
                            { title: "False", value: false },
                        ],
                    },
                    link: {
                        id: 5,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Learn More",
                        value: "/",
                    },
                    gradient: {
                        id: 6,
                        type: StructureType.Select,
                        title: "Gradient Fade",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    lightbox: {
                        id: 7,
                        type: StructureType.Select,
                        title: "Open Light Box (this option will ignore the Link)",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    lightboxObject: {
                        id: 8,
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
                        }
                    }
                },
            ],
        });

        blockAddItem(this.model, "link", {
            id: 3,
            type: StructureType.Url,
            target: "_self",
            title: "See More News",
            value: "/",
        });

        this.model = { ...this.model };
    }
}
</script>
