<template>
    <div>
        <img src="/blocks/SponsorshipVideoAndTextBox.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class SponsorshipVideoAndTextBox extends Vue {
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
                video: {
                    id: 0,
                    type: StructureType.Url,
                    title: 'Video',
                    value: 'http://techslides.com/demos/sample-videos/small.mp4'
                },
                leftText: {
                    id: 1,
                    type: StructureType.Text,
                    title: 'Left Text',
                    value: '<p class="text-white fs-5"> On Nov. 21st 2021, Hisense becomes an Official Sponsor of the FIFA world Cup Qatar 2022TM . This partnership creates an exclusive connection between FIFA’s worldwide audience and our world-renowned technology company in unique and enthralling ways. </p>'
                },
                rightText: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Right Text',
                    value: '<p class="text-white fs-5"> The collaboration, in its 4th year, includes various program outlets from on-site engagement opportunities to world-wide advertising campaigns to exclusive, on-demand content from past FIFA World Cup events through our proprietary Vidaa smart tv platform, creating incredible exposure for both organizations. </p>'
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
