<template>
    <div>
        <img src="/blocks/ColorFeature.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeColorFeature extends Vue {
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
                text: {
                    id: 0,
                    type: StructureType.Text,
                    title: 'Text',
                    value: 'Experience color like never before. The L9G uses pure red, green,and blue lasers to achieve new levels of color performance, reaching '
                },
                leftVideo: {
                    id: 1,
                    type: StructureType.Video,
                    title: 'Left Side Video',
                    value: 'https://player.vimeo.com/external/585409801.hd.mp4?s=36b793ad850bc1bcdc5563fadff9d9218f620ec9&profile_id=175'
                },
                leftTitle: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Left Side Text',
                    value: '<p><strong>107%</strong>  BT.2020 Color Space</p>'
                },
                rightVideo: {
                    id: 3,
                    type: StructureType.Video,
                    title: 'Right Side Video',
                    value: 'https://player.vimeo.com/external/585409581.hd.mp4?s=302e82593e6e3329de848c6c31e971a1255c9db6&profile_id=175'
                },
                rightTitle: {
                    id: 4,
                    type: StructureType.Text,
                    title: 'Right Side Text',
                    value: '<p><strong>1+ Billion colors</strong></p>'
                },
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
