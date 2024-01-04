<template>
    <div>
        <img src="/blocks/CesCollage.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class CesCollage extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.SimpleText,
            title: "Main Title",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "List",
            value: [],
            newItem: {
                title: {
                    id: 0,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                desktopColumns: {
                    id: 1,
                    type: StructureType.Number,
                    title: "Desktop Columns",
                    value: 0,
                    max: 10,
                },
                mobileColumns: {
                    id: 2,
                    type: StructureType.Number,
                    title: "Mobile Columns",
                    value: 0,
                    max: 5,
                },
                mediaList: {
                    id: 3,
                    type: StructureType.List,
                    title: "Media List",
                    value: [],
                    newItem: {
                        caption: {
                            id: 0,
                            type: StructureType.SimpleText,
                            title: "Light Box Caption",
                            value: "",
                        },
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                            alt: "some note about this asset",
                        },
                        video: {
                            id: 2,
                            type: StructureType.String,
                            title: "Iframe Link",
                            value: "",
                        },
                        link: {
                            id: 3,
                            type: StructureType.Url,
                            title: "Download",
                            value: "/",
                        },
                        thumbnail_image: {
                            id: 4,
                            type: StructureType.Image,
                            title: "Thumbnail Image (for video)",
                            src: "",
                            alt: "some note about this asset",
                        },
                    }
                }
            }
        });

        this.model = { ...this.model };
    }


}
</script>
