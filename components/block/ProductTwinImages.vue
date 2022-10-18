<template>
    <div>
        <img src="/blocks/ProductTwinImages.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class BlockProductTwinImages extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: Object;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    mounted() {
        if (this.isEmpty) {
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: this.Theme.light },
                        { title: "Dark", value: this.Theme.dark },
                    ],
                },
                imageLeft: {
                    id: 1,
                    type: StructureType.Image,
                    title: 'Upload left image',
                    src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/7daa063bd6/pdp-3_6-u9-close-up-shot-1__ScaleMaxWidthWzMwNDhd.jpg-2uhe16.jpg',
                    alt: 'featured image',
                },
                imageRight: {
                    id: 2,
                    type: StructureType.Image,
                    title: 'Upload rigth image',
                    src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/d6c7d4d6e7/pdp-3_6-u9-close-up-shot-2__ScaleMaxWidthWzMwNDhd.jpg-6h9mqf.jpg',
                    alt: 'featured image',
                },
            };
        }
        // this.loadProduct();
    }

    loadProduct() {
        // this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/' + this.product_id )
        this.$axios
            .$get("https://impim.dev-api.hisenseportal.com/api/cms/getProduct/781")
            .then((res) => {
                this.product = res.data;
            })
            .finally(() => {
                this.loadingProduct = false;
            });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css">

</style>
