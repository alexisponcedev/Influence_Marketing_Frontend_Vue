<template>
    <div>
        <img src="/blocks/ProductStaticContent.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class BlockProductStaticContent extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "theme", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: Theme.light },
                { title: "Dark", value: Theme.dark },
            ],
        });

        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.String,
            title: "Title",
            value: "EXTRA STORAGE TO MAKE LIFE EASIER.",
        });

        blockAddItem(this.model, "paragraph", {
            id: 2,
            type: StructureType.Text,
            title: "Paragraph",
            value: "The 2022 U7 delivers premium upgrades that offer exceptional performance for gamers and non-gamers alike including: IMAX enhanced, Filmmaker Mode, Dolby Vision IQ, HDR10, HDR10+, HDR 10+ Adaptive, Quantum Dot Color, FreeSync, and NEXTGEN TV ATSC 3.0. Premium audio upgrades including Dolby Atmos, eARC, and WiSA deliver immersive audio, while the 120Hz refresh rate brings incredible fluidity and clarity to fast-action content. The 2021 U7 exceeded expectations and the 2022 U7 is poised to take it to a whole new level.",
        });

        blockAddItem(this.model, "image", {
            id: 3,
            type: StructureType.Image,
            title: "Image",
            src: "",
            alt: "",
        });
    }
}
</script>
