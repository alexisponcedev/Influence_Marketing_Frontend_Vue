<template>
    <div>
        <img src="/blocks/CareersVideoBlock.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class CareersVideoBlock extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "videoType", {
            id: 1,
            type: StructureType.Select,
            title: "Video Type",
            value: "iframe",
            items: [
                { title: "Direct Link", value: "link" },
                { title: "Ifram Link", value: "iframe" },
            ],
        });

        blockAddItem(this.model, "video", {
            id: 2,
            type: StructureType.String,
            title: "Video",
            value: "",
        });

        this.model = { ...this.model };
    }
}
</script>
