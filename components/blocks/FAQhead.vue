<template>
    <div>
        <img src="/blocks/FAQhead.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlockFAQhead extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;


    mounted() {
        blockAddItem(this.model, 'theme', {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                {title: "Light", value: this.Theme.light},
                {title: "Dark", value: this.Theme.dark},
            ],
        })
        blockAddItem(this.model, 'width', {id: 1, type: StructureType.String, title: 'Width', value: '1000'})
        blockAddItem(this.model, 'height', {id: 2, type: StructureType.String, title: 'Height', value: '972'})
        blockAddItem(this.model, 'color', {id: 3, type: StructureType.Color, title: 'Background Color', value: '#000'})
        blockAddItem(this.model, 'title', {
            id: 4,
            type: StructureType.Text,
            title: 'Title',
            value: 'FREQUENTLY ASKED QUESTIONS'
        })
        this.model = {...this.model}
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
