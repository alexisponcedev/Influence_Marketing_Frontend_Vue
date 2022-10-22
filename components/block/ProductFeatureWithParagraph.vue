<template>
  <div>
    <img src="/blocks/ProductFeatureWithParagraph.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import {Direction} from "~/interfaces/DirectionEnum";

@Component
export default class BlockProductFeatureWithParagraph extends Vue {
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

      image: {
        id: 1,
        type: StructureType.Image,
        title: 'Image',
        src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/26632e121d/pdp-3_6-u9-50-50-feat-1__ScaleMaxWidthWzMwNDhd.jpg-t34p4p.jpg',
        alt: 'featured image'
      },
      paragraphOn: {
        id: 2,
        type: StructureType.String,
        title: 'Paragraph ON',
        value: "Sure, the U8G has 4K resolution, Quantum Dot Color, Dolby Vision HDR, 120Hz native panel, Full Array Local Dimming Zones and powerful up-to-1,500 nits peak brightness. But what does all that mean? It’s like gazing at the sun melting into the Mediterranean Sea from Ibiza’s coolest bars. But sitting on your couch. At home."
      },
      paragraphOff: {
        id: 3,
        type: StructureType.String,
        title: 'Paragraph Off',
        value: "Sure, the U8G has 4K resolution, Quantum Dot Color, Dolby Vision HDR, 120Hz native panel, Full Array Local Dimming Zones and powerful up-to-1,500 nits peak brightness. But what does all that mean? It’s like gazing at the sun melting into the Mediterranean Sea from Ibiza’s coolest bars. But sitting on your couch. At home."
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
