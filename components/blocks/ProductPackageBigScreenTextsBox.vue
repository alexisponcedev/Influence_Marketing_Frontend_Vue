<template>
    <div>
        <img src="/blocks/ProductPackageBigScreenTextsBox.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";


@Component
export default class ProductPackageBigScreenTextsBox extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    mounted() {
        blockAddItem(this.model, 'theme', {
            id: 0,
            type: StructureType.Select,
            title: 'Theme',
            value: Theme.light,
            items: [
                {title: 'Light', value: this.Theme.light},
                {title: 'Dark', value: this.Theme.dark},
            ]
        })
        blockAddItem(this.model, 'titleOrder', {
            id: 1,
            type: StructureType.Select,
            title: 'Title - First element',
            value: 'black',
            items: [
                {title: 'Black Title', value: 'black'},
                {title: 'Colored Title', value: 'colored'},
            ]
        })
        blockAddItem(this.model, 'coloredTitle', {
            id: 2, type: StructureType.String, title: 'Colored Title', value: 'More clear,'
        })
        blockAddItem(this.model, 'blackTitle', {
            id: 3, type: StructureType.String, title: 'Black Title', value: 'more defined'
        })
        blockAddItem(this.model, 'paragraph', {
            id: 4,
            type: StructureType.Text,
            title: 'Paragraph',
            value: 'The A6 Series 4K UHD Smart TV is an entertainment must‐ have that features tons of built‐in apps via the Smart Platform - VIDAA, making it easier than ever to personalize your entertainment experience. Other details include DTS® Virtual:X™ for crisp audio, and Motion Rate 120 keeps up with the fastest sports, movies and gaming. The screen size also makes it ideal for smaller rooms and budgets.'
        })
        blockAddItem(this.model, 'image', {
            id: 5,
            type: StructureType.Image,
            title: 'Image',
            src: '',
            alt: ''
        })
        this.model = {...this.model};
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css">

</style>
