<template>
    <div>
        <img src="/blocks/ProductCategoryBox.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class ProductPackageCategoryBox extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

    Theme = Theme;

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
                whereToBuy: {
                    id: 0,
                    type: StructureType.Select,
                    title: 'Show Where To Buy',
                    value: true,
                    items: [
                        {title: 'True', value: true},
                        {title: 'False', value: false},
                    ]
                },
                support: {
                    id: 1,
                    type: StructureType.Url,
                    title: 'Support Page',
                    value: '/',
                },
                tags: {
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
                },
            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
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

<style type="text/css">

</style>
