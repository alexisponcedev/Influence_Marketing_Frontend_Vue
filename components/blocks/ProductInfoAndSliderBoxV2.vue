<template>
    <div>
        <img src="/blocks/ProductInfoAndSliderBoxV2.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";


@Component
export default class ProductInfoAndSliderBoxV2 extends Vue {
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
            value: Theme.dark,
            items: [
                {title: 'Light', value: this.Theme.light},
                {title: 'Dark', value: this.Theme.dark},
            ]
        })
        blockAddItem(this.model, 'whereToBuy', {
            id: 1,
            type: StructureType.Select,
            title: 'Show Where To Buy',
            value: true,
            items: [
                {title: 'True', value: true},
                {title: 'False', value: false},
            ]
        })
        blockAddItem(this.model, 'backgroundColor', {
            id: 2,
            type: StructureType.Color,
            title: 'Background Color',
            value: ''
        })
        blockAddItem(this.model, 'description', {
            id: 3,
            type: StructureType.String,
            title: 'Description',
            value: "The Tv that's great for everyone"
        })
        this.model = {...this.model};


    }

    loadProduct() {
        this.$axios.$get(process.env.PIM_API_URL + '/cms/getProduct/781')
            .then(res => {
                this.product = res.data;
            }).finally(() => {
            this.loadingProduct = false;
        })
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    addItem(name: string, item: any) {
        if (!this.model.hasOwnProperty(name)) this.model[name] = item;
        this.model[name].id = item.id;

        if (this.model[name].type !== item.type) this.model[name].type = item.type;
        if (item.type === StructureType.Image) {
            this.model[name].src = '';
            this.model[name].alt = 'Image Alt';
        }
        if (item.type === StructureType.List) {
            this.model[name].newItem = item.newItem;
        }
        if (item.type === StructureType.Select) {
            this.model[name].items = item.items;
        }
    }
}
</script>
