<template>
    <div>
        <img src="/blocks/SeasonUpgradeHeroBanner.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

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

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
