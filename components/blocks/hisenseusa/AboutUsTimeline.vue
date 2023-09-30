<template>
    <div>
        <img src="/blocks/AboutUsTimeline.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class AboutUsTimeline extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "text", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 3,
            type: StructureType.List,
            title: "List",
            newItem: {
                title: {
                    id: 1,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                list: {
                    id: 2,
                    type: StructureType.List,
                    title: "List",
                    newItem: {
                        description: {
                            id: 1,
                            type: StructureType.SimpleText,
                            title: "Description",
                            value: "",
                        },
                        image: {
                            id: 2,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                            alt: "",
                        },
                    },
                    value: [],
                },
            },
            value: [],
        });

        this.model = { ...this.model };
    }
}
</script>
