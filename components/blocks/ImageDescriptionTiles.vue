<template>
    <div>
        <img src="/blocks/ImageDescriptionTiles.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class BlockProductNewsBox extends Vue {
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    created() {
        blockAddItem(this.model, "theme", {
            id: 1,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: this.Theme.light },
                { title: "Dark", value: this.Theme.dark },
            ],
        });

        blockAddItem(this.model, "divider", {
            id: 2,
            type: StructureType.Select,
            title: "Line Divider",
            value: true,
            items: [
                { title: "Show", value: true },
                { title: "Don't Show", value: false },
            ],
        });

        blockAddItem(this.model, "shadow", {
            id: 3,
            type: StructureType.Select,
            title: "Image shadow on hover",
            value: true,
            items: [
                { title: "With shadow", value: true },
                { title: "Without shadow", value: false },
            ],
        });

        blockAddItem(this.model, "list", {
            id: 4,
            type: StructureType.List,
            title: "Items",
            maxLength: 4,
            newItem: {
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Upload Image",
                    src: "",
                },
                smallImage: {
                    id: 2,
                    type: StructureType.Object,
                    title: "Small Image",
                    value: {
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                        },
                        text: {
                            id: 2,
                            type: StructureType.String,
                            title: "Text",
                            value: "",
                        },
                    },
                },
                title: {
                    id: 3,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                subtitle: {
                    id: 4,
                    type: StructureType.SimpleText,
                    title: "Sub Title",
                    value: "",
                },
                text: {
                    id: 5,
                    type: StructureType.SimpleText,
                    title: "Description",
                    value: "",
                },
                note: {
                    id: 6,
                    type: StructureType.SimpleText,
                    title: "Note",
                    value: "",
                },
            },
            value: [
                {
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Upload Image",
                        src: "",
                    },
                    smallImage: {
                        id: 2,
                        type: StructureType.Object,
                        title: "Small Image",
                        value: {
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "",
                            },
                            text: {
                                id: 2,
                                type: StructureType.String,
                                title: "Text",
                                value: "",
                            },
                        },
                    },
                    title: {
                        id: 3,
                        type: StructureType.SimpleText,
                        title: "Title",
                        value: "",
                    },
                    subtitle: {
                        id: 4,
                        type: StructureType.SimpleText,
                        title: "Sub Title",
                        value: "",
                    },
                    text: {
                        id: 5,
                        type: StructureType.SimpleText,
                        title: "Description",
                        value: "",
                    },
                    note: {
                        id: 6,
                        type: StructureType.SimpleText,
                        title: "Note",
                        value: "",
                    },
                },
            ],
        });

        this.model = { ...this.model };
    }
}
</script>
