<template>
    <div>
        <img src="/blocks/FAQDescriptionWithTwoBox.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockFAQDescriptionWithTwoBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;


    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        {title: "Light", value: this.Theme.light},
                        {title: "Dark", value: this.Theme.dark},
                    ],
                },
                width: {id: 1, type: StructureType.String, title: 'Width', value: '1000'},
                title1: {
                    id: 1,
                    type: StructureType.Text,
                    title: 'Title',
                    value: '<p class="ql-align-center"><span style="color: rgb(41, 41, 41);">Below you’ll find answers to frequently asked questions about Hisense TV’s and home appliances.</span></p>'
                },
                leftTitle: {
                    id: 1,
                    type: StructureType.Text,
                    title: 'Left Title',
                    value: '<p class="ql-align-center"><strong style="color: rgb(41, 41, 41);">Television FAQs</strong></p><p class="ql-align-center"><a href="https://www.hisense-usa.com/support/faq/tvs/common-questions" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(1, 204, 204);">Common Questions</a></p><p class="ql-align-center"><a href="https://www.hisense-usa.com/support/faq/tvs/laser-tvs" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(1, 204, 204);">Laser TV</a></p><p class="ql-align-center"><a href="https://www.hisense-usa.com/support/faq/tvs/r7e-series" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(1, 204, 204);">R7E Series</a></p>'
                },
                rightTitle: {
                    id: 1,
                    type: StructureType.Text,
                    title: 'Right Title',
                    value: '<p class="ql-align-center"><strong style="color: rgb(41, 41, 41);">Appliance FAQs</strong></p><p class="ql-align-center"><a href="https://www.hisense-usa.com/support/faq/air-conditioners" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(1, 204, 204);">Portable ACs</a></p><p class="ql-align-center"><a href="https://www.hisense-usa.com/support/faq/dehumidifiers" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(1, 204, 204);">Dehumidifiers</a></p>'
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch('isEmpty')
    onValueChanged() {

        if (this.isEmpty) this.reset();
    }
}
</script>

<style type="text/css"></style>
