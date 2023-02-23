<template>
    <v-dialog v-model="dialog" width="800" scrollable content-class="dialog-box">
        <v-card class="ma-0 pa-5">
            <v-container>
                <p class="tw-text-base tw-text-[#212121]">
                    Want to duplicate current page <span class="tw-font-semibold">{{ page.title }} </span>?
                </p>

                <form-field-text :max="60" :field="formFields[0]" v-model="title"/>

                <form-field-select-page-route :field="formFields[1]" v-model="route"/>

                <div v-if="selectProduct" class="tw-min-h-96">
                    <div v-if="product"
                         class='tw-flex tw-items-center tw-space-x-3 tw-border tw-border-solid tw-border-gray-200 tw-rounded-xl tw-p-1.5 hover:tw-bg-gray-100 tw-cursor-pointer'
                         :title="product.name">

                        <img :src="product.image" alt="image address" class="tw-h-14 tw-max-w-52 tw-object-cover "/>

                        <div>
                            <div class="product-detail tw-line-clamp-1">{{ product.name }}</div>
                            <div class="tw-gray-700 tw-flex tw-justify-between">
                                <span>{{ product.model }}</span>
                                <span class="tw-text-cyan-500" v-if="product.isNew || true">New</span>
                            </div>
                        </div>

                    </div>

                    <search-products
                        :status="searchStatus"
                        :max="6"
                        grid-class="tw-grid tw-grid-cols-2 tw-gap-2"
                        @addProduct="addProduct"
                        class="tw-mt-3"/>
                </div>

                <v-btn
                    class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
                    color=""  :disabled="disabled" :loading="Api.Page.loading" @click.prevent="duplicatePage">
                    Create Page
                </v-btn>

            </v-container>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {PageResource} from "~/repositories";
import {Api} from "~/store";
import {ProductSearchStatusEnum} from "~/interfaces/ProductStatusEnum";

@Component
export default class PageDuplicateDialog extends Vue {
    // @Prop(Object) readonly page!: any;

    dialog: boolean = false;
    page: PageResource = {};
    Api = Api;

    title: string = '';
    route: string = '';
    product: any = null;
    // product_id: number | null = null;

    get disabled(){
        return this.title === '' || this.route === '' || (this.selectProduct ? !this.product : false)
    }
    get searchStatus(){
        if(this.page.model_type === 'product') return ProductSearchStatusEnum.hasPage;
        if(this.page.model_type === 'support') return ProductSearchStatusEnum.hasSupport;
        return ProductSearchStatusEnum.all;
    }
    formFields: Array<any> = [
        {
            type: "form-field-text",
            label: "Page Title",
            modelKey: "title",
            placeholder: 'please enter page title',
            rules: [],
            colAttrs: {cols: 12},
        },
        {
            type: "form-field-select-page-route",
            label: "Page URL",
            modelKey: "route",
            rules: [],
            colAttrs: {cols: 12},
        },
    ]

    open(page: any) {
        this.page = page;
        this.title = page.title + '-duplicated'
        this.route = page.route + '-duplicated';
        this.product = null;
        this.dialog = true;
    }

    close() {
        this.dialog = false;
    }

    get selectProduct() {
        return ['product', 'support'].includes(this.page.model_type!)
    }

    async duplicatePage(Page: PageResource) {
        let page = await Api.Page.duplicatePage({
            page_id: +this.page.id!,
            title: this.title,
            route: this.route,
            product_id: +this.product?.id!
        })
        await Api.Page.doDeploy();
        this.$emit('created')
        this.close();
        this.$router.push('/page/edit/' + page.id)
    }

    addProduct(product: any) {
        this.product = product;
    }

    // appendPageData(products: Array<any>) {
    //     return products.map((product) => ({...product, page: Api.Page.all.find(i => i.model_id === product.id && )}));
    // }
}
</script>
