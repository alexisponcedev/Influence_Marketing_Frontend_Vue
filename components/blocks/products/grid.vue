<template>
    <div class="tw-flex tw-w-full tw-flex-1" v-if="!isEmpty">

        <div class="filter-box">
            <div v-if="loadingFilters"
                 class="tw-h-96 tw-w-full tw-text-cyan-500 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center">
                Loading filters ...
                <v-progress-linear class="tw-mt-2" indeterminate color="cyan"/>
            </div>
            <div v-else class="group" v-for="(group , index) in filterTypes" :key="`filter${index}`">
                <div class="title">{{ group.name }}</div>
                <ul class="tw-list-none">

                    <li class="filter tw-flex tw-items-center tw-space-x-2" v-for="filter in group.filters "
                        :key="filter.id">
                        <div class="checkbox"/>
                        <div class="option tw-flex-1">{{ filter.name }}</div>
                        <div class="count">3</div>
                    </li>
                </ul>
                <hr class="separator"/>
            </div>
        </div>

        <div style="background-color: #FAFAFA" class="tw-w-full">
            <div class="total-result">
                <span class="total-result-title">Total Result : {{ products.total }}</span>
                <span class="total-result-link">View All</span>
            </div>
            <div v-if="loadingProducts"
                 class="tw-h-60 tw-w-full tw-text-cyan-500 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center">
                Loading Products ...
                <v-progress-linear class="tw-mt-2 tw-max-w-sm" indeterminate color="cyan"/>
            </div>
            <div v-else class="tw-grid tw-grid-cols-3">

                <blocks-products-item v-for="(product , i) in products" :key="`product${i}`" :value="product"
                                      :class="{'gray-box' : i % 2 === 0}"/>
            </div>
        </div>

    </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Api} from "~/utils/store-accessor";
import {CategoryResource} from "~/repositories";

@Component
export default class ProductGrid extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    Api = Api;

    categories: Array<any> = [];
    loadingFilters: Boolean = false;
    loadingProducts: Boolean = false;

    products: Array<any> = [];
    filterTypes: Array<any> = [];

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                category: {
                    id: 0,
                    type: StructureType.Select,
                    title: 'Select Category',
                    value: this.categories.length > 0 ? this.categories[0].id : 0,
                    itemText: 'name',
                    itemValue: 'id',
                    items: this.categories
                },
            }
    }

    async mounted() {
        this.categories = (await this.$axios.$get(process.env.PIM_API_URL + '/cms/getCategories')).data
        if (this.isEmpty) this.reset();
        else {
            this.model.category.items = this.categories;
        }

        this.updatePreview();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }


    updatePreview(category_id: number = 0) {
        if (category_id === 0 && this.model.hasOwnProperty('category') && this.model.category.value > 0)
            category_id = this.model.category.value;

        this.loadingFilters = true;
        this.loadingProducts = true;
        this.$axios.$get(process.env.PIM_API_URL + '/cms/getProducts/' + category_id)
            .then(res => {
                this.products = res.data;
                this.loadingProducts = false;
            }).catch(err => {
            console.log(err);
            this.loadingProducts = false;
        })

        this.$axios.$get(process.env.PIM_API_URL + '/cms/getCategoryFilterTypes/' + category_id)
            .then(res => {
                this.loadingFilters = false;
                this.filterTypes = res.filterTypes;
            }).catch(err => {
            console.log(err);
            this.loadingFilters = false
        });
    }

    get categoryId() {
        return !this.isEmpty ? this.model.category.value : 0;
    }

    @Watch('categoryId', {immediate: false, deep: true})
    onCategoryIdChanged() {
        this.updatePreview(this.categoryId);
    }

    addItem(name: string, item: any) {
        if (!this.model.hasOwnProperty(name)) this.model[name] = item;
        else if (this.model[name].type !== item.type) {
            this.model[name].type = item.type;
            if (item.type === StructureType.Image) {
                this.model[name].src = '';
                this.model[name].alt = 'Image Alt';
            } else if (item.type === StructureType.Select) {
                this.model[name].src = '';
                this.model[name].alt = 'Image Alt';

                // itemText: 'name',
                //     itemValue: 'id',
                //     items: this.categories
            }

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
            font-family: 'hisense', serif;
            font-style: normal;
            font-weight: bold;
            font-size: 16px !important;
            line-height: 24px;
            color: #5A5B75;
            margin-bottom: 24px;
        }

        ul {
            padding-left: 0 !important;

            .filter {
                margin-bottom: 6px;

                .checkbox {
                    width: 13px;
                    height: 13px;
                    border: 1px solid #5A5B75;
                    border-radius: 2px;
                }

                .option {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 16px;
                    color: #5A5B75;
                }
            }
        }

        .separator {
            margin: 24px 0;
        }
    }
}

.gray-box {
    background-color: #F1F1F2;
}

.total-result {
    font-family: 'hisense', serif;
    background: #DCECF0;
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
        font-family: 'hisense', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 27px;
        text-decoration-line: underline;
        color: #00AAA6;
        margin-left: 8px
    }
}
</style>
