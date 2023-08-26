<template>
    <div class="tw-p-3" v-if="!isEmpty">
        <h6>Google Tv Products</h6>
        <div
            class="tw-mt-1 tw-flex tw-items-center tw-space-x-2"
            v-if="correctPage || true"
        >
            <div class="tw-w-28">Items :</div>
            <div class="tw-flex-1">
                <div
                    class="tw-h-40 tw-p-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-overflow-y-auto"
                >
                    <div
                        v-for="item in getList"
                        :key="id"
                        @click="addItem(item)"
                        class="tw-flex tw-items-center tw-space-x-2 tw-py-0.5 tw-transition hover:tw-bg-gray-50 hover:tw-text-blue-500"
                    >
                        <div class="tw-h-10 tw-w-10 tw-text-center">
                            <img
                                v-if="item.image"
                                :src="item.image"
                                class="tw-max-h-full tw-object-cover"
                                alt="product image"
                            />
                            <div
                                v-else
                                class="tw-bg-gray-50 tw-w-full tw-h-full tw-rounded-lg"
                            />
                        </div>
                        <div
                            class="tw-line-clamp-1 tw-flex-1"
                            :title="item.name"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="tw-font-xs">
                    total items :
                    <strong>
                        {{
                            model.list.value.serverData.length -
                            model.list.value.items.length
                        }}
                    </strong>
                </div>
            </div>

            <div class="tw-space-y-2">
                <div>
                    <v-icon small>mdi-arrow-left</v-icon>
                </div>
                <div>
                    <v-icon small>mdi-arrow-right</v-icon>
                </div>
            </div>
            <div class="tw-flex-1">
                <div
                    class="tw-h-40 tw-p-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-overflow-y-auto"
                >
                    <div
                        v-for="(item, index) in model.list.value.items"
                        :key="id"
                        @click="model.list.value.items.splice(index, 1)"
                        class="tw-flex tw-items-center tw-space-x-2 tw-py-0.5 tw-transition hover:tw-bg-gray-50 hover:tw-text-blue-500"
                    >
                        <div class="tw-h-10 tw-w-10 tw-text-center">
                            <img
                                v-if="item.image"
                                :src="item.image"
                                class="tw-max-h-full tw-object-cover"
                                alt="product image"
                            />
                            <div
                                v-else
                                class="tw-bg-gray-50 tw-w-full tw-h-full tw-rounded-lg"
                            />
                        </div>
                        <div
                            class="tw-line-clamp-1 tw-flex-1"
                            :title="item.name"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="tw-font-xs">
                    selected items :
                    <strong>{{ model.list.value.items.length }}</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import getActiveBrand from "~/utils/getActiveBrand";
import blockAddItem from "~/utils/blockAddItem";

enum ProductCollectionType {
    Series = "series",
    Products = "products",
}

@Component
export default class ProductPackagesSlider extends Vue {
    @Prop({
        type: Object,
        default: () => {},
    })
    page!: any;
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    category_id: number = 3;

    async mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "link", {
            id: 2,
            type: StructureType.Url,
            target: "_self",
            title: "Link",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 0,
            title: "Related Items List",
            type: StructureType.Null,
            value: {
                type: ProductCollectionType.Series,
                serverData: [],
                items: [],
            },
        });
        // if (this.page.model_type === 'product') {
        // await this.getCategoryId();
        await this.getItems();
        // }

        this.model = { ...this.model }; //to enable reactivity;
    }

    // async getCategoryId() {
    // try {
    //     let product = (await this.$axios.$get(process.env.PIM_API_URL + '/cms/getProduct/' + this.page.model_id)).data
    //     this.category_id = product && product.hasOwnProperty('Category') ? product.Category.id : 0;
    // } catch (e) {
    //     console.log(e);
    // }
    // }

    async getItems() {
        if (this.category_id > 0) {
            let res: any = await this.$axios.$get(
                process.env.PIM_API_URL +
                    "/cms/categorySeries/" +
                    this.category_id +
                    "?brand_id=" +
                    getActiveBrand()
            );
            if (res.hasOwnProperty("series")) {
                this.model.list.value.type = ProductCollectionType.Series;
                this.model.list.value.serverData = res.series.map((j: any) => {
                    return { id: j.id, name: j.name, image: null };
                });
            } else {
                this.model.list.value.type = ProductCollectionType.Products;
                this.model.list.value.serverData = res.data
                    .map((i: any) => i.products.product)
                    .map((j: any) => {
                        return {
                            id: j.id,
                            name: j.name,
                            image: j.media ? j.media.url : null,
                        };
                    });
            }
        }
    }

    get getList() {
        return this.model &&
            this.model.list &&
            this.model.list.value &&
            this.model.list.value.serverData &&
            this.category_id > 0
            ? this.model.list.value.serverData
                  .filter(
                      (i: any) =>
                          this.model.list.value.items.length === 0 ||
                          !this.model.list.value.items
                              .map((j: any) => j.id)
                              .includes(i.id)
                  )
                  .sort((a: any, b: any) =>
                      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                  )
            : [];
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    get correctPage(): Boolean {
        return (
            this.page &&
            this.page.model_id > 0 &&
            this.page.model_type === "product"
        );
    }

    addItem(item: any) {
        this.model.list.value.items.push(item);
    }
}
</script>
<style scoped>
.items-list li.group {
    border-bottom: 1px solid #ededed;
    padding: 8px 0;
}

.x-input {
    border: 1px solid #cdcdcd;
    border-radius: 3px;
    padding: 2px 5px;
}
</style>
