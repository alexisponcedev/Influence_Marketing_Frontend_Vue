<template>
    <div>
        <img src="/blocks/SmartInfoTvsBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlockSmartInfoTvsBox extends Vue {
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
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "Items",
            newItem: {
                color: {
                    id: 0,
                    type: StructureType.Color,
                    title: "Background Color",
                    value: "#fff",
                },
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Title",
                    value: "Android TV",
                },
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                    alt: "Some note about this image",
                },
                description: {
                    id: 2,
                    type: StructureType.String,
                    title: "Description",
                    value: "Thousands of streaming channels at your fingertips",
                },
                link: {
                    id: 3,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Discover",
                    value: "",
                },
            },
            value: [
                {
                    color: {
                        id: 0,
                        type: StructureType.Color,
                        title: "Background Color",
                        value: "#fff",
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "Android TV",
                    },
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                        alt: "Some note about this image",
                    },
                    description: {
                        id: 2,
                        type: StructureType.String,
                        title: "Description",
                        value: "Thousands of streaming channels at your fingertips",
                    },
                    link: {
                        id: 3,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Discover",
                        value: "",
                    },
                },
                {
                    color: {
                        id: 0,
                        type: StructureType.Color,
                        title: "Background Color",
                        value: "#fff",
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "Android TV",
                    },
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                        alt: "Some note about this image",
                    },
                    description: {
                        id: 2,
                        type: StructureType.String,
                        title: "Description",
                        value: "Thousands of streaming channels at your fingertips",
                    },
                    link: {
                        id: 3,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Discover",
                        value: "",
                    },
                },
                {
                    color: {
                        id: 0,
                        type: StructureType.Color,
                        title: "Background Color",
                        value: "#fff",
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "Android TV",
                    },
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                        alt: "Some note about this image",
                    },
                    description: {
                        id: 2,
                        type: StructureType.String,
                        title: "Description",
                        value: "Thousands of streaming channels at your fingertips",
                    },
                    link: {
                        id: 3,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Discover",
                        value: "",
                    },
                },
                {
                    color: {
                        id: 0,
                        type: StructureType.Color,
                        title: "Background Color",
                        value: "#fff",
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "Android TV",
                    },
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                        alt: "Some note about this image",
                    },
                    description: {
                        id: 2,
                        type: StructureType.String,
                        title: "Description",
                        value: "Thousands of streaming channels at your fingertips",
                    },
                    link: {
                        id: 3,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Discover",
                        value: "",
                    },
                },
            ],
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
