<template>
    <div>
        <img src="/blocks/ProductSupportInfo.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockProductSupportInfo extends Vue {
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
                title: {
                    id: 1, type: StructureType.String, title: 'Title', value: 'Product Support'
                },
                subtitle: {id: 2, type: StructureType.String, title: 'Title', value: 'SUPPORT HOURS:'},
                firstDay: {id: 2, type: StructureType.String, title: 'First Days', value: 'MONDAY-FRIDAY'},
                firstTime: {id: 2, type: StructureType.String, title: 'First Time', value: '9AM - 9PM EST'},
                secondDay: {id: 2, type: StructureType.String, title: 'Second Days', value: 'SATURDAY-SUNDAY'},
                secondTime: {id: 2, type: StructureType.String, title: 'Second Time', value: '9AM - 6PM EST'},
            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
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
