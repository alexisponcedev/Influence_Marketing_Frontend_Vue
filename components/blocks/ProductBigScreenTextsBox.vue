<template>
    <div>
        <img src="/blocks/ProductBigScreenTextsBox.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockProductBigScreenTextsBox extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

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
                titleOrder: {
                    id: 0,
                    type: StructureType.Select,
                    title: 'Title - First element',
                    value: 'black',
                    items: [
                        {title: 'Black Title', value: 'black'},
                        {title: 'Colored Title', value: 'colored'},
                    ]
                },
                coloredTitle: {
                    id: 1, type: StructureType.String, title: 'Title', value: 'More clear,'
                },
                blackTitle: {
                    id: 1, type: StructureType.String, title: 'Title', value: 'more defined'
                },
                paragraph: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Paragraph',
                    value: 'The A6 Series 4K UHD Smart TV is an entertainment must‐ have that features tons of built‐in apps via the Smart Platform - VIDAA, making it easier than ever to personalize your entertainment experience. Other details include DTS® Virtual:X™ for crisp audio, and Motion Rate 120 keeps up with the fastest sports, movies and gaming. The screen size also makes it ideal for smaller rooms and budgets.'
                },
            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
        // this.loadProduct();
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
