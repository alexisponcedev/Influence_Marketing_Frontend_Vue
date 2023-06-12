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
                    <div :class="gridClass">
                        <search-products-item
                            :placeholder="true"
                            v-for="i in max > 0 ? max : 12"
                            :key="i"
                        />
                    </div>
                </slot>
            </div>

            <div v-else>
                <slot :products="productsList">
                    <div :class="gridClass">
                        <search-products-item
                            v-for="product in productsList"
                            :key="product.id"
                            :value="product"
                            @select="addProduct"
                        />
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, VModel, Vue, Watch } from "vue-property-decorator";
import { Api } from "~/utils/store-accessor";
import { ProductSearchStatusEnum } from "~/interfaces/ProductStatusEnum";
import getActiveBrand from "~/utils/getActiveBrand";

@Component
export default class SearchProductIndex extends Vue {
    @Prop({ type: Number }) category_id!: number;
    @Prop({ type: Number, default: 9 }) max!: number;
    @Prop({ type: Boolean, default: false }) alwaysShow!: boolean;
    @Prop({ type: Boolean, default: false }) initLoad!: boolean;
    @Prop({ type: String, default: ProductSearchStatusEnum.all })
    status!: ProductSearchStatusEnum;
    @Prop({ type: String, default: "tw-grid tw-grid-cols-4 tw-gap-2" })
    gridClass!: string;

    @Prop(Function) run!: Function;
    @Prop(Function) activeFunc!: Function;
    @Prop(Function) inactiveFunc!: Function;

    @VModel({ type: Array }) model!: any;

    Api = Api;

    loading: boolean = false;

    // pages: Array<any> = [];

    search = "";
    products: Array<any> = [];

    mounted() {
        this.loadPages();
        if (this.initLoad) this.searchProduct();
    }

    async loadPages() {
        if (!Api.Page.dynamicPages.length) await Api.Page.getDynamicPages();
    }

    _timer: any = null;

    searchWithDebounceTime() {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            this.searchProduct();
        }, 700);
    }

    appendPageData(products: Array<any>) {
        return products.map((product) => ({
            ...product,
            page: Api.Page.dynamicPages.find(
                (i) => i.model_id === product.id && i.model_type === "product"
            ),
            support: Api.Page.dynamicPages.find(
                (i) => i.model_id === product.id && i.model_type === "support"
            ),
        }));
    }

    searchProduct() {
        this.loading = true;
        let query = [
            `search=${this.search}`,
            "status[]=1",
            "status[]=2",
            "status[]=3",
            "status[]=7",
        ];
        if (this.category_id > 0) query.push(`category_id=${this.category_id}`);
        this.$axios
            .$get(
                process.env.PIM_API_URL +
                    `/cms/getProductsList?brand_id=${getActiveBrand()}&${query.join(
                        "&"
                    )}`
            )
            .then((res) => {
                let products =
                    this.max > 0 ? res.data.slice(0, this.max) : res.data;
                // this.products = this.run ? this.run(products) : products;
                this.products = this.appendPageData(products);
            })
            .finally(() => {
                this.loading = false;
            });
    }

    // reRun() {
    //     if (this.run) this.products = this.run(this.products);
    // }

    get productsList() {
        let products = [];
        switch (this.status) {
            case ProductSearchStatusEnum.all:
                products = this.products;
                break;
            case ProductSearchStatusEnum.hasPage:
                products = this.products.filter(
                    (product: any) => product?.page
                );
                break;
            case ProductSearchStatusEnum.hasNoPage:
                products = this.products.filter(
                    (product: any) => !product?.page
                );
                break;
            case ProductSearchStatusEnum.hasSupport:
                products = this.products.filter(
                    (product: any) => product?.support
                );
                break;
            case ProductSearchStatusEnum.hasNoSupport:
                products = this.products.filter(
                    (product: any) => !product?.support
                );
                break;
            case ProductSearchStatusEnum.hasAll:
                products = this.products.filter(
                    (product: any) => product?.page && product?.support
                );
                break;
        }
        return products;
    }

    @Watch("category_id")
    onCategoryIdChanged() {
        this.searchProduct();
    }

    addProduct(product: Object) {
        this.$emit("addProduct", product);
    }
}
</script>
