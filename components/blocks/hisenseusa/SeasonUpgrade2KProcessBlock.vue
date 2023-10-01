<template>
    <div>
        <img src="/blocks/SeasonUpgrade2KProcessBlock.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class SeasonUpgrade2KProcessBlock extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "background", {
            id: 0,
            type: StructureType.Image,
            title: "Background Image",
            src: "",
            alt: "",
        });
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "text", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 3,
            type: StructureType.List,
            title: "List of Images",
            value: [],
            newItem: {
                title: {
                    id: 0,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                bubbleLink: {
                    id: 1,
                    type: StructureType.Url,
                    title: "Link",
                    value: "",
                },
                text: {
                    id: 2,
                    type: StructureType.SimpleText,
                    title: "Text",
                    value: "",
                },
                link: {
                    id: 3,
                    type: StructureType.Url,
                    title: "Link",
                    value: "",
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
