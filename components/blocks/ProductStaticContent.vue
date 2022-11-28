<template>
    <div>
        <img src="/blocks/ProductStaticContent.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockProductStaticContent extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: Object

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
                    id: 1, type: StructureType.String, title: 'Title', value: 'EXTRA STORAGE TO MAKE LIFE EASIER.'
                },
                paragraph: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Paragraph',
                    value: 'The 2022 U7 delivers premium upgrades that offer exceptional performance for gamers and non-gamers alike including: IMAX enhanced, Filmmaker Mode, Dolby Vision IQ, HDR10, HDR10+, HDR 10+ Adaptive, Quantum Dot Color, FreeSync, and NEXTGEN TV ATSC 3.0. Premium audio upgrades including Dolby Atmos, eARC, and WiSA deliver immersive audio, while the 120Hz refresh rate brings incredible fluidity and clarity to fast-action content. The 2021 U7 exceeded expectations and the 2022 U7 is poised to take it to a whole new level.'
                },
            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
        // this.loadProduct();
    }

    loadProduct() {
        // this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/' + this.product_id )
        this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/781')
            .then(res => {
                this.product = res.data;
            }).finally(() => {
            this.loadingProduct = false;
        })
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
