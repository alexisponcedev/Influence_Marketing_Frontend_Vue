<template>
  <div>
    <img src="/blocks/ProductFeatureWithImage.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import {Direction} from "~/interfaces/DirectionEnum";

@Component
export default class BlockProductFeatureWithImage extends Vue {
  @Prop(Number) readonly id: number | undefined;
  @Prop(Number) readonly product_id!: number;
  @VModel({type: Object}) model!: Object;

  Theme = Theme;
  Direction = Direction;

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
      direction: {
        id: 0,
        type: StructureType.Select,
        title: "Direction",
        value: Direction.ltr,
        items: [
          {title: "Left To Right", value: this.Direction.ltr},
          {title: "Right To Left", value: this.Direction.rtl},
        ],
      },
      littleTitle: {
        id: 1,
        type: StructureType.String,
        title: 'Little Title',
        value: "4K ULED ™"
      },
      title: {
        id: 2,
        type: StructureType.String,
        title: 'Title',
        value: "Sharper, smoother pictures"
      },
      description: {
        id: 3,
        type: StructureType.String,
        title: 'Description',
        value: "4K greatness, but better. The U8G has our exclusive ULED technologies. They boost color, contrast, brightness, motion… we could go on. It’s the TV your old TV wants to be."
      },
      image: {
        id: 4,
        type: StructureType.Image,
        title: 'Image',
        src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/26632e121d/pdp-3_6-u9-50-50-feat-1__ScaleMaxWidthWzMwNDhd.jpg-t34p4p.jpg',
        alt: 'featured image'
      },
      link: {
        id: 3,
        type: StructureType.Url,
        title: 'Shop TV',
        value: "/"
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
