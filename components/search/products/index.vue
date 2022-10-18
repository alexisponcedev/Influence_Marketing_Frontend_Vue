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
      <div v-if="loading" >
        <slot name="placeholder">
          <div class="tw-grid tw-grid-cols-4 tw-gap-2">
            <search-products-item :placeholder="true" v-for="i in 12" :key="i"/>
          </div>
        </slot>
      </div>

      <div v-else>
        <slot :products="products">
          <div class="tw-grid tw-grid-cols-4 tw-gap-2">
            <search-products-item v-for="product in products" :key="product.id" :value="product" @select="addProduct"/>
          </div>
        </slot>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, VModel, Watch, Prop} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";

@Component
export default class SearchProductIndex extends Vue {
  @Prop({type : Number}) category_id!:number
  @Prop({type : Number , default : 9}) max!:number
  @Prop({type : Boolean , default : false}) alwaysShow!:boolean
  @Prop({type : Boolean , default : false}) initLoad!:boolean
  @VModel({type: Array}) model!: any
  @Prop(Function) run! : Function
  Api = Api;

  loading: boolean = false;

  pages: Array<any> = [];

  search = '';
  products = [];


  mounted() {
    if(this.initLoad) this.searchProduct();
  }

  _timer : any = null;

  searchWithDebounceTime() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.searchProduct();
    }, 700);
  }

  searchProduct() {
    this.loading = true;
    let query = [`search=${this.search}`];
    if(this.category_id > 0) query.push(`category_id=${this.category_id}`)
    this.$axios.$get(`https://impim.dev-api.hisenseportal.com/api/cms/getProductsList?${query.join('&')}`)
      .then(res => {
        this.products = this.max > 0 ? res.data.slice(0, this.max) : res.data;
        if(this.run) this.products = this.run(this.products);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  // @Watch('search')
  // onSearchChanged() {
  //   this.searchWithDebounceTime();
  // }

  @Watch('category_id')
  onCategoryIdChanged(){
    this.searchProduct()
    // this.searchWithDebounceTime()
  }

  addProduct(product: Object) {
    this.$emit('addProduct', product);
  }

}
</script>

