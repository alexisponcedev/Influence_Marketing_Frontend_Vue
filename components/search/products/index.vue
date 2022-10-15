<template>
  <div class="">
    <v-text-field
      v-model="search"
      label="Search Products"
      placeholder="please enter product name or model ..."
      clearable
    />

    <div v-if="search">
      <div v-if="loading" class="tw-grid tw-grid-cols-4 tw-gap-2">
        <search-products-item :placeholder="true" v-for="i in 12" :key="i"/>
      </div>

      <div v-else class="tw-grid tw-grid-cols-4 tw-gap-2">
        <search-products-item v-for="product in products" :key="product.id" :value="product" @select="addProduct"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, VModel, Watch} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";
import {Page} from "~/repositories";

@Component
export default class MenuItemEditor extends Vue {
  @VModel({type: Array}) model!: any
  Api = Api;

  loading: boolean = false;

  // textField = {
  //   label: '',
  //   placeholder: 'search for product name',
  //   rules: [],
  //   colAttrs: {cols: 11},
  // }

  pages: Array<any> = [];

  search = null;
  products = [];


  mounted() {
    this.searchProduct();
  }

  searchProduct() {
    this.loading = true;
    this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/searchResult/' + this.search)
    // this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProducts/3')
      .then(res => {
        this.products = res.data.slice(0, 12);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  @Watch('search')
  onSearchChanged() {
    this.searchProduct();
  }

  addProduct(product: Object) {
    console.log('trying to add product to list', product);
    this.$emit('addProduct', product);
  }

}
</script>

