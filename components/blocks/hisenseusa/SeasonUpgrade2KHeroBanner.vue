<template>
    <div>
        <img src="/blocks/SeasonUpgrade2KHeroBanner.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class SeasonUpgrade2KHeroBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "backgroundColor", {
            id: 0,
            type: StructureType.Color,
            title: "Background Color",
            value: "",
        });
        blockAddItem(this.model, "background", {
            id: 1,
            type: StructureType.Image,
            title: "Background Image",
            src: "",
            alt: "",
        });
        blockAddItem(this.model, "image", {
            id: 2,
            type: StructureType.Image,
            title: "Top Image",
            src: "",
            alt: "",
        });
        blockAddItem(this.model, "subtitle", {
            id: 3,
            type: StructureType.String,
            title: "Subtitle",
            value: "",
        });
        blockAddItem(this.model, "title", {
            id: 4,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 5,
            type: StructureType.List,
            title: "List of Images",
            value: [],
            newItem: {
                image: {
                    id: 0,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "",
                },
            },
        });

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
