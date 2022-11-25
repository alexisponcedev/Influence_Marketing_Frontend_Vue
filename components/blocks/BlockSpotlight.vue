<template>
    <div class="tw-p-3" v-if="!isEmpty">

        <!--    <img src="/blocks/BlockSpotlight.png" alt=""/>-->

        <h5 class="tw-text-center">{{ model.title.value }}</h5>

        <ul class="tw-space-y-2 tw-list-none items-list">

            <li v-for="(tab , index) in model.tabs.value" :key="index" class="tw-space-y-2 group">

                <div class="tw-flex tw-items-center tw-space-x-2">
                    <div class="tw-w-28">Title :</div>
                    <input class="x-input tw-w-60" type="text" v-model="tab.title">
                    <button @click="removeTab(index)">
                        <v-icon small class="tw-p-1 tw-bg-gray-50 tw-rounded-lg">mdi-delete</v-icon>
                    </button>
                </div>

                <div class="tw-flex tw-items-center tw-space-x-2">
                    <div class="tw-w-28">Category :</div>
                    <select class="x-input tw-w-60" v-model="tab.category" @change="categoryChanged($event , index)">
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{
                                category.name
                            }}
                        </option>
                    </select>
                </div>

                <div class="tw-flex tw-items-center tw-space-x-2" v-if="tab.items">
                    <div class="tw-w-28">Items :</div>
                    <div class="tw-flex-1">
                        <div
                            class="tw-h-40 tw-p-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-overflow-y-auto">
                            <div v-for="item in getList(tab)" :key="id" @click="tab.items.push(item)"
                                 class="tw-flex tw-items-center tw-space-x-2 tw-py-0.5 tw-transition hover:tw-bg-gray-50 hover:tw-text-blue-500">
                                <div class="tw-h-10 tw-w-10 tw-text-center">
                                    <img v-if="item.image" :src="item.image" class="tw-max-h-full tw-object-cover"
                                         alt="product image"/>
                                    <div v-else class="tw-bg-gray-50 tw-w-full tw-h-full tw-rounded-lg"/>
                                </div>
                                <div class="tw-line-clamp-1 tw-flex-1" :title="item.name">{{ item.name }}</div>
                            </div>
                        </div>
                        <div class="tw-font-xs">total items : <strong>{{
                                tab.serverData.length - tab.items.length
                            }}</strong></div>
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
                            class="tw-h-40 tw-p-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-overflow-y-auto">
                            <div v-for="(item , index) in tab.items"
                                 :key="id" @click="tab.items.splice(index , 1)"
                                 class="tw-flex tw-items-center tw-space-x-2 tw-py-0.5 tw-transition hover:tw-bg-gray-50 hover:tw-text-blue-500">
                                <div class="tw-h-10 tw-w-10 tw-text-center">
                                    <img v-if="item.image" :src="item.image" class="tw-max-h-full tw-object-cover"
                                         alt="product image"/>
                                    <div v-else class="tw-bg-gray-50 tw-w-full tw-h-full tw-rounded-lg"/>
                                </div>
                                <div class="tw-line-clamp-1 tw-flex-1" :title="item.name">{{ item.name }}</div>
                            </div>
                        </div>
                        <div class="tw-font-xs">selected items : <strong>{{ tab.items.length }}</strong></div>
                    </div>


                </div>


            </li>
            <li>
                <button @click="addNewTab" class="tw-bg-green-300 tw-px-2 tw-py-1 tw-rounded-lg">add new tab</button>
            </li>
        </ul>


    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

enum ProductCollectionType {
    Series = 'series',
    Products = 'products'
}

@Component
export default class BlockSpotlight extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    ProductCollectionType = ProductCollectionType;

    categories: Array<any> = [];

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                title: {id: 0, type: StructureType.String, title: 'Title', value: 'Spotlight Releases'},
                tabs: {
                    type: StructureType.Null,
                    newItem: {
                        title: 'Televisions',
                        category: '',
                        type: ProductCollectionType.Series,
                        serverData: [],
                        items: []
                    },
                    value: [
                        {
                            title: 'Televisions',
                            category: '',
                            type: ProductCollectionType.Series,
                            serverData: [],
                            items: []
                        }],
                }
            }
    }

    async mounted() {
        this.categories = (await this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getCategories')).data
        if (this.isEmpty) this.reset();
    }

    addNewTab() {
        this.model.tabs.value.push(JSON.parse(JSON.stringify(this.model.tabs.newItem)));
    }

    removeTab(index: number) {
        this.model.tabs.value.splice(index, 1)
    }

    async categoryChanged(event: any, index: number) {
        let res: any = await this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/categorySeries/' + event.target.value);

        if (res.hasOwnProperty('series')) {
            this.model.tabs.value[index].type = ProductCollectionType.Series;
            this.model.tabs.value[index].serverData = res.series
                .map((j: any) => {
                    return {id: j.id, name: j.name, image: null}
                });
        } else {
            this.model.tabs.value[index].type = ProductCollectionType.Products;
            this.model.tabs.value[index].serverData = res.data
                .map((i: any) => i.products.product)
                .map((j: any) => {
                    return {id: j.id, name: j.name, image: j.media ? j.media.url : null}
                });
        }

    }

    getList(tab: any) {
        return tab.serverData ? tab.serverData.filter((i: any) => tab.items.length === 0 ||
            !tab.items.map((j: any) => j.id).includes(i.id)
        ).sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)) : [];
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch('value')
    onValueChanged(newValue: any, oldValue: any) {
        if (newValue && Object.keys(newValue).length === 0) this.reset(oldValue);
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
