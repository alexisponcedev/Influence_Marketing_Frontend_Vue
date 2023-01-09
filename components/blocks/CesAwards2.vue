<template>
    <div>
        <img src="/blocks/CesAwards2.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class CesAwards2 extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({ default: true }) readonly editable: boolean | undefined
    @VModel({ type: Object }) model!: any

    mounted() {
        blockAddItem(this.model, 'title', { id: 0, type: StructureType.SimpleText, title: 'Title', value: '' })
        blockAddItem(this.model, 'list', {
            id: 1, type: StructureType.List, title: 'List', newItem: {
                image: { id: 0, type: StructureType.Image, title: 'Product Image', src: '', alt: '' },
                title: { id: 1, type: StructureType.String, title: 'Title', value: '' },
                subtitle: { id: 1, type: StructureType.String, title: 'Subtitle', value: '' },
                link: { id: 1, type: StructureType.Url, title: 'Link', value: '' },
            },
            value: [
                {
                    image: { id: 0, type: StructureType.Image, title: 'Product Image', src: '', alt: '' },
                    title: { id: 1, type: StructureType.String, title: 'Title', value: '' },
                    subtitle: { id: 1, type: StructureType.String, title: 'Subtitle', value: '' },
                    link: { id: 1, type: StructureType.Url, title: 'Link', value: '' },
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
