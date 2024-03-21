<template>
    <div>
        <img src="/blocks/ProductSupportNewHead.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class ProductSupportNewHead extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "firmware-title", {
            id: 1,
            type: StructureType.String,
            title: "Firmware title",
            value: "",
        });

        blockAddItem(this.model, "firmware-warning", {
            id: 2,
            type: StructureType.String,
            title: "Firmware warning text",
            value: "",
        });

        blockAddItem(this.model, "document-title", {
            id: 3,
            type: StructureType.String,
            title: "Document title",
            value: "",
        });

        this.model = { ...this.model };
    }
}
</script>

<style type="text/css">
.small-title {
    font-size: 15px;
    font-weight: 700;
}

.large-title {
    font-size: 42px;
    font-weight: 700;
}

.paragraph {
    font-size: 18px;
    font-weight: 400;
}
</style>
