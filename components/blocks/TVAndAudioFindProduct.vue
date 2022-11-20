<template>
    <div>
        <img src="/blocks/TvAndAudioFindProduct.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockTvAndAudioFindProduct extends Vue {
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
                    value: Theme.dark,
                    items: [
                        {title: 'Light', value: this.Theme.light},
                        {title: 'Dark', value: this.Theme.dark},
                    ]
                },
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Black Title",
                    value: "Find Your",
                },
                coloredTitle: {
                    id: 2,
                    type: StructureType.String,
                    title: "Colored Title",
                    value: "Hisense TV",
                },
                tinyTitle: {
                    id: 3,
                    type: StructureType.String,
                    title: "tiny title",
                    value: "Take a look at our selection of models and see whats right for you.",
                },
                link: {
                    id: 4,
                    type: StructureType.Url,
                    title: "Shop Now",
                    value: "/products",
                },
                image: {
                    id: 5,
                    type: StructureType.Image,
                    title: "Upload Image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/7281523f01/banner-new__ScaleMaxWidthWzMwNDhd.png-sigwnx.png",
                    alt: "Some note about this image",
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
