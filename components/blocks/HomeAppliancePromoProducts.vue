<template>
    <div>
        <img src="/blocks/HomeAppliancePromoProducts.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class HomeAppliancePromoProducts extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({ default: true }) readonly editable: Boolean | undefined
    @VModel({ type: Object }) model!: any

    mounted() {
        blockAddItem(this.model, 'title', { id: 0, type: StructureType.SimpleText, title: 'Title', value: '' })
        blockAddItem(this.model, 'list', {
            id: 1, type: StructureType.List, title: 'List', newItem: {
                image: { id: 0, type: StructureType.Image, title: 'Product Image', src: '', alt: '' },
                title: { id: 1, type: StructureType.String, title: 'Title', value: '' },
                text: { id: 3, type: StructureType.SimpleText, title: 'Text', value: '' },
                retailer: { id: 2, type: StructureType.Image, title: 'Retailer Image', src: '', alt: '' },
                link: { id: 4, type: StructureType.Url, title: '', value: '/' },
            },
            value: [
                {
                    image: { id: 0, type: StructureType.Image, title: 'Product Image', src: '', alt: '' },
                    title: { id: 1, type: StructureType.String, title: 'Title', value: '' },
                    text: { id: 3, type: StructureType.SimpleText, title: 'Text', value: '' },
                    retailer: { id: 2, type: StructureType.Image, title: 'Retailer Image', src: '', alt: '' },
                    link: { id: 4, type: StructureType.Url, title: '', value: '/' },
                }
            ]
        });
        blockAddItem(this.model, 'text', { id: 2, type: StructureType.SimpleText, title: 'Bottom Text', value: '' })


    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
