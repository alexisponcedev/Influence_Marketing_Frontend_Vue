<template>
    <div>
        <img src="/blocks/BlogDescriptionBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlogDescriptionBox extends Vue {
    @VModel({ type: Object }) model!: any

    mounted() {

        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.String,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "text", {
            id: 2,
            type: StructureType.Text,
            title: "Text",
            value: "",
        });

        this.model = { ...this.model };
    }


}
</script>
