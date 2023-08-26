<template>
    <div>
        <img src="/blocks/ULEDXWaitlist.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class ULEDXWaitlist extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'video', {id: 0, type: StructureType.Video, title: "Video", value: ""});
        blockAddItem(this.model, 'title', {id: 1, type: StructureType.String, title: 'Title', value: ''});
        blockAddItem(this.model, 'text', {id: 1, type: StructureType.String, title: 'Notify Me', value: ''});
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
