<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-tabs
                    show-arrows
                    v-model="tab"
                    background-color="transparent"
                >
                    <!--          <v-tab :href="`#${ProductSearchStatus.all}`">All Products</v-tab>-->
                    <v-tab
                        :href="`#${ProductSearchStatus.hasPage}`"
                        class="tw-w-full"
                        >Active Products</v-tab
                    >
                    <v-tab
                        :href="`#${ProductSearchStatus.hasNoPage}`"
                        class="tw-w-full"
                        >Inactive Products</v-tab
                    >
                </v-tabs>
            </v-col>
        </v-row>

        <div class="tw-flex tw-space-x-2 tw-mb-3">
            <div
                class="category tw-py-1.5 tw-px-2 tw-border tw-border-solid tw-border-gray-300 tw-text-gray-400 tw-rounded-xl tw-text-center tw-bg-gray-50 tw-bg-opacity-30 hover:tw-bg-gray-50 tw-cursor-pointer tw-uppercase tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2"
                v-for="category in categories"
                :key="category.id"
                @click="selectCategory(category)"
                :class="{ selected: selectedCategory.id === category.id }"
            >
                <img
                    v-if="category.image"
                    :src="category.image"
                    alt="category image"
                    class="tw-h-10"
                />
                <div>{{ category.name }}</div>
            </div>
        </div>

        <v-card>
            <v-card-text>
                <div
                    v-if="categories.length === 0"
                    class="tw-my-32 tw-text-center tw-flex tw-flex-col tw-justify-center tw-items-center tw-space-y-4"
                >
                    <div>Loading Categories</div>
                    <v-progress-circular
                        indeterminate
                        color="blue"
                    ></v-progress-circular>
                </div>
                <div v-else>
                    <search-products
                        ref="searchProducts"
                        :max="-1"
                        :status="tab"
                        :initLoad="true"
                        :always-show="true"
                        :category_id="selectedCategory.id"
                        v-model="search"
                    >
                        <template #placeholder>
                            <div class="tw-grid tw-grid-cols-6 tw-gap-2">
                                <div
                                    v-for="i in 14"
                                    :key="i"
                                    class="tw-p-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-xl tw-flex tw-flex-col tw-justify-center tw-space-y-3.5"
                                >
                                    <div
                                        class="tw-bg-gray-50 tw-h-36 tw-w-full tw-object-cover tw-rounded-xl"
                                    />
                                    <div
                                        class="tw-bg-gray-100 tw-rounded-xl tw-h-4 tw-bg-gray-100"
                                    />
                                    <div
                                        class="tw-gray-700 tw-flex tw-justify-between"
                                    >
                                        <div
                                            class="tw-bg-gray-100 tw-rounded-xl tw-h-4 tw-w-20"
                                        />
                                        <div
                                            class="tw-bg-gray-100 tw-rounded-xl tw-h-4 tw-w-20"
                                        />
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template #default="{ products }">
                            <div
                                class="tw-grid tw-grid-cols-5 3xl:tw-grid-cols-6 tw-gap-2"
                            >
                                <div
                                    v-for="product in products"
                                    :key="product.id"
                                    class="tw-p-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-xl tw-flex tw-flex-col tw-justify-center tw-space-y-2"
                                >
                                    <div
                                        class="tw-h-40 tw-w-full tw-flex tw-items-center tw-justify-center"
                                    >
                                        <img
                                            :src="product.image"
                                            alt=""
                                            style="min-height: 110px"
                                            class="tw-object-cover tw-max-h-full"
                                        />
                                    </div>

                                    <div
                                        class="tw-font-semibold tw-line-clamp-1 tw-text-center"
                                        :title="product.name"
                                    >
                                        {{ product.name }}
                                    </div>

                                    <div
                                        class="tw-flex tw-items-center tw-justify-between tw-space-x-2"
                                        style="min-height: 32px"
                                    >
                                        <div>{{ product.model }}</div>

                                        <div v-if="product.page">
                                            <nuxt-link
                                                :to="`/page/edit/${product.page.id}`"
                                                class="tw-bg-blue-500 tw-text-white white--text tw-rounded-lg hover:tw-bg-blue-600 tw-px-1 tw-py-2"
                                            >
                                                Open
                                            </nuxt-link>
                                        </div>
                                        <div
                                            v-else
                                            class="tw-rounded"
                                            style="min-width: 50px"
                                        >
                                            <v-progress-linear
                                                v-if="addingPage === product.id"
                                                indeterminate
                                                color="cyan"
                                            />
                                            <button
                                                v-else
                                                @click="addNewPage(product)"
                                                class="tw-text-gray-600 tw-border tw-border-solid tw-border-gray-400 tw-rounded-lg tw-whitespace-nowrap hover:tw-text-gray-700 hover:tw-bg-gray-100 tw-px-1 tw-py-1"
                                            >
                                                Add Page
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </search-products>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ProductSearchStatusEnum } from "@/interfaces/ProductStatusEnum";
import getActiveBrand from "@/utils/getActiveBrand";
import { PageResource } from "@/repositories";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class ProductsPage extends Vue {
    Api = Api;

    tab = "";

    search: string = "";

    ProductSearchStatus = ProductSearchStatusEnum;

    addingPage: Number = 0;

    categories: Array<any> = [];

    selectedCategory: any = { id: null, name: "" };

    mounted() {
        this.init();
    }

    init() {
        this.loadCategories();
    }

    loadCategories() {
        this.$axios
            .$get(
                process.env.PIM_API_URL +
                    `/cms/getCategories?brand_id=${getActiveBrand()}`
            )
            .then((res) => {
                this.categories = [
                    { id: null, name: "All Categories", image: null },
                    // ...res.data.filter((i: any) => i.id < 7)
                    ...res.data,
                ];
            });
    }

    selectCategory(category: any) {
        this.selectedCategory = category;
        this.tab = this.ProductSearchStatus.all;
    }

    async addNewPage(product: any) {
        this.addingPage = product.id;
        let productPage = (await Api.Page.createPDP({
            product,
            type: "product",
            route: "/products",
            slug: "",
            status_id: product.status.id,
        })) as PageResource;
        if (productPage) {
            await Api.Page.createPDP({
                product,
                type: "support",
                route: "/support",
                slug: "",
                status_id: product.status.id,
            });
            this.$router.push(`Page/Edit/${productPage.id}`);
        } else this.addingPage = 0;
    }
}
</script>

<style scoped>
.selected {
    font-weight: bold;
    background-color: white;
    border: 1px solid #252525 !important;
    color: black;
}
</style>
