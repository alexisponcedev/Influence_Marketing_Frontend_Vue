<template>
    <div>
        <img src="/blocks/CareersTextBlock.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class CareersTextBlock extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "link", {
            id: 2,
            type: StructureType.Url,
            title: "Link",
            value: "",
        });

        this.model = { ...this.model };
    }
}
</script>
