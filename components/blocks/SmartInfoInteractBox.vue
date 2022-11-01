<template>
    <div>
        <img src="/blocks/SmartInfoInteractBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class BlockSmartInfoInteractBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: Object;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    reset(){
      this.model = {
        theme: {
          id: 0,
          type: StructureType.Select,
          title: "Theme",
          value: Theme.dark,
          items: [
            { title: "Light", value: this.Theme.light },
            { title: "Dark", value: this.Theme.dark },
          ],
        },
        iframeLink:{
          id : 1 , type : StructureType.String , title : 'Link' , value : 'https://touchlessdemos.withgoogle.com/retail/nest/streamingdemo/en-us'
        }
      };
    }
    mounted() {
        if (this.isEmpty) this.reset();
        // this.loadProduct();
    }

    loadProduct() {
        // this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/' + this.product_id )
        this.$axios
            .$get("https://impim.dev-api.hisenseportal.com/api/cms/getProduct/781")
            .then((res) => {
                this.product = res.data;
            })
            .finally(() => {
                this.loadingProduct = false;
            });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

  @Watch('isEmpty')
  onValueChanged(){

    if(this.isEmpty) this.reset();
  }
}
</script>

<style type="text/css">

</style>
