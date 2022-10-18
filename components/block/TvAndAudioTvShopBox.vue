<template>
  <div>
    <img src="/blocks/TvAndAudioTvShopBox.png" alt="" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class BlockTvAndAudioTvShopBox extends Vue {
  @Prop(Number) readonly id: number | undefined;
  @Prop(Number) readonly product_id!: number;
  @VModel({ type: Object }) model!: Object;

  Theme = Theme;

  product: Object = {};
  loadingProduct: boolean = true;

  mounted() {
    if (this.isEmpty) {
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
}
</script>

<style type="text/css"></style>
