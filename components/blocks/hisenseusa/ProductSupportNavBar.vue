<template>
    <div>
        <img src="/blocks/ProductSupportNavBar.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockProductSupportNavBar extends Vue {
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

    @Watch('isEmpty')
    onValueChanged() {

        if (this.isEmpty) this.reset();
    }
}
</script>

<style type="text/css"></style>
