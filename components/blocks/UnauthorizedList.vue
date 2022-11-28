te
<template>
    <div>
        <img src="/blocks/UnauthorizedList.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class UnauthorizedList extends Vue {
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
                count: {id: 0, type: StructureType.String, title: 'Max Per Row', value: 2},
                list: {
                    id: 1,
                    type: StructureType.List,
                    title: 'List',
                    newItem: {
                        text: {id: 0, type: StructureType.Text, title: 'Text', value: ''},
                    },
                    value: [
                        {
                            text: {id: 0, type: StructureType.Text, title: 'Text', value: ''},
                        }
                    ]
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
