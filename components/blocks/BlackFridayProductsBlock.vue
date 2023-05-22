<template>
    <div class="pa-12" v-if="!isEmpty">
        <!--        <img src="/blocks/BlackFridayProductsBlock.png" alt=""/>-->
        <div class="products-container tw-space-y-2">
            <draggable
                v-model="model.list.value"
                group="product-list-black-friday"
            >
                <div v-for="(product, index) in model.list.value" :key="index">
                    <div
                        class="tw-flex tw-items-center tw-justify-between tw-bg-gray-50 tw-rounded-xl tw-p-2"
                    >
                        <div class="tw-w-36">
                            <img
                                :src="product.image"
                                alt="product image"
                                class="tw-object-cover tw-h-16 tw-rounded-lg"
                            />
                        </div>
                        <div class="tw-flex-1">
                            <div
                                class="tw-flex tw-items-center"
                                v-for="(serie, index) in product.series"
                            >
                                <div
                                    class="tw-text-gray-600 tw-w-52 tw-text-right"
                                >
                                    {{ serie.title }}
                                </div>
                                <form-field-text
                                    class=""
                                    :field="{
                                        label: 'Title ' + (index + 1),
                                        placeholder: '',
                                        rules: [],
                                        colAttrs: { cols: 2 },
                                    }"
                                    v-model="serie.header"
                                />

                                <form-field-text
                                    class=""
                                    :field="{
                                        label: 'Price $',
                                        placeholder: 'enter price',
                                        rules: [],
                                        colAttrs: { cols: 2 },
                                    }"
                                    v-model="serie.price"
                                />
                                <form-field-text
                                    @input="
                                        serie.final_price =
                                            serie.price -
                                            (serie.price * serie.discount) / 100
                                    "
                                    :field="{
                                        label: 'Discount %',
                                        placeholder: 'enter discount',
                                        rules: [],
                                        colAttrs: { cols: 2 },
                                    }"
                                    v-model="serie.discount"
                                />

                                <form-field-text
                                    :field="{
                                        label: 'Final Price $',
                                        placeholder: 'enter FinalPrice',
                                        rules: [],
                                        colAttrs: { cols: 2 },
                                    }"
                                    v-model="serie.final_price"
                                />
                                <form-field-select
                                    :multiple="true"
                                    class=""
                                    :field="{
                                        label: 'Retailers',
                                        placeholder: 'includes retailers',
                                        rules: [],
                                        colAttrs: {
                                            cols: 2,
                                        },
                                        items: serie.retailers,
                                        'item-text': 'name',
                                        'item-value': 'id',
                                    }"
                                    v-model="serie.selected_retailers"
                                />
                                <!--                            <div class="tw-font-bold tw-text-md">$-->
                                <!--                                {{ (serie.price - (serie.price * serie.discount / 100)) }}-->
                                <!--                            </div>-->
                            </div>
                        </div>
                        <div class="tw-flex tw-items-center tw-space-x-4">
                            <button @click="remove(index)">
                                <v-icon small class="red--text"
                                >mdi-delete
                                </v-icon
                                >
                            </button>
                        </div>
                    </div>
                </div>
            </draggable>
        </div>
        <search-products @addProduct="addProduct" class=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import getActiveBrand from "~/utils/getActiveBrand";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class BlackFridayProductsBlock extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({default: true}) readonly editable: boolean | undefined;
    @VModel({type: Object}) model!: any;

    products: Array<any> = [];

    addProduct(product: any) {
        this.model.list.value.push({
            id: product.id,
            model: product.model,
            image: product.image,
            // title: '', //product.name,
            series:
                product.productSeries.length > 0
                    ? product.productSeries[0].values.map((i: any) => {
                        return {
                            header: "",
                            title: i.title,
                            id: i.products[0],
                            price: 0,
                            discount: 0,
                            final_price: 0,
                            selected_retailers: [],
                            retailers: product.retailers,
                        };
                    })
                    : [
                        {
                            header: product.name,
                            title: product.name,
                            id: product.id,
                            price: 0,
                            discount: 0,
                            final_price: 0,
                            selected_retailers: [],
                            retailers: product.retailers,

                        },
                    ],
            price: 0,
            discount: 0,
            // retailers: product.retailers,
        });
    }

    remove(index: number) {
        this.model.list.value.splice(index, 1);
    }

    mounted() {
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.Null,
            title: "List",
            newItem: {},
            value: [],
        });
        blockAddItem(this.model, "text", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Bottom Text",
            value: "",
        });
        blockRemoveItem(this.model, ["title"]);
        this.loadRetailers();

        this.model = {...this.model};
    }

    loadRetailers() {
        this.model.list.value.forEach((item: any) => {
            item.series.forEach((serie: any) => {
                this.getProductInfo(serie.id)
                    .then((res: any) => serie.retailers = res.data.retailers)
                    .catch(err => console.log(err));
            })
        });
    }

    async getProductInfo(productId: number) {
        return this.$axios.$get(process.env.PIM_API_URL + `/cms/getProduct/${productId}`);
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
