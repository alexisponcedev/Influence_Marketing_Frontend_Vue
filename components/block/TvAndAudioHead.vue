<template>
  <div>
    <img src="/blocks/TvAndAudioHead.png" alt="">
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockTvAndAudioHead extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop(Number) readonly product_id!: number
  @VModel({type: Object}) model!: Object

  Theme = Theme;

  product: Object = {};
  loadingProduct: boolean = true;

  reset() {
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
      image: {
        id: 1,
        type: StructureType.Image,
        title: 'Header Image',
        src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/2b3d1d5b30/Television-Hero__ScaleMaxWidthWzMwNDhd.jpg-kqo0zn.jpg',
        alt: 'Some note about this image',
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
  onValueChanged() {
    console.log('component is empty now');
    if (this.isEmpty) this.reset();
  }
}
</script>

<style type="text/css">

</style>
