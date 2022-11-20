<template>
    <div class="">
        <v-text-field
            v-model="search"
            @keyup="searchWithDebounceTime"
            label="Search Products"
            placeholder="please enter product name or model ..."
            clearable
        />
        <div v-if="search || alwaysShow">
            <div v-if="loading">
                <slot name="placeholder">
                    <div class="tw-grid tw-grid-cols-4 tw-gap-2">
                        <search-products-item :placeholder="true" v-for="i in 12" :key="i"/>
                    </div>
                </slot>
            </div>

            <div v-else>
                <slot :products="productsList">
                    <div class="tw-grid tw-grid-cols-4 tw-gap-2">
                        <search-products-item v-for="product in productsList" :key="product.id" :value="product"
                                              @select="addProduct"/>
                    </div>
                </slot>
            </div>

        </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component, VModel, Watch, Prop} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";
import {ProductSearchStatusEnum} from "~/interfaces/ProductStatusEnum";


@Component
export default class SearchProductIndex extends Vue {
    @Prop({type: Number}) category_id!: number
    @Prop({type: Number, default: 9}) max!: number
    @Prop({type: Boolean, default: false}) alwaysShow!: boolean
    @Prop({type: Boolean, default: false}) initLoad!: boolean
    @Prop({type: String, default: ProductSearchStatusEnum.all}) status!: ProductSearchStatusEnum

    @Prop(Function) run!: Function

    @VModel({type: Array}) model!: any


    Api = Api;

    loading: boolean = false;

    pages: Array<any> = [];

    search = '';
    products = [];


    mounted() {
        if (this.initLoad) this.searchProduct();
    }

    _timer: any = null;

    searchWithDebounceTime() {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            this.searchProduct();
        }, 700);
    }


    searchProduct() {
        this.loading = true;
        let query = [`search=${this.search}`];
        if (this.category_id > 0) query.push(`category_id=${this.category_id}`)
        this.$axios.$get(`https://impim.dev-api.hisenseportal.com/api/cms/getProductsList?${query.join('&')}`)
            .then(res => {
                let products = this.max > 0 ? res.data.slice(0, this.max) : res.data;
                products = products.filter((p: any) => p.brand.id === 1)
                if (this.run) products = this.run(products);
                this.products = products;
            })
            .finally(() => {
                this.loading = false;
            });
    }

    reRun() {
        if (this.run) this.products = this.run(this.products);
    }


    get productsList() {
        let products = [];
        switch (this.status) {
            case ProductSearchStatusEnum.all :
                products = this.products;
                break;
            case ProductSearchStatusEnum.active :
                products = this.products
                    .filter((product: any) => {
                        return product.hasOwnProperty('page') && product.page
                    });
                break;
            case ProductSearchStatusEnum.inactive :
                products = this.products
                    .filter((product: any) => {
                        return !product.hasOwnProperty('page') || !product.page
                    });
                break;
        }
        return products;
    }

    @Watch('category_id')
    onCategoryIdChanged() {
        this.searchProduct()
    }

    addProduct(product: Object) {
        this.$emit('addProduct', product);
    }

}
</script>

