<template>
    <div>
        <img src="/blocks/BlockFeatured.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class BlockFeatured extends Vue {
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

                list: {
                    id: 0,
                    type: StructureType.List,
                    title: 'List',
                    newItem: {
                        title: {
                            id: 0,
                            type: StructureType.String,
                            title: 'Title',
                            value: 'Introducing our CMO, Mr. McHale.'
                        },
                        image: {id: 1, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
                        video: {id: 2, type: StructureType.Url, title: 'Video', value: ''},
                        text: {id: 3, type: StructureType.String, title: 'Text', value: ''},
                        link: {id: 4, type: StructureType.Url, title: 'Learn More', value: ''}
                    },
                    value: [
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Title',
                                value: 'Introducing our CMO, Mr. McHale.'
                            },
                            image: {id: 1, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
                            video: {id: 2, type: StructureType.Url, title: 'Video', value: ''},
                            text: {id: 3, type: StructureType.String, title: 'Text', value: ''},
                            link: {id: 4, type: StructureType.Url, title: 'Learn More', value: ''}
                        },
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Title',
                                value: 'TVs big on specs, low on B.S.'
                            },
                            image: {id: 1, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
                            video: {id: 2, type: StructureType.Url, title: 'Video', value: ''},
                            text: {id: 3, type: StructureType.String, title: 'Text', value: ''},
                            link: {id: 4, type: StructureType.Url, title: 'Learn More', value: ''}
                        },
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Title',
                                value: 'Kitchen-Suite that’s simply sweet.'
                            },
                            image: {id: 1, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
                            video: {id: 2, type: StructureType.Url, title: 'Video', value: ''},
                            text: {id: 3, type: StructureType.String, title: 'Text', value: ''},
                            link: {id: 4, type: StructureType.Url, title: 'Learn More', value: ''}
                        },
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
