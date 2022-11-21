<template>
    <div>
        <img src="/blocks/ProductSupportRegister.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockProductSupportRegister extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: Object

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
                title: {id: 1, type: StructureType.String, title: 'Title', value: 'Register Laser TV'},
                subtitle: {
                    id: 2,
                    type: StructureType.String,
                    title: 'Subtitle',
                    value: 'Get started with registering your Hisense product.'
                },
                submitURL: {
                    id: 3,
                    type: StructureType.String,
                    title: 'Submit URL',
                    value: 'https://imcrm.dev-api.hisenseportal.com/api/hisense/contact/register-product'
                },
                modelText: {id: 4, type: StructureType.Text, title: 'Modal Text', value: ''}
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
