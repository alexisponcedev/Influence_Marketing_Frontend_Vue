<template>
    <div>
        <img src="/blocks/CareersCycleSection.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class CareersCycleSection extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title1", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title 1",
            value: "",
        });

        blockAddItem(this.model, "title2", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Title 2",
            value: "",
        });

        blockAddItem(this.model, "text", {
            id: 3,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });

        blockAddItem(this.model, "list", {
            id: 4,
            type: StructureType.List,
            title: "List",
            newItem: {
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "Image",
                },
                icon: {
                    id: 2,
                    type: StructureType.Image,
                    title: "Icon",
                    src: "",
                    alt: "Icon",
                },
                title: {
                    id: 3,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                text: {
                    id: 4,
                    type: StructureType.SimpleText,
                    title: "Text",
                    value: "",
                },
            },
            value: [],
        });

        this.model = { ...this.model };
    }
}
</script>
