<template>
    <div>
        <img src="/blocks/HomeApplianceQA.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class BlockHomeApplianceQA extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...{
                    theme: {
                        id: 0,
                        type: StructureType.Select,
                        title: "Theme",
                        value: Theme.light,
                        items: [
                            { title: "Light", value: this.Theme.light },
                            { title: "Dark", value: this.Theme.dark },
                        ],
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "Stylish, Roomy and Modern",
                    },
                    coloredTitle: {
                        id: 2,
                        type: StructureType.String,
                        title: "Colored Title",
                        value: "DISHWASHER",
                    },
                    text: {
                        id: 3,
                        type: StructureType.Text,
                        title: "Text",
                        value: "If you would like to know more about our products, simply click here to visit our support and FAQ pages.",
                    },
                    link: {
                        id: 4,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Link",
                        value: "/support/faq/",
                    },
                    image: {
                        id: 5,
                        type: StructureType.Image,
                        title: "Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/0f02c61937/HA-Group__ScaleMaxWidthWzMwNDhd.png-b0v2vg.png",
                        alt: "Some note about this image",
                    },
                    template: {
                        id: 6,
                        type: StructureType.Select,
                        title: "Template",
                        value: "V1",
                        items: [
                            { title: "V1", value: "V1" },
                            { title: "V2", value: "V2" },
                        ],
                    },
                },
                ...oldValue,
            };
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.light,
                    items: [
                        { title: "Light", value: this.Theme.light },
                        { title: "Dark", value: this.Theme.dark },
                    ],
                },
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Title",
                    value: "Stylish, Roomy and Modern",
                },
                coloredTitle: {
                    id: 2,
                    type: StructureType.String,
                    title: "Colored Title",
                    value: "DISHWASHER",
                },
                text: {
                    id: 3,
                    type: StructureType.Text,
                    title: "Text",
                    value: "If you would like to know more about our products, simply click here to visit our support and FAQ pages.",
                },
                link: {
                    id: 4,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Link",
                    value: "/support/faq/",
                },
                image: {
                    id: 5,
                    type: StructureType.Image,
                    title: "Image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/0f02c61937/HA-Group__ScaleMaxWidthWzMwNDhd.png-b0v2vg.png",
                    alt: "Some note about this image",
                },
                template: {
                    id: 6,
                    type: StructureType.Select,
                    title: "Template",
                    value: "V1",
                    items: [
                        { title: "V1", value: "V1" },
                        { title: "V2", value: "V2" },
                    ],
                },
            };
    }

    mounted() {
        this.reset(this.model);
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

<style type="text/css"></style>
