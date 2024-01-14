<template>
    <div>
        <img src="/blocks/BlogListMainBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class BlogListMainBox extends Vue {
    @VModel({ type: Object }) model!: any;

    async mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.String,
            title: "Title",
            value: "More Stories",
        });

        blockAddItem(this.model, "start-offset", {
            id: 2,
            type: StructureType.String,
            title: "Start Offset",
            value: 0,
        });

        blockAddItem(this.model, "row-count", {
            id: 3,
            type: StructureType.String,
            title: "Row Count",
            value: 0,
        });

        blockAddItem(this.model, "grid-count", {
            id: 4,
            type: StructureType.String,
            title: "Grid Count",
            value: 0,
        });

        this.model = { ...this.model };
    }
}
</script>
