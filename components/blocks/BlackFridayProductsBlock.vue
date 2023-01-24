<template>
    <div class="pa-12">
<!--        <img src="/blocks/BlackFridayProductsBlock.png" alt=""/>-->
        <div class="products-container tw-space-y-2">
            <div v-for="(product , index) in model.list.value" :key="index">
                <div class="tw-flex tw-items-center tw-justify-between tw-bg-gray-50 tw-rounded-xl tw-p-2">
                    <div class="tw-w-56">
                        <img :src="product.image" alt="product image" class="tw-object-cover tw-h-16 tw-rounded-lg">
                    </div>
                    <div class="tw-flex-1">
                        <div class="tw-text-gray-600">{{ product.title }}</div>
                        <div class="tw-text-gray-600">{{ product.model }}</div>
                    </div>
                    <div class="tw-flex-1 tw-flex tw-items-center">
                        <form-field-text :field="{ label: 'Price', placeholder: 'enter price', rules: [], colAttrs: {cols: 4}}" v-model="product.price"/>
                        <form-field-text :field="{ label: 'Discount', placeholder: 'enter discount', rules: [], colAttrs: {cols: 4}}" v-model="product.discount"/>
                    </div>
                    <div class="tw-w-40">
                        <div class="tw-font-bold tw-text-md">$ {{(product.price - (product.price * product.discount / 100)  ) }}</div>
                    </div>
                    <div class="tw-flex tw-items-center tw-space-x-4">
                        <button @click="remove(index)">
                            <v-icon small class="red--text">mdi-delete</v-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <search-products @addProduct="addProduct" class=""/>

    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlackFridayProductsBlock extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    products  : Array<any> = []

    addProduct(product : any){
        this.model.list.value.push({
            id : product.id,
            model : product.model,
            image : product.image,
            title : product.name,
            price : 0,
            discount : 0,
        });
    }
    remove(index: number) {
        this.model.list.value.splice(index, 1);
    }
    mounted() {
        blockAddItem(this.model, 'title', {id: 0, type: StructureType.SimpleText, title: 'Title', value: ''})
        blockAddItem(this.model, 'list', {
            id: 1, type: StructureType.List, title: 'List', newItem: {},
            value: [
            ]
        });
        blockAddItem(this.model, 'text', {id: 2, type: StructureType.SimpleText, title: 'Bottom Text', value: ''})


        this.model = {... this.model}
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
