<template>
    <div>
        <img src="/blocks/FlightNightBanner.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class FlightNightBanner extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'image', {
            id: 0,
            type: StructureType.Image,
            title: "Image",
            src: '',
            alt: ''
        });

        blockAddItem(this.model, 'title', {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: ''
        });
        this.model = {...this.model}
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
