<template>
    <div>
        <img src="/blocks/ProductBigContent.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class BlockProductBigContent extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "theme", {
            id: 1,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: this.Theme.light },
                { title: "Dark", value: this.Theme.dark },
            ],
        });

        blockAddItem(this.model, "flex", {
            id: 2,
            type: StructureType.Select,
            title: "Title Flex",
            value: "row",
            items: [
                { title: "Row", value: "row" },
                { title: "Column", value: "column" },
            ],
        });

        blockAddItem(this.model, "order", {
            id: 3,
            type: StructureType.Select,
            title: "Title Order",
            value: "",
            items: [
                { title: "Normal", value: "" },
                { title: "Reverse", value: "reverse" },
            ],
        });

        blockAddItem(this.model, "blackTitle", {
            id: 4,
            type: StructureType.String,
            title: "Black Title",
            value: "Big Screen",
        });

        blockAddItem(this.model, "coloredTitle", {
            id: 5,
            type: StructureType.String,
            title: "Colored Title",
            value: "big entertainment",
        });

        blockAddItem(this.model, "smallTitle", {
            id: 6,
            type: StructureType.String,
            title: "Small Title",
            value: "L5G SERIES - 4K SMART LASER TV",
        });

        blockAddItem(this.model, "paragraph", {
            id: 7,
            type: StructureType.Text,
            title: "Paragraph Text",
            value: "Get movie theater immersion with the convenience of TV. The L5G’s ultra-short throw projection technology allows you to place the projector just inches from the screen and gives you a beautifully bright, 4K image that’s 3x bigger than a 55-inch TV. With built-in features like Dolby Atmos® sound, smart Android TV, Game Mode, Filmmaker Mode, and a 25,000 hour laser life, the L5G is an all-in-one, big screen upgrade you can enjoy for years to come.",
        });

        blockAddItem(this.model, "backgroundColor", {
            id: 8,
            type: StructureType.Color,
            title: "Background color",
            value: "#fff",
        });

        blockAddItem(this.model, "note", {
            id: 9,
            type: StructureType.String,
            title: "Small Bottom text",
            value: "",
        });

        this.model = { ...this.model };
    }
}
</script>
