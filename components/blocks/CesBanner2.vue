<template>
    <div>
        <img src="/blocks/CESBanner2.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class CesBanner2 extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'image1', {id: 0, type: StructureType.Image, title: "Image 1", src: '', alt: ''});
        blockAddItem(this.model, 'imageLink1', {id: 1, type: StructureType.Url, title: 'Image Link 1', value: ''});
        blockAddItem(this.model, 'image2', {id: 0, type: StructureType.Image, title: "Image 2", src: '', alt: ''});
        blockAddItem(this.model, 'imageLink2', {id: 1, type: StructureType.Url, title: 'Image Link 2', value: ''});
        blockAddItem(this.model, 'title', {id: 1, type: StructureType.String, title: 'Title', value: ''});
        blockAddItem(this.model, 'rightText', {id: 1, type: StructureType.String, title: 'Right Text', value: ''});
        blockAddItem(this.model, 'leftText', {id: 1, type: StructureType.String, title: 'Left Text', value: ''});
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
