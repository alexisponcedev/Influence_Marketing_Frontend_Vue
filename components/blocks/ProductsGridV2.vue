<template>
    <div>
        <img src="/blocks/ProductsGridV2.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Api } from "~/utils/store-accessor";
import { CategoryResource } from "~/repositories";
import getActiveBrand from "~/utils/getActiveBrand";

@Component
export default class ProductsGridV2 extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Api = Api;

    categories: Array<any> = [];
    loadingFilters: Boolean = false;
    loadingProducts: Boolean = false;

    products: Array<any> = [];
    filterTypes: Array<any> = [];

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...{
                    title: {
                        id: 0,
                        type: StructureType.Text,
                        title: "Title",
                        value: "<h2>All Televisions</h2>",
                    },

                    category: {
                        id: 0,
                        type: StructureType.Select,
                        title: "Select Category",
                        value:
                            this.categories.length > 0
                                ? this.categories[0].id
                                : 0,
                        itemText: "name",
                        itemValue: "id",
                        items: this.categories,
                    },
                    availabilityNumber: {
                        id: 1,
                        type: StructureType.Select,
                        title: "Show availability number",
                        value: false,
                        items: [
                            { title: "Show", value: true },
                            { title: "Hide", value: false },
                        ],
                    },
                    // backgroundColor: {
                    //     id: 7,
                    //     type: StructureType.Color,
                    //     title: "Background color",
                    //     value: "#fff",
                    // },
                },
                ...oldValue,
            };
        } else
            this.model = {
                title: {
                    id: 0,
                    type: StructureType.Text,
                    title: "Title",
                    value: "<h2>All Televisions</h2>",
                },

                category: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Select Category",
                    value:
                        this.categories.length > 0 ? this.categories[0].id : 0,
                    itemText: "name",
                    itemValue: "id",
                    items: this.categories,
                },
                availabilityNumber: {
                    id: 1,
                    type: StructureType.Select,
                    title: "Show availability number",
                    value: false,
                    items: [
                        { title: "Show", value: true },
                        { title: "Hide", value: false },
                    ],
                },
            };
    }

    async mounted() {
        this.categories = (
            await this.$axios.$get(
                process.env.PIM_API_URL +
                    "/cms/getCategories?brand_id=" +
                    getActiveBrand()
            )
        ).data;
        if (this.isEmpty) this.reset();
        else {
            this.reset(this.model);
            this.model.category.items = this.categories;
        }
        this.updatePreview();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    updatePreview(category_id: number = 0) {
        if (
            category_id === 0 &&
            this.model.hasOwnProperty("category") &&
            this.model.category.value > 0
        )
            category_id = this.model.category.value;

        this.loadingFilters = true;
        this.loadingProducts = true;
        this.$axios
            .$get(
                process.env.PIM_API_URL +
                    "/cms/getProducts/" +
                    category_id +
                    "?brand_id=" +
                    getActiveBrand()
            )
            .then((res) => {
                this.products = res.data;
                this.loadingProducts = false;
            })
            .catch((err) => {
                console.log(err);
                this.loadingProducts = false;
            });

        this.$axios
            .$get(
                process.env.PIM_API_URL +
                    "/cms/getCategoryFilterTypes/" +
                    category_id +
                    "?brand_id=" +
                    getActiveBrand()
            )
            .then((res) => {
                this.loadingFilters = false;
                this.filterTypes = res.filterTypes;
            })
            .catch((err) => {
                console.log(err);
                this.loadingFilters = false;
            });
    }

    get categoryId() {
        return !this.isEmpty ? this.model.category.value : 0;
    }

    @Watch("categoryId", { immediate: false, deep: true })
    onCategoryIdChanged() {
        this.updatePreview(this.categoryId);
    }

    addItem(name: string, item: any) {
        if (!this.model.hasOwnProperty(name)) this.model[name] = item;
        this.model[name].id = item.id;

        if (this.model[name].type !== item.type)
            this.model[name].type = item.type;
        if (item.type === StructureType.Image) {
            this.model[name].src = "";
            this.model[name].alt = "Image Alt";
        }
        if (item.type === StructureType.List) {
            this.model[name].newItem = item.newItem;
        }
        if (item.type === StructureType.Select) {
            this.model[name].items = item.items;
        }
    }
}
</script>

<style scoped lang="scss">
.filter-box {
    width: 232px;
    padding: 28px 16px;

    .group {
        .title {
            font-family: "hisense", serif;
            font-style: normal;
            font-weight: bold;
            font-size: 16px !important;
            line-height: 24px;
            color: #5a5b75;
            margin-bottom: 24px;
        }

        ul {
            padding-left: 0 !important;

            .filter {
                margin-bottom: 6px;

                .checkbox {
                    width: 13px;
                    height: 13px;
                    border: 1px solid #5a5b75;
                    border-radius: 2px;
                }

                .option {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 16px;
                    color: #5a5b75;
                }
            }
        }

        .separator {
            margin: 24px 0;
        }
    }
}

.gray-box {
    background-color: #f1f1f2;
}

.total-result {
    font-family: "hisense", serif;
    background: #dcecf0;
    border-radius: 16px;
    padding: 16px;
    margin: 16px 28px;

    &-title {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
        color: #565656;
    }

    &-link {
        font-family: "hisense", serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
        text-decoration-line: underline;
        color: #00aaa6;
        margin-left: 8px;
    }
}
</style>
