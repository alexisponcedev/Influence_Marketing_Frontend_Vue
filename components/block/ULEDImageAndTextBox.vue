<template>
  <div>
    <img src="/blocks/ULEDImageAndTextBox.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockULEDImageAndTextBox extends Vue {
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
          { title: "Light", value: this.Theme.light },
          { title: "Dark", value: this.Theme.dark },
        ],
      },
      list: {
        id: 1,
        type: StructureType.List,
        title: "List",
        newItem: {
          littleTitle: {
            id: 1,
            type: StructureType.String,
            title: "little Title",
            value: "4K ULED™",
          },
          title: {
            id: 2,
            type: StructureType.String,
            title: "Title",
            value: "Sharper, smoother pictures",
          },
          description: {
            id: 3,
            type: StructureType.String,
            title: "description",
            value: "Like 4K great, but better. Each TV in the ULED Series has our exclusive ULED technologies. They continually boost color, contrast, brightness, motion… What it means is you’ll always see the best possible picture. No wonder these are the TVs your old TV is worried about.",
          },
          image: {
            id: 4,
            type: StructureType.Image,
            title: "Upload Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/8195a563af/pdp-3_6-u7-50-50-feat-1__ScaleMaxWidthWzMwNDhd.jpg-gxkl4e.jpg",
            alt: "featured image",
          },
        },
        value: [
          {
            tinyTitle: {
              id: 1,
              type: StructureType.String,
              title: "Tiny Title",
              value: "4K ULED™",
            },
            title: {
              id: 2,
              type: StructureType.String,
              title: "Title",
              value: "Sharper, smoother pictures",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "description",
              value: "Like 4K great, but better. Each TV in the ULED Series has our exclusive ULED technologies. They continually boost color, contrast, brightness, motion… What it means is you’ll always see the best possible picture. No wonder these are the TVs your old TV is worried about.",
            },
            image: {
              id: 4,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/8195a563af/pdp-3_6-u7-50-50-feat-1__ScaleMaxWidthWzMwNDhd.jpg-gxkl4e.jpg",
              alt: "featured image",
            },
          },
          {
            tinyTitle: {
              id: 1,
              type: StructureType.String,
              title: "Tiny Title",
              value: "4K ULED™",
            },
            title: {
              id: 2,
              type: StructureType.String,
              title: "Title",
              value: "Sharper, smoother pictures",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "description",
              value: "Like 4K great, but better. Each TV in the ULED Series has our exclusive ULED technologies. They continually boost color, contrast, brightness, motion… What it means is you’ll always see the best possible picture. No wonder these are the TVs your old TV is worried about.",
            },
            image: {
              id: 4,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/8195a563af/pdp-3_6-u7-50-50-feat-1__ScaleMaxWidthWzMwNDhd.jpg-gxkl4e.jpg",
              alt: "featured image",
            },
          },
        ]
      }
    };
  }

  mounted() {
    if (this.isEmpty) this.reset()
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
