<template>
    <div>
        <img src="/blocks/ProductFeaturesCards.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class ProductFeaturesCards extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({ default: true }) readonly editable: boolean | undefined
    @VModel({ type: Object }) model!: any

    mounted() {
        blockAddItem(this.model, 'title', { id: 0, type: StructureType.SimpleText, title: 'Title', value: '' });
        blockAddItem(this.model, 'list', {
            id: 3, type: StructureType.List, title: 'List', newItem: {
                title: { id: 0, type: StructureType.String, title: 'Title', value: '' },
                text: { id: 1, type: StructureType.SimpleText, title: 'Subtitle', value: '' },
                image1: { id: 2, type: StructureType.Image, title: "image 1", src: '', alt: '' },
                image2: { id: 3, type: StructureType.Image, title: "image 2", src: '', alt: '' },
                order: {
                    id: 4, type: StructureType.Select, title: 'Subtitle', value: "rtl",
                    items: [
                        { title: 'Image First - Vertical', value: "rtl-v" },
                        { title: 'Text First - Vertical', value: "ltr-v" },
                        { title: 'Image First - Horizontal', value: "rtl-h" },
                        { title: 'Text First - Horizontal', value: "ltr-h" },
                    ]
                },
            },
            value: [
                {
                    title: { id: 0, type: StructureType.String, title: 'Title', value: '' },
                    text: { id: 1, type: StructureType.SimpleText, title: 'Subtitle', value: '' },
                    image1: { id: 2, type: StructureType.Image, title: "image 1", src: '', alt: '' },
                    image2: { id: 3, type: StructureType.Image, title: "image 2", src: '', alt: '' },
                    order: {
                        id: 4, type: StructureType.Select, title: 'Subtitle', value: "rtl",
                        items: [
                            { title: 'Image First - Vertical', value: "rtl-v" },
                            { title: 'Text First - Vertical', value: "ltr-v" },
                            { title: 'Image First - Horizontal', value: "rtl-h" },
                            { title: 'Text First - Horizontal', value: "ltr-h" },
                        ]
                    },
                }
            ]
        });

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
