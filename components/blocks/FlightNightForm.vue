<template>
    <div>
        <img src="/blocks/FlightNightForm.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class FlightNightForm extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'title', {
            id: 0,
            type: StructureType.SimpleText,
            title: "Title",
            value: '',
        });

        blockAddItem(this.model, 'secondTitle', {
            id: 1,
            type: StructureType.SimpleText,
            title: "Second Title",
            value: '',
        });

        blockAddItem(this.model, 'terms', {
            id: 2,
            type: StructureType.Text,
            title: "Terms",
            value: '',
        });
        blockAddItem(this.model, 'submitText', {
            id: 3,
            type: StructureType.Url,
            title: "Submit",
            value: '',
        });

        this.model = { ... this.model}
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
