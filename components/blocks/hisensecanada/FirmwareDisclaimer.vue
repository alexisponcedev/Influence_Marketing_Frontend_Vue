<template>
    <div>
        <img src="/blocks/FirmwareDisclaimer.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class FirmwareDisclaimer extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "text", {
            id: 5,
            type: StructureType.SimpleText,
            title: "Modal text",
            value: "",
        });

        blockAddItem(this.model, "button", {
            id: 6,
            type: StructureType.String,
            title: "Modal button title",
            value: "",
        });

        blockAddItem(this.model, "link", {
            id: 7,
            type: StructureType.Url,
            title: "Link",
            value: "/",
        });

        this.model = { ...this.model };
    }
}
</script>
