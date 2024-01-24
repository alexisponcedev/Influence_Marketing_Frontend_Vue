<template>
    <div>
        <img src="/blocks/AwardsAndAccolades.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class AwardsAndAccolades extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "Items",
            newItem: {
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Upload Image",
                    src: "",
                },
                title: {
                    id: 2,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                subtitle: {
                    id: 3,
                    type: StructureType.SimpleText,
                    title: "Sub Title",
                    value: "",
                },
                link: {
                    id: 4,
                    type: StructureType.Url,
                    title: "link",
                    value: "",
                },
                lightBox: {
                    id: 5,
                    type: StructureType.Select,
                    title: "Open Light Box (this option will ignore the Link value but use the link title as inner content)",
                    value: true,
                    items: [
                        { title: "Active", value: true },
                        { title: "Deactive", value: false },
                    ],
                },
                lightBoxObject: {
                    id: 6,
                    type: StructureType.Object,
                    title: "Light Box Data",
                    value: {
                        caption: {
                            id: 1,
                            type: StructureType.SimpleText,
                            title: "Title",
                            value: "",
                        },
                        image: {
                            id: 2,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                            alt: "some note about this asset",
                        },
                        video: {
                            id: 3,
                            type: StructureType.String,
                            title: "Iframe Link",
                            value: "",
                        },
                        link: {
                            id: 4,
                            type: StructureType.Url,
                            title: "Download",
                            value: "/",
                        },
                    },
                },
            },
            value: [],
        });

        this.model = { ...this.model };
    }
}
</script>
