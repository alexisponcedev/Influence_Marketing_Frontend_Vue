<template>
    <div>
        <img src="/blocks/ProductsBannerV2.png" alt="">
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";


@Component
export default class ProductsBannerV2 extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({ type: Object }) model!: any

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    mounted() {
        blockAddItem(this.model, 'theme', {
            id: 0,
            type: StructureType.Select,
            title: 'Theme',
            value: Theme.dark,
            items: [
                { title: 'Light', value: this.Theme.light },
                { title: 'Dark', value: this.Theme.dark },
            ]
        })
        blockAddItem(this.model, 'image', {
            id: 1,
            type: StructureType.Image,
            title: 'Image',
            src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
            alt: 'Some note about this image',
        })
        blockAddItem(this.model, 'title', { id: 2, type: StructureType.Text, title: 'Title', value: 'Televisions' })
        blockAddItem(this.model, 'subtitle', { id: 2, type: StructureType.SimpleText, title: 'Subtitle', value: '' })

        this.model = { ... this.model }
    }


    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css">

</style>
