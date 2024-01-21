<template>
    <div>
        <img src="/blocks/hcan/Footer.jpg" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class Footer extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "social-title", {
            id: 1,
            type: StructureType.String,
            title: "Social Media Title",
            value: "Follow Us",
        });

        this.model = { ...this.model };
    }
}
</script>
