<template>
    <div>
        <img src="/blocks/SeasonUpgradeProductsCarousel.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class SeasonUpgradeProductsCarousel extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "subtitle", {
            id: 0,
            type: StructureType.String,
            title: "Subtitle",
            value: "",
        });
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "text", {
            id: 2,
            type: StructureType.Select,
            title: "Theme",
            value: "light",
            items: [
                { title: "Light", value: "light" },
                { title: "Gradient", value: "gradient" },
            ],
        });
        blockAddItem(this.model, "direction", {
            id: 3,
            type: StructureType.Select,
            title: "Carousel Start Direction",
            value: "left",
            items: [
                { title: "Left", value: "left" },
                { title: "Right", value: "right" },
            ],
        });

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
