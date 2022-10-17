<template>
    <div>
        <img src="/blocks/TvAndAudioIntro.png" alt="">
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";


@Component
export default class BlockTvAndAudioIntro extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({ type: Object }) model!: Object

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    mounted() {
        if (this.isEmpty) {
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: 'Theme',
                    value: Theme.light,
                    items: [
                        { title: 'Light', value: this.Theme.light },
                        { title: 'Dark', value: this.Theme.dark },
                    ]
                },
                largeTitle: {
                    id: 1, type: StructureType.String, title: 'Large Title', value: 'introducing <br/> Hisense Soundbars' },
                paragraph: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Paragraph Text',
                    value: 'Hisense Soundbars creates incredible sound in a simple, compact design. Big <br /> sound that delivers a huge entertainment experience.'
                },
                link: { id: 3, type: StructureType.Url, title: 'Shop Soundbars Now', value: '/products' },
            }
        }
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
}
</script>

<style type="text/css">

</style>
