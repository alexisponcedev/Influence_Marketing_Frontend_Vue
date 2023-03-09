<template>
    <div>
        <img src="/blocks/FlightNightCarousel.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class FlightNightCarousel extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'title', {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: ''
        });
        blockAddItem(this.model, 'image', {
            id: 2,
            type: StructureType.List,
            title: "Image List",
            newItem: {
                image: {id: 0, title: 'Image', type: StructureType.Image, src: '', alt: ''}
            },
            value: [
                {
                    image: {id: 0, title: 'Image', type: StructureType.Image, src: '', alt: ''}
                }
            ]
        });


    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
