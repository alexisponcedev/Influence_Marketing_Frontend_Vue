<template>
    <div>
        <img src="/blocks/CircularImageBlocks.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class CircularImageBlocks extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({ default: true }) readonly editable: boolean | undefined
    @VModel({ type: Object }) model!: any

    mounted() {
        blockAddItem(this.model, 'title', { id: 0, type: StructureType.SimpleText, title: 'Title', value: '' });
        blockAddItem(this.model, 'list', {
            id: 1, type: StructureType.List, title: 'List', newItem: {
                title: { id: 0, type: StructureType.String, title: 'Title', value: '' },
                backgroundImage: { id: 1, type: StructureType.Image, title: "Background Image", src: '', alt: '' },
                image: { id: 2, type: StructureType.Image, title: "image", src: '', alt: '' },
            },
            value: [
                {
                    title: { id: 0, type: StructureType.String, title: 'Title', value: '' },
                    backgroundImage: { id: 1, type: StructureType.Image, title: "Background Image", src: '', alt: '' },
                    image: { id: 2, type: StructureType.Image, title: "image", src: '', alt: '' },
                }
            ]
        });
        blockAddItem(this.model, 'text', { id: 2, type: StructureType.SimpleText, title: 'Text', value: '' });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
