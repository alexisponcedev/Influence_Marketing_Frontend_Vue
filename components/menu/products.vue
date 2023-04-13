<template>
    <div>
        <div class="tw-space-y-2">
            <draggable v-model="model" group="products" @start="drag=true" @end="drag=false" class="tw-space-y-2">
                <div v-for="(item , index) in model" :key="index">
                    <v-row v-if="editing === index" align="start">
                        <form-field-text :field="textField" v-model="item.name"/>
                        <form-field-select-page-name
                            :field="urlField"
                            v-model="item.url"
                            :rules="[]"
                            placeholder="p"
                        />
                        <v-col justify="center">
                            <v-btn icon elevation="0" text @click="confirm">
                                <v-icon class="red--text">mdi-check</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <div v-else class="tw-flex tw-items-center tw-justify-between tw-bg-gray-50 tw-rounded-xl tw-p-2">
                        <div class="tw-w-56">
                            <img :src="item.image" alt="product image" class="tw-object-cover tw-h-16 tw-rounded-lg">
                        </div>
                        <div class="tw-flex-1">
                            <div class="tw-text-gray-400">{{ item.name }}</div>
                            <div>{{ item.url }}</div>
                        </div>
                        <div class="tw-flex tw-items-center tw-space-x-4">
                            <button @click="edit(index)">
                                <v-icon small class="gray--text">mdi-pencil</v-icon>
                            </button>
                            <button @click="remove(index)">
                                <v-icon small class="red--text">mdi-delete</v-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </draggable>
        </div>
        <search-products @addProduct="addNewProduct" class="tw-mt-3"/>
    </div>

</template>
<script lang="ts">
import {Vue, Component, VModel} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";
import {Page} from "~/repositories";

@Component
export default class MenuItemEditor extends Vue {
    @VModel({type: Array}) model!: any
    Api = Api;

    editing: number = -1;

    textField = {
        label: '',
        placeholder: 'enter name',
        rules: [],
        colAttrs: {cols: 4},
    }

    urlField = {
        label: "",
        placeholder: 'Enter page name',
        'item-text': 'title',
        'item-value': 'route',
        rules: [],
        colAttrs: {cols: 7},
    }

    pages: Array<any> = [];

    edit(index: number) {
        this.editing = index;
    }

    remove(index: number) {
        this.model.splice(index, 1);
    }

    // addNew() {
    //   this.model.push({
    //     name: 'Sample Title',
    //     url: '/',
    //     image : ''
    //   })
    //   this.edit(this.model.length - 1)
    // }

    addNewProduct(product: any) {
        this.model.push({
            name: product.name,
            url: '/',
            image: product.media ? product.media.url : ''
        })
    }

    confirm() {
        this.editing = -1;
    }

    products = [];

    searchProduct(search: string) {
        this.$axios.$get('https://impim.api.stage.imdigital.ca/api/cms/searchResult/' + search)
            .then(res => {
                this.products = res.data;
            });
    }

}
</script>

