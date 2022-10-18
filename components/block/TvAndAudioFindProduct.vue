<template>
  <div>
    <img src="/blocks/TvAndAudioFindProduct.png" alt="">
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockTvAndAudioFindProduct extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop(Number) readonly product_id!: number
  @VModel({type: Object}) model!: Object

  Theme = Theme;

  product: Object = {};
  loadingProduct: boolean = true;

  mounted() {
    if (this.isEmpty) {
      this.model = {
        theme: {
          id: 0,
          type: StructureType.Select,
          title: 'Theme',
          value: Theme.dark,
          items: [
            {title: 'Light', value: this.Theme.light},
            {title: 'Dark', value: this.Theme.dark},
          ]
        },
        title: {
          id: 1,
          type: StructureType.String,
          title: "Black Title",
          value: "Find Your",
        },
        coloredTitle: {
          id: 1,
          type: StructureType.String,
          title: "Colored Title",
          value: "Hisense TV",
        },
        tinyTitle: {
          id: 2,
          type: StructureType.String,
          title: "tiny title",
          value: "Take a look at our selection of models and see whats right for you.",
        },
        link: {
          id: 3,
          type: StructureType.Url,
          title: "Shop Now",
          value: "/products",
        },
        image: {
          id: 4,
          type: StructureType.Image,
          title: "Upload Image",
          src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
          alt: "Some note about this image",
        },
      }
    }
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
}
</script>

<style type="text/css">

</style>
