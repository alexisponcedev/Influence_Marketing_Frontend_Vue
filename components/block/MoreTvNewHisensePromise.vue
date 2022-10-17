<template>
    <div>
        <img src="/blocks/MoreTvNewHisensePromise.png" alt="">
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";


@Component
export default class BlockMoreTvNewHisensePromise extends Vue {
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
                title: {
                    id: 1, type: StructureType.String, title: 'Title', value: 'The Hisense Promise'
                }, 
                tinyTitle: {
                    id: 2, type: StructureType.String, title: 'tiny Title', value: 'Great TVs. Great Prices. No B.S.'
                },
                paragraph: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Paragraph Text',
                    value: 'Sure, we may not be the biggest or the most well known but there’s one thing you can count on – Hisense will always strive to make the latest technologies available to all.'
                },
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Upload Image sign",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                    alt: "hisense sign",
                },
                video: {
                    id: 4,
                    type: StructureType.File,
                    title: "Upload Image person",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                    alt: "video",
                },
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
