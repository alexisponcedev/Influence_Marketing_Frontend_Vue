<template>
    <div>
        <img src="/blocks/UHDIntro.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class BlockUHDIntro extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

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
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Upload Image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/33be11cdf7/4KUHD__ScaleMaxWidthWzMwNDhd.png-yrrphd.png",
                    alt: "Some note about this image",
                },
                largeTitle: {
                    id: 2,
                    type: StructureType.String,
                    title: "Large Title",
                    value: "Regular HD’s bigger, better looking brother",
                },
                paragraph: {
                    id: 3,
                    type: StructureType.Text,
                    title: "Paragraph Text",
                    value: "More color. More contrast. More whoa that’s realistic. Our 4K UHD TVs have four times the resolution of regular 1080p high-definition TVs. So movies, sports, and even movies about sports, all look four times better.",
                },
                link: {
                    id: 4,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Shop Soundbars Now",
                    value: "/products",
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

<style type="text/css"></style>
