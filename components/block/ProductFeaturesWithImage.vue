<template>
    <div>
        <img src="/blocks/ProductFeaturesWithImage.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class BlockProductFeaturesWithImage extends Vue {
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
                littleTitle: {
                    id: 1,
                    type: StructureType.String,
                    title: 'little title',
                    value: "4K ULED ™"
                },
                title: {
                    id: 2,
                    type: StructureType.String,
                    title: 'title',
                    value: "Sharper, smoother pictures"
                },
                description: {
                    id: 3,
                    type: StructureType.String,
                    title: 'description',
                    value: "4K greatness, but better. The U8G has our exclusive ULED technologies. They boost color, contrast, brightness, motion… we could go on. It’s the TV your old TV wants to be."
                },
                image: {
                    id: 4,
                    type: StructureType.Image,
                    title: 'description',
                    src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/26632e121d/pdp-3_6-u9-50-50-feat-1__ScaleMaxWidthWzMwNDhd.jpg-t34p4p.jpg',
                    alt: 'featured image'
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
