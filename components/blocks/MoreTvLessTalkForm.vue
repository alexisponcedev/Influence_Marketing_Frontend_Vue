<template>
    <div>
        <img src="/blocks/MoreTvLessTalkForm.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockMoreTvLessTalkForm extends Vue {
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
                whiteTitle: {
                    id: 1, type: StructureType.String, title: 'Title', value: 'Less Talk.'
                },
                title: {
                    id: 2, type: StructureType.String, title: 'Colored Title', value: 'More Winning.'
                },
                paragraph: {
                    id: 3,
                    type: StructureType.Text,
                    title: 'Subtitle',
                    value: 'Answer the question and enter the draw to win a Hisense U6H 4K ULED TV.'
                },
                formText: {
                    id: 4,
                    type: StructureType.Text,
                    title: 'Form Text',
                    value: 'What proportion of the American public believes a brand should invest in their products, not pretentious, artsy advertisements?'
                },
                termsAndConditionsUrl: {
                    id: 5,
                    type: StructureType.Url,
                    title: 'Term and conditions URL',
                    value: '/'
                },
                image: {
                    id: 6,
                    type: StructureType.Image,
                    title: "Image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                    alt: "hisense sign",
                },
            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
        // this.loadProduct();
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
