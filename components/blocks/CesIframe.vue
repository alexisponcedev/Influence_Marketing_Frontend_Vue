<template>
    <div>
        <img src="/blocks/CesIframe.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class CesIframe extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'iframe', { id: 0, type: StructureType.Video, title: 'iframe Link', value: '' });
        blockAddItem(this.model, 'text', {id: 1, type: StructureType.SimpleText, title: 'Subtitle', value: ''});
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
