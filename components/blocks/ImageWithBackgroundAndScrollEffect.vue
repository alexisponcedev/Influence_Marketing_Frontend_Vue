<template>
    <div>
        <img src="/blocks/ImageWithBackgroundAndScrollEffect.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class ImageWithBackgroundAndScrollEffect extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'backgroundImage', {id: 0, type: StructureType.Image, title: "Background Image", src: '', alt: ''});
        blockAddItem(this.model, 'text', {id: 1, type: StructureType.SimpleText, title: 'Text', value: ''});
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
