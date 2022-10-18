<template>
    <div>
        <img src="/blocks/MoreTvHisensePromise.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";


@Component
export default class BlockMoreTvHisensePromise extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({ type: Object }) model!: Object

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    reset(){
      this.model = {
        theme: {
          id: 0,
          type: StructureType.Select,
          title: 'Theme',
          value: Theme.light,
          items: [
            { title: 'Light', value: this.Theme.light },
            { title: 'Dark', value: this.Theme.dark },
          ]
        },
        title: {
          id: 1, type: StructureType.String, title: 'Title', value: 'The Hisense Promise'
        },
        paragraph: {
          id: 2,
          type: StructureType.Text,
          title: 'Paragraph Text',
          value: 'America, it’s time to get real. People don’t buy TVs to stare at the logo. They want to be dazzled by the picture, in awe of the sounds, and trust their new TV won’t ever let you down. That is why Hisense is proud to boast one of the smallest marketing budgets in our category - meaning more money invested in our products and not on pretentious, artsy advertising campaigns. <br />Sure, we may not be the biggest or the most well known but there’s one thing you can be sure of – Hisense will always strive to make the latest technologies available to all.'
        },
        image: {
          id: 3,
          type: StructureType.Image,
          title: "Upload Image sign",
          src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
          alt: "hisense sign",
        },
        imagePerson: {
          id: 4,
          type: StructureType.Image,
          title: "Upload Image person",
          src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
          alt: "joel",
        },
      }
    }
    mounted() {
        if (this.isEmpty) this.reset();
        // this.loadProduct();
    }

    loadProduct() {
        // this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/' + this.product_id )
        this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/781')
            .then(res => {
                this.product = res.data;
            }).finally(() => {
                this.loadingProduct = false;
            })
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

  @Watch('isEmpty')
  onValueChanged(){
    console.log('component is empty now');
    if(this.isEmpty) this.reset();
  }
}
</script>

<style type="text/css">

</style>
