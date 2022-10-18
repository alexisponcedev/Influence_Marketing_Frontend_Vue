<template>
    <div>
        <img src="/blocks/CommercialIntro.png" alt="">
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";


@Component
export default class BlockCommercialIntro extends Vue {
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
                    value: Theme.dark,
                    items: [
                        { title: 'Light', value: this.Theme.light },
                        { title: 'Dark', value: this.Theme.dark },
                    ]
                },
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Title",
                    value: "It's Time to Rethink TV",
                },
                paragraph: {
                    id: 2,
                    type: StructureType.String,
                    title: "Paragraph",
                    value: "Hisense Laser TV is revolution in display technology, delivering a cinema-like picture with ultra wide color gamut at a massive scale. The use of pure color lasers beaming at an ambient light rejecting screen from just inches away gives you a beautifully bright picture with true-to-life color. Add to that built-in Dolby Atmos Sound, 4K Resolution, Smooth Motion, and a Smart TV OS, Laser TV will quite literally change the way you watch TV.",
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
