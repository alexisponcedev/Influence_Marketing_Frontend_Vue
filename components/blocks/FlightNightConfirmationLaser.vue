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
export default class FlightNightConfirmationLaser extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'logoImage', {
            id: 1,
            type: StructureType.Image,
            title: "Logo Image",
            src: '',
            alt: ''
        });

        blockAddItem(this.model, 'modelImage', {
            id: 2,
            type: StructureType.Image,
            title: "Model Image",
            src: '',
            alt: ''
        });

        blockAddItem(this.model, 'text', {
            id: 3,
            type: StructureType.SimpleText,
            title: "Text",
            value: '',
        });

        blockAddItem(this.model, 'image', {
            id: 4,
            type: StructureType.Image,
            title: "Image",
            src: '',
            alt: ''
        });

        blockAddItem(this.model, 'link', {
            id: 5,
            type: StructureType.Url,
            title: "Link",
            value: '',
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
