<template>
    <div>
        <img src="/blocks/MoreTvBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlockMoreTvBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    mounted() {
        blockAddItem(this.model, "theme", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: this.Theme.light },
                { title: "Dark", value: this.Theme.dark },
            ],
        });
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.String,
            title: "Top Title",
            value: "All the tech.<br />None of the tech B.S.",
        });
        blockAddItem(this.model, "description", {
            id: 2,
            type: StructureType.String,
            title: "description",
            value: "A great TV is just a great TV. Not an ‘immersive harmony of sound and vision’. Cut through the usual tech B.S with our jargon / jargoff filter.",
        });
        blockAddItem(this.model, "list", {
            id: 3,
            type: StructureType.List,
            title: "Items",
            newItem: {
                image: {
                    id: 0,
                    type: StructureType.Image,
                    title: "Upload Image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                    alt: "MoreTv Box item",
                },
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Title",
                    value: "U8G",
                },
                model: {
                    id: 2,
                    type: StructureType.String,
                    title: "Model",
                    value: "FireTv",
                },
                description: {
                    id: 3,
                    type: StructureType.String,
                    title: "Description",
                    value: "Discover a New Expanse of Color",
                },
                link: {
                    id: 4,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Learn More Link",
                    value: "/",
                },
                comingSoon: {
                    id: 5,
                    type: StructureType.Select,
                    title: "Coming Soon",
                    value: true,
                    items: [
                        { title: "True", value: true },
                        { title: "False", value: false },
                    ],
                },
            },
            value: [
                {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: "Upload Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                        alt: "MoreTv Box item",
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "U8G",
                    },
                    model: {
                        id: 2,
                        type: StructureType.String,
                        title: "Model",
                        value: "FireTv",
                    },
                    description: {
                        id: 3,
                        type: StructureType.String,
                        title: "Description",
                        value: "Discover a New Expanse of Color",
                    },
                    link: {
                        id: 4,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Learn More Link",
                        value: "/",
                    },
                    comingSoon: {
                        id: 5,
                        type: StructureType.Select,
                        title: "Coming Soon",
                        value: true,
                        items: [
                            { title: "True", value: true },
                            { title: "False", value: false },
                        ],
                    },
                },
                {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: "Upload Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                        alt: "MoreTv Box item",
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "U8G",
                    },
                    model: {
                        id: 2,
                        type: StructureType.String,
                        title: "Model",
                        value: "FireTv",
                    },
                    description: {
                        id: 3,
                        type: StructureType.String,
                        title: "Description",
                        value: "Discover a New Expanse of Color",
                    },
                    link: {
                        id: 4,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Learn More Link",
                        value: "/",
                    },
                    comingSoon: {
                        id: 5,
                        type: StructureType.Select,
                        title: "Coming Soon",
                        value: true,
                        items: [
                            { title: "True", value: true },
                            { title: "False", value: false },
                        ],
                    },
                },
                {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: "Upload Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                        alt: "MoreTv Box item",
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "U8G",
                    },
                    model: {
                        id: 2,
                        type: StructureType.String,
                        title: "Model",
                        value: "FireTv",
                    },
                    description: {
                        id: 3,
                        type: StructureType.String,
                        title: "Description",
                        value: "Discover a New Expanse of Color",
                    },
                    link: {
                        id: 4,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Learn More Link",
                        value: "/",
                    },
                    comingSoon: {
                        id: 5,
                        type: StructureType.Select,
                        title: "Coming Soon",
                        value: true,
                        items: [
                            { title: "True", value: true },
                            { title: "False", value: false },
                        ],
                    },
                },
                {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: "Upload Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                        alt: "MoreTv Box item",
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "U8G",
                    },
                    model: {
                        id: 2,
                        type: StructureType.String,
                        title: "Model",
                        value: "FireTv",
                    },
                    description: {
                        id: 3,
                        type: StructureType.String,
                        title: "Description",
                        value: "Discover a New Expanse of Color",
                    },
                    link: {
                        id: 4,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Learn More Link",
                        value: "/",
                    },
                    comingSoon: {
                        id: 5,
                        type: StructureType.Select,
                        title: "Coming Soon",
                        value: true,
                        items: [
                            { title: "True", value: true },
                            { title: "False", value: false },
                        ],
                    },
                },
                {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: "Upload Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                        alt: "MoreTv Box item",
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "U8G",
                    },
                    model: {
                        id: 2,
                        type: StructureType.String,
                        title: "Model",
                        value: "FireTv",
                    },
                    description: {
                        id: 3,
                        type: StructureType.String,
                        title: "Description",
                        value: "Discover a New Expanse of Color",
                    },
                    link: {
                        id: 4,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Learn More Link",
                        value: "/",
                    },
                    comingSoon: {
                        id: 5,
                        type: StructureType.Select,
                        title: "Coming Soon",
                        value: true,
                        items: [
                            { title: "True", value: true },
                            { title: "False", value: false },
                        ],
                    },
                },
                {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: "Upload Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                        alt: "MoreTv Box item",
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "U8G",
                    },
                    model: {
                        id: 2,
                        type: StructureType.String,
                        title: "Model",
                        value: "FireTv",
                    },
                    description: {
                        id: 3,
                        type: StructureType.String,
                        title: "Description",
                        value: "Discover a New Expanse of Color",
                    },
                    link: {
                        id: 4,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Learn More Link",
                        value: "/",
                    },
                    comingSoon: {
                        id: 5,
                        type: StructureType.Select,
                        title: "Coming Soon",
                        value: true,
                        items: [
                            { title: "True", value: true },
                            { title: "False", value: false },
                        ],
                    },
                },
            ],
        });
        blockAddItem(this.model, "link", {
            id: 4,
            type: StructureType.Url,
            target: "_self",
            title: "Shop All Tvs",
            value: "/products",
        });

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
