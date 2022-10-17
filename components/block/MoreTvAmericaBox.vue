<template>
    <div>
        <img src="/blocks/MoreTvAmericaBox.png" alt="">
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";


@Component
export default class BlockMoreTvAmericaBox extends Vue {
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
                    id: 1, type: StructureType.String, title: 'Title', value: 'Lets get real'
                },
                littleTitle: {
                    id: 1, type: StructureType.String, title: 'little Title', value: 'America wants less talk and more TV'
                },
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Upload Image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                    alt: "Some note about this image",
                },
                paragraph: {
                    id: 3,
                    type: StructureType.Text,
                    title: 'Paragraph Text',
                    value: 'Tireless research and countless responses (well, 2500 to be exact) finally reveals what America really wants from an electronics manufacturer. Read the earth-shattering truth in the Hisense Brand Survey Report 2022.'
                },
                link: { id: 4, type: StructureType.Url, title: 'DOWNLOAD OUR B.S REPORT', value: '/products' },
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
