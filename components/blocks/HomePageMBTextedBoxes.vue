<template>
    <div>
        <img src="/blocks/HomePageMBTextedBoxes.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";

@Component
export default class HomePageMBTextedBoxes extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue,
                ...{
                    backgroundColor: {
                        id: 7,
                        type: StructureType.Color,
                        title: "Background color",
                        value: "#fff",
                    },
                },
            };
        } else
            this.model = {
                link: {
                    id: 1,
                    type: StructureType.Url,
                    target: "_self",
                    title: "See More Hisense",
                    value: "/",
                },
                littleTitle: {
                    id: 2,
                    type: StructureType.String,
                    title: "Little Title",
                    value: "",
                },
                list: {
                    id: 3,
                    type: StructureType.List,
                    title: "Items",
                    value: [
                        {
                            link: {
                                id: 1,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Learn More",
                                value: "/",
                            },
                            image: {
                                id: 3,
                                alt: "some note about this asset",
                                src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355af9c41352.webp",
                                type: "image",
                                title: "Upload Image",
                            },
                            title: {
                                id: 4,
                                type: StructureType.String,
                                title: "Title",
                                value: "Win a trip to the World Cup finals.",
                            },
                            backgroundImage: {
                                id: 5,
                                alt: "some note about this asset",
                                src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355af8cdb941.webp",
                                type: StructureType.Image,
                                title: "Background Image",
                            },
                        },
                        {
                            link: {
                                id: 1,
                                type: StructureType.Url,
                                target: "_self",
                                title: "View Our Laser TVs",
                                value: "/",
                            },
                            image: {
                                id: 3,
                                alt: "some note about this asset",
                                src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355af628917b.webp",
                                type: "image",
                                title: "Upload Image",
                            },
                            title: {
                                id: 4,
                                type: StructureType.String,
                                title: "Title",
                                value: "Big. Bold. Beautiful.",
                            },
                            backgroundImage: {
                                id: 5,
                                alt: "some note about this asset",
                                src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355a61b1b5c2.webp",
                                type: StructureType.Image,
                                title: "Background Image",
                            },
                        },
                        {
                            link: {
                                id: 1,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Learn More",
                                value: "/",
                            },
                            image: {
                                id: 3,
                                alt: "some note about this asset",
                                src: null,
                                type: "image",
                                title: "Upload Image",
                            },
                            title: {
                                id: 4,
                                type: StructureType.String,
                                title: "Title",
                                value: "Big. Bold. Beautiful.",
                            },
                            backgroundImage: {
                                id: 5,
                                alt: "some note about this asset",
                                src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355b01fd4758.webp",
                                type: StructureType.Image,
                                title: "Background Image",
                            },
                        },
                        {
                            link: {
                                id: 1,
                                type: StructureType.Url,
                                target: "_self",
                                title: "View Our Soundbars",
                                value: "/",
                            },
                            image: {
                                id: 3,
                                alt: "some note about this asset",
                                src: "",
                                type: "image",
                                title: "Upload Image",
                            },
                            title: {
                                id: 4,
                                type: StructureType.String,
                                title: "Title",
                                value: "Big. Bold. Beautiful.",
                            },
                            backgroundImage: {
                                id: 5,
                                alt: "some note about this asset",
                                src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355affe35215.webp",
                                type: StructureType.Image,
                                title: "Background Image",
                            },
                        },
                    ],
                    newItem: {
                        link: {
                            id: 1,
                            type: StructureType.Url,
                            target: "_self",
                            title: "Learn More",
                            value: "/",
                        },
                        image: {
                            id: 3,
                            alt: "some note about this asset",
                            src: null,
                            type: "image",
                            title: "Upload Image",
                        },
                        title: {
                            id: 4,
                            type: StructureType.String,
                            title: "Title",
                            value: "Big. Bold. Beautiful.",
                        },
                        backgroundImage: {
                            id: 5,
                            alt: "some note about this asset",
                            src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355b01fd4758.webp",
                            type: StructureType.Image,
                            title: "Background Image",
                        },
                    },
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch("isEmpty")
    onValueChanged() {
        if (this.isEmpty) this.reset();
    }
}
</script>

<style scoped>
.main-title {
    font-family: "hisense", serif;
    font-style: normal;
    font-weight: 500;
    font-size: 42px;
    line-height: 48px;

    text-align: center;
    color: #000000;
    margin-top: 70px;
    margin-bottom: 72px;
}
</style>
