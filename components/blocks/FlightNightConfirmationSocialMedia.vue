<template>
    <div>
        <img src="/blocks/AirProductTextBox.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class FlightNightConfirmationSocialMedia extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'title', {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value : ''
        });

        blockAddItem(this.model, 'subtitle', {
            id: 2,
            type: StructureType.SimpleText,
            title: "Subtitle",
            value : ''
        });

        blockAddItem(this.model, 'image1', {
            id: 3,
            type: StructureType.Image,
            title: "Image1",
            src: '',
            alt: ''
        });

        blockAddItem(this.model, 'caption1', {
            id: 4,
            type: StructureType.Image,
            title: "Caption1",
            src: '',
            alt: ''
        });

        blockAddItem(this.model, 'image2', {
            id: 5,
            type: StructureType.Image,
            title: "Image2",
            src: '',
            alt: ''
        });

        blockAddItem(this.model, 'caption2', {
            id: 6,
            type: StructureType.Image,
            title: "Caption2",
            src: '',
            alt: ''
        });

        blockAddItem(this.model, 'text', {
            id: 7,
            type: StructureType.SimpleText,
            title: "Text",
            value : ''
        });

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
