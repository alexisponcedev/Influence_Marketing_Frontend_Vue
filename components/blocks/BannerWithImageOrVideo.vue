<template>
    <div>
        <img src="/blocks/BannerWithImageOrVideo.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BannerWithImageOrVideo extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any


    mounted() {
        blockAddItem(this.model, 'title', {
            id: 0,
            type: StructureType.SimpleText,
            title: 'Title',
            value: ''
        })

        blockAddItem(this.model, 'link', {
            id: 1,
            type: StructureType.Url,
            title: 'Link',
            value: ''
        })

        blockAddItem(this.model, 'image', {
            id: 1,
            type: StructureType.Image,
            title: 'Image',
            src: '',
            alt: ''
        })

        blockAddItem(this.model, 'video', {
            id: 1,
            type: StructureType.Video,
            title: 'Video',
            value: '',
        })
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
