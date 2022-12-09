<template>
    <div>
        <img src="/blocks/ExtendedWarrantyWizard.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class ExtendedWarrantyWizard extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    // reset(oldValue: any = {}) {
    //
    //     if (oldValue && Object.keys(oldValue).length > 0) {
    //         this.model = {
    //             ...oldValue, ...{
    //                 backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
    //             }
    //         }
    //     } else
    //         this.model = {
    //             terms: {id: 0, type: StructureType.Text, title: 'Terms and Conditions', value: ''}
    //         }
    // }

    mounted() {
        // if (this.isEmpty) this.reset();
        blockAddItem(this.model, 'terms', {id: 0, type: StructureType.Text, title: 'Terms and Conditions', value: ''})
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

}
</script>
