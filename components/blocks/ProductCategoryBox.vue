<template>
    <div>
        <img src="/blocks/ProductCategoryBox.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";


@Component
export default class ProductCategoryBox extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

    Theme = Theme;

    mounted() {

        blockAddItem(this.model , 'theme', {
            id: 0,
                type: StructureType.Select,
                title: 'Theme',
                value: Theme.dark,
                items: [
                {title: 'Light', value: this.Theme.light},
                {title: 'Dark', value: this.Theme.dark},
            ]
        })
        blockAddItem(this.model , 'whereToBuy', {
            id: 0,
                type: StructureType.Select,
                title: 'Show Where To Buy',
                value: true,
                items: [
                {title: 'True', value: true},
                {title: 'False', value: false},
            ]
        })
        blockAddItem(this.model , 'support', {
            id: 1,
                type: StructureType.Url,
                title: 'Support Page',
                value: '/',
        })
        blockAddItem(this.model , 'tags', {
            id: 2,
                type: StructureType.List,
                title: 'Tags',
                newItem: {
                title: {id: 0, type: StructureType.String, title: 'Tag Title', value: 'Item Title'},
                target: {id: 0, type: StructureType.idSelector, title: 'ID Selector', value: ''},
            },
            value: [
                {
                    title: {id: 0, type: StructureType.String, title: 'Tag Title', value: 'Sample Tag Title'},
                    target: {id: 0, type: StructureType.idSelector, title: 'ID Selector', value: ''},
                },
            ]
        })
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
