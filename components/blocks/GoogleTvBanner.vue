<template>
    <div>
        <img src="/blocks/GoogleTvBanner.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class GoogleTvBanner extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'backgroundImage', {
            id: 0,
            type: StructureType.Image,
            title: "Background Image",
            src: '',
            alt: ''
        });
        blockAddItem(this.model, 'image1', {id: 0, type: StructureType.Image, title: "Image 1", src: '', alt: ''});
        blockAddItem(this.model, 'image2', {id: 0, type: StructureType.Image, title: "Image 2", src: '', alt: ''});
        blockAddItem(this.model, 'title', {id: 1, type: StructureType.SimpleText, title: 'Title', value: ''});
        blockAddItem(this.model, 'link', {id: 1, type: StructureType.Url, title: 'Link', value: ''});
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
