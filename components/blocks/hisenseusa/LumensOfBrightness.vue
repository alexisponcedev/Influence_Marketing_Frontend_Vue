<template>
    <div>
        <img src="/blocks/LumensOfBrightness.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeLumensOfBrightness extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                title: {id: 0, type: StructureType.String, title: 'Title', value: '3000 Lumens of Brightness'},
                video: {
                    id: 1,
                    type: StructureType.Video,
                    title: 'Video',
                    value: 'https://player.vimeo.com/external/591775915.hd.mp4?s=a6159ae8fbc6013d82aea94a0c0b13c60a59d1d3&profile_id=175'
                },
                text: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Text',
                    value: '<p><span>3000 Lumens.</span>  That’s right, the L9G shines with brilliance so all your HDR content hits those shimmering highlights, bold colors, and voluminous blacks that make everything pop off the screen </p>'
                },
                list: {
                    id: 3,
                    type: StructureType.List,
                    newItem: {
                        title: {id: 0, type: StructureType.String, title: 'Title', value: 'HDR10'},
                        subtitle: {id: 1, type: StructureType.String, title: 'Subtitle', value: 'Native Refresh Rate'},
                    },
                    value: [
                        {
                            title: {id: 0, type: StructureType.String, title: 'Title', value: '3000 Lumens.'},
                            subtitle: {id: 1, type: StructureType.String, title: 'Subtitle', value: 'Lumens'},
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: 'Title', value: 'HDR10'},
                            subtitle: {id: 1, type: StructureType.String, title: 'Subtitle', value: 'Dynamic Range'},
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: 'Title', value: 'HDR10'},
                            subtitle: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Subtitle',
                                value: 'Native Refresh Rate'
                            },
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

    addItem(name: string, item: any) {
        if (!this.model.hasOwnProperty(name)) this.model[name] = item;
        this.model[name].id = item.id;

        if (this.model[name].type !== item.type) this.model[name].type = item.type;
        if (item.type === StructureType.Image) {
            this.model[name].src = '';
            this.model[name].alt = 'Image Alt';
        }
        if (item.type === StructureType.List) {
            this.model[name].newItem = item.newItem;
        }
        if (item.type === StructureType.Select) {
            this.model[name].items = item.items;
        }
    }
}
</script>
