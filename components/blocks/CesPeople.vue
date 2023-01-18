<template>
    <div>
        <img src="/blocks/CesPeople.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class CesPeople extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'image1', {id: 0, type: StructureType.Image, title: "Image 1", src: '', alt: ''});
        blockAddItem(this.model, 'image2', {id: 0, type: StructureType.Image, title: "Image 2", src: '', alt: ''});
        blockAddItem(this.model, 'text1', { id: 1, type: StructureType.SimpleText, title: 'Text 1', value: '' });
        blockAddItem(this.model, 'text2', { id: 1, type: StructureType.SimpleText, title: 'Text 2', value: '' });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
