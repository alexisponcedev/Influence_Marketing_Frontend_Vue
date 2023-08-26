<template>
    <div>
        <img src="/blocks/GoogleTvFeatureBlocksType3.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class GoogleTvFeatureBlocksType3 extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'block1', {
            id: 6, type: StructureType.Object, title: "Block 1", value: {
                subtitle: {id: 1, type: StructureType.String, title: "Subtitle", value: ''},
                title: {id: 2, type: StructureType.String, title: "Title", value: ''},
                image: {id: 3, type: StructureType.Image, title: "Image", src: '', alt: ''},
            }
        });

        blockAddItem(this.model, 'block2', {
            id: 7, type: StructureType.Object, title: "Block 2", value: {
                text: {id: 1, type: StructureType.SimpleText, title: "Text", value: ''},
                backgroundImage: {id: 2, type: StructureType.Image, title: "Background Image", src: '', alt: ''},
            }
        });

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
