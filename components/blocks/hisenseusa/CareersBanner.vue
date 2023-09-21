<template>
    <div>
        <img src="/blocks/CareersBanner.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class CareersBanner extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "background", {
            id: 0,
            type: StructureType.Image,
            title: "Background",
            src: "",
            alt: "",
        });

        blockAddItem(this.model, "logo", {
            id: 0,
            type: StructureType.Image,
            title: "Logo",
            src: "",
            alt: "",
        });

        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        this.model = { ...this.model };
    }
}
</script>
