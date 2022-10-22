<template>
  <div>
    <img src="/blocks/LaserFinedWithImage.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockLaserFinedWithImage extends Vue {
  @Prop(Number) readonly id: number | undefined;
  @Prop(Number) readonly product_id!: number;
  @VModel({type: Object}) model!: Object;

  Theme = Theme;

  product: Object = {};
  loadingProduct: boolean = true;

  reset() {
    this.model = {
      theme: {
        id: 0,
        type: StructureType.Select,
        title: "Theme",
        value: Theme.dark,
        items: [
          {title: "Light", value: this.Theme.light},
          {title: "Dark", value: this.Theme.dark},
        ],
      },

      title: {
        id: 1,
        type: StructureType.String,
        title: "Title",
        value: "Find Your",
      },
      coloredTitle: {
        id: 1,
        type: StructureType.String,
        title: "Colored Title",
        value: "Laser TV",
      },

      description: {
        id: 2,
        type: StructureType.String,
        title: "description",
        value: "Rethink how you watch your favorite shows with Laser TV, bringing a new type of cinema experience to your home.",
      },
      link: {
        id: 3,
        type: StructureType.Url,
        title: "Unlock the detail and clarity of 4K Ultra HD resolution. With 8.3 million pixels, 4K UHD resolution provides razor-sharp, stunningly realistic images with incredible detail.",
        value: "https://www.hisense-usa.com/tv-and-audio/televisions/all-tvs/?prop301=Laser+Display",
      },
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
  onValueChanged() {

    if (this.isEmpty) this.reset();
  }
}
</script>

<style type="text/css">

</style>
