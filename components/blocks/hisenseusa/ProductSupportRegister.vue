<template>
    <div>
        <img src="/blocks/ProductSupportRegister.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";


@Component
export default class BlockProductSupportRegister extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

    Theme = Theme;

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
        });
        blockAddItem(this.model, 'title', {
            id: 1,
            type: StructureType.String,
            title: 'Title',
            value: 'Register Laser TV'
        });
        blockAddItem(this.model, 'subtitle', {
            id: 2,
            type: StructureType.String,
            title: 'Subtitle',
            value: 'Get started with registering your Hisense product.'
        });
        blockAddItem(this.model, 'secondTitle', {
            id: 3,
            type: StructureType.String,
            title: 'Second Title',
            value: 'Register Laser TV'
        });
        blockAddItem(this.model, 'secondSubtitle', {
            id: 4,
            type: StructureType.String,
            title: 'Second Subtitle',
            value: 'Get started with registering your Hisense product.'
        });
        blockAddItem(this.model, 'modelText', {id: 5, type: StructureType.Text, title: 'Modal Text', value: ''});
        blockRemoveItem(this.model, ['submitURL']);
        this.model = {...this.model};
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
