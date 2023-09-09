<template>
    <div>
        <img src="/blocks/ProductTextWithIcon.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { TextAlignEnum } from "@/interfaces/TextAlignEnum";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class BlockProductTextWithIcon extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "theme", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: Theme.light },
                { title: "Dark", value: Theme.dark },
            ],
        });

        blockAddItem(this.model, "textAlignment", {
            id: 1,
            type: StructureType.Select,
            title: "Text Alignment",
            value: TextAlignEnum.ltr,
            items: [
                { title: "Left to Right", value: TextAlignEnum.ltr },
                { title: "Center", value: TextAlignEnum.center },
            ],
        });

        blockAddItem(this.model, "list", {
            id: 2,
            type: StructureType.List,
            title: "features with icon items",
            newItem: {
                image: {
                    id: 0,
                    type: StructureType.Image,
                    title: "image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/3494e63c06/Film_Maker_Mode__ScaleMaxWidthWzMwNDhd.png-tzyefj.png",
                    alt: "featured image",
                },
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "title",
                    value: "Filmmaker Mode",
                },
                description: {
                    id: 2,
                    type: StructureType.String,
                    title: "feature description",
                    value: "By disabling all post-processing (e.g. motion smoothing) and preserving the correct aspect ratios, colors and frame rates, Filmmaker Mode enables your TV to display the movie or television show’s content precisely as it was intended by the filmmaker.",
                },
            },
            value: [
                {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: "image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/3494e63c06/Film_Maker_Mode__ScaleMaxWidthWzMwNDhd.png-tzyefj.png",
                        alt: "featured image",
                    },
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "title",
                        value: "Filmmaker Mode",
                    },
                    description: {
                        id: 2,
                        type: StructureType.String,
                        title: "feature description",
                        value: "By disabling all post-processing (e.g. motion smoothing) and preserving the correct aspect ratios, colors and frame rates, Filmmaker Mode enables your TV to display the movie or television show’s content precisely as it was intended by the filmmaker.",
                    },
                },
            ],
        });
    }
}
</script>
