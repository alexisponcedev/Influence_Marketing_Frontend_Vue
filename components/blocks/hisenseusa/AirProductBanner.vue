<template>
    <div>
        <img src="/blocks/AirProductBanner.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class AirProductBanner extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'image', {id: 0, type: StructureType.Image, title: "Badge Image", src: '', alt: ''});
        blockAddItem(this.model, 'text', {id: 1, type: StructureType.Text, title: 'Title', value: ''});
        this.model = {...this.model};
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
