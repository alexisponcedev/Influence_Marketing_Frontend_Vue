<template>
    <div>
        <img src="/blocks/CareersBlockCategories.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class CareersBlockCategories extends Vue {
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
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "Image",
                },
            },
            value: [
                {
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Image",
                        src: "",
                        alt: "Image",
                    },
                },
            ],
        });
    }
}
</script>
