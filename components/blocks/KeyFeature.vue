<template>
    <div>
        <img src="/blocks/ProductNewsBox.png" alt="" />
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
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: this.Theme.light },
                { title: "Dark", value: this.Theme.dark },
            ],
        });
        blockAddItem(this.model, "list", {
            id: 2,
            type: StructureType.List,
            title: "Items",
            maxLength: 4,
            newItem: {
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Upload Image",
                    src: "",
                    alt: "Some note about this image",
                },
                title: {
                    id: 3,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "Ultra Short Throw. Ultra Convenient.",
                },
                subtitle: {
                    id: 4,
                    type: StructureType.String,
                    title: "Small Title",
                    value: "",
                },
                text: {
                    id: 5,
                    type: StructureType.SimpleText,
                    title: "Note",
                    value: "Big screen entertainment in a convenient package. No need for ceiling mounts or in-wall cable runs, simply place the L5G on a TV stand just 11 inches from the wall and get a massive 100-inch projection – that’s 3x more screen than a 55-inch TV.",
                },
                disclaimer: {
                    id: 6,
                    type: StructureType.String,
                    title: "Disclaimer",
                    value: "Ultra Short Throw. Ultra Convenient.",
                },
            },
            value: [
                {
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Upload Image",
                        src: "",
                        alt: "Some note about this image",
                    },
                    title: {
                        id: 3,
                        type: StructureType.SimpleText,
                        title: "Title",
                        value: "Ultra Short Throw. Ultra Convenient.",
                    },
                    subtitle: {
                        id: 4,
                        type: StructureType.String,
                        title: "Small Title",
                        value: "",
                    },
                    text: {
                        id: 5,
                        type: StructureType.SimpleText,
                        title: "Note",
                        value: "Big screen entertainment in a convenient package. No need for ceiling mounts or in-wall cable runs, simply place the L5G on a TV stand just 11 inches from the wall and get a massive 100-inch projection – that’s 3x more screen than a 55-inch TV.",
                    },
                    disclaimer: {
                        id: 6,
                        type: StructureType.String,
                        title: "Disclaimer",
                        value: "Ultra Short Throw. Ultra Convenient.",
                    },
                },
            ],
        });
        this.model = { ...this.model };
    }
}
</script>
