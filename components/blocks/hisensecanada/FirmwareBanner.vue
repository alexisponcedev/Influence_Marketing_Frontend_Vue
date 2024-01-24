<template>
    <div>
        <img src="/blocks/FirmwareBanner.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class FirmwareBanner extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "image", {
            id: 1,
            type: StructureType.Image,
            title: "Image",
            src: "",
            alt: "",
        });

        blockAddItem(this.model, "title", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "search-btn-title", {
            id: 3,
            type: StructureType.String,
            title: "Search button title",
            value: "Search",
        });

        blockAddItem(this.model, "search-placeholder", {
            id: 4,
            type: StructureType.String,
            title: "Search placeholder",
            value: "Enter your 15 digit serial number",
        });

        blockAddItem(this.model, "where-to-find-btn-title", {
            id: 5,
            type: StructureType.String,
            title: "'Where to Find' button title",
            value: "Where to find serial number?",
        });

        blockAddItem(this.model, "text", {
            id: 6,
            type: StructureType.SimpleText,
            title: "'Where to Find' modal text",
            value: "",
        });

        this.model = { ...this.model };
    }
}
</script>
