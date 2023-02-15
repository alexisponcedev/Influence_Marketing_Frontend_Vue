<template>
    <div>
        <img src="/blocks/LaserTvInstallationConfirmation.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class LaserTvInstallationConfirmation extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'image', {
            id: 0,
            type: StructureType.Image,
            title: 'Image',
            src: '',
            alt: ''
        })
        blockAddItem(this.model, 'text', {
            id: 0,
            type: StructureType.SimpleText,
            title: 'Text',
            value: '',
        })
        blockAddItem(this.model, 'link', {
            id: 0,
            type: StructureType.Url,
            title: 'Link',
            value: '',
        })

        this.model = {...this.model}
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

}
</script>
