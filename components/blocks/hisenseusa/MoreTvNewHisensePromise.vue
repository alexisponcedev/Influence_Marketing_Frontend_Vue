<template>
    <div>
        <img src="/blocks/MoreTvNewHisensePromise.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockMoreTvNewHisensePromise extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

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
                    title: 'Theme',
                    value: Theme.light,
                    items: [
                        {title: 'Light', value: this.Theme.light},
                        {title: 'Dark', value: this.Theme.dark},
                    ]
                },
                title: {
                    id: 1, type: StructureType.String, title: 'Title', value: 'The Hisense Promise'
                },
                subTitle: {
                    id: 2, type: StructureType.String, title: 'Subtitle', value: 'Great TVs. Great Prices. No B.S.'
                },
                text: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Text',
                    value: 'Sure, we may not be the biggest or the most well known but there’s one thing you can count on – Hisense will always strive to make the latest technologies available to all.'
                },
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Signature Image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                    alt: "hisense sign",
                },
                video: {
                    id: 4,
                    type: StructureType.String,
                    title: "Video URL",
                    value: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                    alt: "video",
                },
            }
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

<style type="text/css">

</style>
