<template>
    <div>
        <img src="/blocks/TelevisionsBlockSpotlight.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class TelevisionsBlockSpotlight extends Vue {
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
                text: {id: 1, type: StructureType.Text, title: 'Text', value: ''},
                list: {
                    id: 3, type: StructureType.List, title: "List",
                    newItem: {
                        title: {id: 1, type: StructureType.String, title: 'Title', value: ''},
                        text: {id: 1, type: StructureType.Text, title: 'Description', value: ''},
                        image: {id: 2, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                        link: {id: 2, type: StructureType.Url, title: 'Link', value: ''},
                    },
                    value: [
                        {
                            title: {id: 1, type: StructureType.String, title: 'Title', value: ''},
                            text: {id: 1, type: StructureType.Text, title: 'Description', value: ''},
                            image: {id: 2, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                            link: {id: 2, type: StructureType.Url, title: 'Link', value: ''},
                        }
                    ]
                },
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
