<template>
    <div>
        <img src="/blocks/ULEDHead.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlockULEDHead extends Vue {
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
        blockAddItem(this.model, "image", {
            id: 1,
            type: StructureType.Image,
            title: "Upload header",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/9ae312d30e/cat-uled-tvs-header-img__ScaleMaxWidthWzMwNDhd.jpg-er4sxv.jpg",
            alt: "uled header",
        });
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "Let’s get real. These are the TVs your old TV should be worried about.",
        });
        blockAddItem(this.model, "link", {
            id: 2,
            type: StructureType.Url,
            target: "_self",
            title: "See the range",
            value: "/",
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
