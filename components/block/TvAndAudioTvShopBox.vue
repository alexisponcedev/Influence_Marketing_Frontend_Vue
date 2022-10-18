<template>
  <div>
    <img src="/blocks/TvAndAudioTvShopBox.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockTvAndAudioTvShopBox extends Vue {
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
        title: "Top Title",
        value: "Shop Hisense Televisions",
      },
      list: {
        id: 2,
        type: StructureType.List,
        title: "Items",
        newItem: {
          link: {
            id: 0,
            type: StructureType.Url,
            title: "Shop Now URL",
            value: "/products",
          },
          image: {
            id: 1,
            type: StructureType.Image,
            title: "Upload Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
            alt: "Some note about this image",
          },
          title: {
            id: 2,
            type: StructureType.String,
            title: "Title",
            value: "LASER TVS",
          },
          description: {
            id: 3,
            type: StructureType.String,
            title: "Description",
            value: "Discover a New Expanse of Color",
          },
        },
        value: [
          {
            link: {
              id: 0,
              type: StructureType.Url,
              title: "Shop Now URL",
              value: "/products",
            },
            image: {
              id: 1,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/dcbd61174f/u6h-infill__ScaleMaxWidthWzMwNDhd.png-rdv98j.png",
              alt: "Some note about this image",
            },
            title: {
              id: 2,
              type: StructureType.String,
              title: "Title",
              value: "U6H SERIES",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Great for Entertainment",
            },
          },
          {
            link: {
              id: 0,
              type: StructureType.Url,
              title: "Shop Now URL",
              value: "/products",
            },
            image: {
              id: 1,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/02f59535b5/U7H-main__ScaleMaxWidthWzMwNDhd.png-kztgtc.png",
              alt: "Some note about this image",
            },
            title: {
              id: 2,
              type: StructureType.String,
              title: "Title",
              value: "U7H SERIES",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Great for Gaming",
            },
          },
          {
            link: {
              id: 0,
              type: StructureType.Url,
              title: "Shop Now URL",
              value: "/products",
            },
            image: {
              id: 1,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/a9521cbb0e/U8h-infill__ScaleMaxWidthWzMwNDhd.png-r0i6kn.png",
              alt: "Some note about this image",
            },
            title: {
              id: 2,
              type: StructureType.String,
              title: "Title",
              value: "U8H SERIES",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Great for Everything",
            },
          },
          {
            link: {
              id: 0,
              type: StructureType.Url,
              title: "Shop Now URL",
              value: "/products",
            },
            image: {
              id: 1,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
              alt: "Some note about this image",
            },
            title: {
              id: 2,
              type: StructureType.String,
              title: "Title",
              value: "LASER TVS",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Discover a New Expanse of Color",
            },
          },
        ],
      },
      link: {
        id: 3,
        type: StructureType.Url,
        title: "Shop All Tvs",
        value: "/products",
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
    console.log('component is empty now');
    if (this.isEmpty) this.reset();
  }
}
</script>

<style type="text/css"></style>
