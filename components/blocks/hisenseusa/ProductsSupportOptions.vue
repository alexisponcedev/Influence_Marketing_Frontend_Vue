<template>
    <div>
        <!--    <img src="/blocks/ProductsSupportOptions.png" alt=""/>-->
        <img src="/blocks/ProductsSupportOptions-old.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";

@Component
export default class ProductsSupportOptions extends Vue {
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
                list: {
                    id: 1,
                    type: StructureType.List,
                    title: "Items",
                    newItem: {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Upload Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                            alt: "Some note about this image",
                        },
                        title: {
                            id: 1,
                            type: StructureType.String,
                            title: "Title",
                            value: "Televisions",
                        },
                        paragraph: {
                            id: 1,
                            type: StructureType.Text,
                            title: "Paragraph",
                            value: "Televisions",
                        },
                        link: {
                            id: 2,
                            type: StructureType.Url,
                            target: "_self",
                            title: "Shop Now URL",
                            value: "/products",
                        },
                    },
                    value: [
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Upload Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: "Register Product",
                            },
                            paragraph: {
                                id: 2,
                                type: StructureType.Text,
                                title: "Paragraph",
                                value: "Register your product to activate your warranty and ensure you receive the latest information about your product.",
                            },
                            linkTitle: {
                                id: 3,
                                type: StructureType.String,
                                title: "Link Title",
                                value: "Register Now",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Link Url",
                                value: "/",
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Upload Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: "Replacement Parts",
                            },
                            paragraph: {
                                id: 2,
                                type: StructureType.Text,
                                title: "Paragraph",
                                value: "Find replacement parts for your Hisense product(s).",
                            },
                            linkTitle: {
                                id: 3,
                                type: StructureType.String,
                                title: "Link Title",
                                value: "Search Parts",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Link Url",
                                value: "/",
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Upload Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: "FAQ",
                            },
                            paragraph: {
                                id: 2,
                                type: StructureType.Text,
                                title: "Paragraph",
                                value: "Find answers to frequently asked questions.",
                            },
                            linkTitle: {
                                id: 3,
                                type: StructureType.String,
                                title: "Link Title",
                                value: "Learn More",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Link Url",
                                value: "/",
                            },
                        },
                    ],
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
