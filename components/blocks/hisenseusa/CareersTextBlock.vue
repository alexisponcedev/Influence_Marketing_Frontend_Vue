<template>
    <div>
        <img src="/blocks/CareersTextBlock.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class CareersTextBlock extends Vue {
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @Prop(Number) readonly id: number | undefined;
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
    }
}
</script>
