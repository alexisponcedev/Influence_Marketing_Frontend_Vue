<template>
    <div>
        <img src="/blocks/SeasonUpgradeHeroBanner.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class SeasonUpgradeHeroBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "backgound", {
            id: 0,
            type: StructureType.Image,
            title: "Background",
            src: "",
            alt: "",
        });

        blockAddItem(this.model, "image", {
            id: 1,
            type: StructureType.Image,
            title: "Image",
            src: "",
            alt: "",
        });

        blockAddItem(this.model, "link", {
            id: 2,
            type: StructureType.Url,
            title: "Link",
            value: "",
        });

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
