<template>
    <div>
        <img src="/blocks/FlightNightHeader.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class FlightNightHeader extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'logoImage', {
            id: 0,
            type: StructureType.Image,
            title: "Log Image",
            src: '',
            alt: ''
        });

        blockAddItem(this.model, 'campaignImage', {
            id: 1,
            type: StructureType.Image,
            title: "Log Image",
            src: '',
            alt: ''
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
