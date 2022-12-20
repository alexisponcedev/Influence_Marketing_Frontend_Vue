<template>
    <div>
        <img src="/blocks/ProductWhereToBuy.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlockProductWhereToBuy extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

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
                { title: "Light", value: this.Theme.light },
                { title: "Dark", value: this.Theme.dark },
            ],
        });
        blockAddItem(this.model, 'title', {
            id: 1,
            type: StructureType.String,
            title: 'title',
            value: "Ready to buy?"
        });
        blockAddItem(this.model, 'littleTitle', {
            id: 1,
            type: StructureType.String,
            title: 'little Title',
            value: "See where you can order"
        });
        blockAddItem(this.model, 'whereToBuy', {
            id: 1,
            type: StructureType.Select,
            title: 'Where To Buy',
            value: true,
            items: [
                { title: 'True', value: true },
                { title: 'False', value: false },
            ]
        });

        this.model = { ... this.model };

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

}
</script>

<style type="text/css">

</style>
