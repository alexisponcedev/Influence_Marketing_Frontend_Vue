<template>
    <div>
        <img src="/blocks/CESPX1LikeBox.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class CESPX1LikeBox extends Vue {
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
                text: {id: 0, type: StructureType.Text, title: 'Text', value: 'Thank you for stopping by!'},
                links: {
                    id: 1, type: StructureType.List, title: 'Links',
                    newItem: {
                        link: {id: 0, type: StructureType.Url, title: 'Return to ces', value: ''},
                    },
                    value: [
                        {
                            link: {id: 0, type: StructureType.Url, title: 'Return to ces', value: ''},
                        },
                        {
                            link: {id: 0, type: StructureType.Url, title: 'Visit Hisense', value: ''},
                        },
                        {
                            link: {id: 0, type: StructureType.Url, title: 'Back to top', value: ''},
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
