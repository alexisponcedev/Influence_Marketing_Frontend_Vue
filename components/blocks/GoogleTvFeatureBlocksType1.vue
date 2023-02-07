<template>
    <div>
        <img src="/blocks/GoogleTvFeatureBlocksType1.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class GoogleTvFeatureBlocksType1 extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'block1', {
            id: 3, type: StructureType.Object, title: "Block 1", value: {
                text: {id: 1, type: StructureType.SimpleText, title: 'Text', value: ''},
                image: {id: 2, type: StructureType.Image, title: "Image", src: '', alt: ''},
            }
        });

        blockAddItem(this.model, 'block2', {
            id: 4, type: StructureType.Object, title: "Block 2", value: {
                text: {id: 1, type: StructureType.SimpleText, title: 'Text', value: ''},
                icon1: {id: 2, type: StructureType.Image, title: "Icon1", src: '', alt: ''},
                icon2: {id: 3, type: StructureType.Image, title: "Icon2", src: '', alt: ''},
                image1: {id: 4, type: StructureType.Image, title: "Image 1", src: '', alt: ''},
                image2: {id: 5, type: StructureType.Image, title: "Image 2", src: '', alt: ''},
                subtitle: {id: 6, type: StructureType.SimpleText, title: "Subtitle", value: ''},
            }
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
