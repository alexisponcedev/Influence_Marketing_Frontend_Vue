<template>
    <div>
        <img src="/blocks/AuthorizedRetailersNote.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class AuthorizedRetailersNote extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: Object

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                note: {
                    id: 0,
                    type: StructureType.Text,
                    title: 'Title',
                    value: 'Please Note: Any Hisense product purchased from an unauthorized Hisense reseller may not be eligible for the benefits above, including the manufacturer’s 1 year limited warranty.'
                },
                text: {
                    id: 1,
                    type: StructureType.Text,
                    title: 'Title',
                    value: 'To identify an authorized Hisense reseller and ensure that you qualify for the benefits above, Authorized resellers are listed on Hisense’s Where to Buy button.'
                }
            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch('value')
    onValueChanged(newValue: any, oldValue: any) {
        if (newValue && Object.keys(newValue).length === 0) this.reset(oldValue);
    }
}
</script>
