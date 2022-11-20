<template>
    <div>
        <img src="/blocks/SponsorImageAndText.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class SponsorImageAndText extends Vue {
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
                image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
                text: {
                    id: 1,
                    type: StructureType.Text,
                    title: 'Text',
                    value: '<p><span style="background-color: rgb(255, 255, 255); color: rgb(33, 37, 41);">Hisense, the global consumer electronics and home appliances market leader, today announced a multi-year partnership with esports organization, Fnatic. Through this partnership, the two companies will produce a variety of content, including product reviews, video collaborations, and social engagement, each featuring Hisense appliances and Fnatic\'s prominent teams.</span></p>'
                },
                overlayText: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Overlay Text',
                    value: '<p>“We are proud to partner with Hisense, a&nbsp;<span style="color: rgb(0, 170, 166);">forward-thinking</span>, innovative company, that is committed to bringing happiness into the homes of millions of families. As a trusted partner, we are excited to share this&nbsp;<span style="color: rgb(0, 170, 166);">collaboration</span>&nbsp;with our fans, players, and creators.”</p><p>- Sam Mathews, Founder &amp; CEO of Fanatics</p>'
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
