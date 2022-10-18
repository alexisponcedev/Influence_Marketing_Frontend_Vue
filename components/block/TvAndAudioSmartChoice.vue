<template>
  <div>
    <img src="/blocks/TvAndAudioSmartChoice.png" alt="">
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockTvAndAudioSmartChoice extends Vue {
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
      title: {
        id: 1,
        type: StructureType.String,
        title: "Black Title",
        value: "Make The",
      },
      coloredTitle: {
        id: 1,
        type: StructureType.String,
        title: "Colored Title",
        value: "Smart Choice",
      },
      paragraph: {
        id: 2,
        type: StructureType.String,
        title: "Paragraph",
        value: "The Hisense 4K UHD Smart Laser TV with Wide Color Gamut features a dual-color laser that displays a cinema-like picture full of rich, vibrant and true-to-life colors on an incredible 120” display. At every distance and angle, images are sharp and comfortable to watch for an immersive home-theater experience.",
      },
      image: {
        id: 3,
        type: StructureType.Image,
        title: 'Upload left Image',
        src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
        alt: 'Some note about this image',
      },
      link: {
        id: 5,
        type: StructureType.Url,
        title: "learn more",
        value: "/products",
      }
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
