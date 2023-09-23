<template>
    <div>
        <img src="/blocks/AboutUsMembersList.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class AboutUsMembersList extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "List",
            newItem: {
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "",
                },
                title: {
                    id: 2,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                role: {
                    id: 3,
                    type: StructureType.SimpleText,
                    title: "Role",
                    value: "",
                },
            },
            value: [],
        });

        this.model = { ...this.model };
    }
}
</script>
