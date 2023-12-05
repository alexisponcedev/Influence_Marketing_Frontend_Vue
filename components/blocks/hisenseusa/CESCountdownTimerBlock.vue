<template>
    <div>
        <img src="/blocks/CESCountdownTimerBlock.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class CESCountdownTimerBlock extends Vue {
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "background", {
            id: 1,
            type: StructureType.Image,
            title: "Background",
            src: "",
            alt: ""
        });


        blockAddItem(this.model, "left_image", {
            id: 2,
            type: StructureType.Image,
            title: "Left Image",
            src: "",
            alt: ""
        });


        blockAddItem(this.model, "right_image", {
            id: 3,
            type: StructureType.Image,
            title: "Right Image",
            src: "",
            alt: ""
        });

        blockAddItem(this.model, "subtitle", {
            id: 4,
            type: StructureType.SimpleText,
            title: "Subtitle",
            value: "",
        });

        blockAddItem(this.model, "title", {
            id: 5,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "date", {
            id: 6,
            type: StructureType.Datetime,
            title: "End Time",
            value: "",
        });

        blockAddItem(this.model, "upper_text", {
            id: 7,
            type: StructureType.SimpleText,
            title: "Upper Text Block",
            value: "",
        });
        blockAddItem(this.model, "lower_text", {
            id: 8,
            type: StructureType.SimpleText,
            title: "Lower Text Block",
            value: "",
        });
        this.model = { ...this.model };
    }
}
</script>
