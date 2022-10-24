<template>
  <div>
    <img src="/blocks/MoreTvBox.png" alt="" />
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class BlockMoreTvBox extends Vue {
  @Prop(Number) readonly id: number | undefined;
  @Prop(Number) readonly product_id!: number;
  @VModel({ type: Object }) model!: Object;

  Theme = Theme;

  product: Object = {};
  loadingProduct: boolean = true;

  reset(){
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
        value: "All the tech.<br />None of the tech B.S.",
      },
      description: {
        id: 1,
        type: StructureType.String,
        title: "description",
        value:
          "A great TV is just a great TV. Not an ‘immersive harmony of sound and vision’. Cut through the usual tech B.S with our jargon / jargoff filter.",
      },
      list: {
        id: 2,
        type: StructureType.List,
        title: "Items",
        newItem: {
          image: {
            id: 0,
            type: StructureType.Image,
            title: "Upload Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
            alt: "MoreTv Box item",
          },
          title: {
            id: 1,
            type: StructureType.String,
            title: "Title",
            value: "U8G",
          },
          model: {
            id: 2,
            type: StructureType.String,
            title: "Model",
            value: "FireTv",
          },
          description: {
            id: 3,
            type: StructureType.String,
            title: "Description",
            value: "Discover a New Expanse of Color",
          },
          link: {
            id: 4,
            type: StructureType.Url,
            title: "Learn More Link",
            value: "/",
          },
        },
        value: [
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
              alt: "MoreTv Box item",
            },
            title: {
              id: 1,
              type: StructureType.String,
              title: "Title",
              value: "U8G",
            },
            model: {
              id: 2,
              type: StructureType.String,
              title: "Model",
              value: "FireTv",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Discover a New Expanse of Color",
            },
            link: {
              id: 4,
              type: StructureType.Url,
              title: "Learn More Link",
              value: "/",
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
              alt: "MoreTv Box item",
            },
            title: {
              id: 1,
              type: StructureType.String,
              title: "Title",
              value: "U8G",
            },
            model: {
              id: 2,
              type: StructureType.String,
              title: "Model",
              value: "FireTv",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Discover a New Expanse of Color",
            },
            link: {
              id: 4,
              type: StructureType.Url,
              title: "Learn More Link",
              value: "/",
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
              alt: "MoreTv Box item",
            },
            title: {
              id: 1,
              type: StructureType.String,
              title: "Title",
              value: "U8G",
            },
            model: {
              id: 2,
              type: StructureType.String,
              title: "Model",
              value: "FireTv",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Discover a New Expanse of Color",
            },
            link: {
              id: 4,
              type: StructureType.Url,
              title: "Learn More Link",
              value: "/",
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
              alt: "MoreTv Box item",
            },
            title: {
              id: 1,
              type: StructureType.String,
              title: "Title",
              value: "U8G",
            },
            model: {
              id: 2,
              type: StructureType.String,
              title: "Model",
              value: "FireTv",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Discover a New Expanse of Color",
            },
            link: {
              id: 4,
              type: StructureType.Url,
              title: "Learn More Link",
              value: "/",
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
              alt: "MoreTv Box item",
            },
            title: {
              id: 1,
              type: StructureType.String,
              title: "Title",
              value: "U8G",
            },
            model: {
              id: 2,
              type: StructureType.String,
              title: "Model",
              value: "FireTv",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Discover a New Expanse of Color",
            },
            link: {
              id: 4,
              type: StructureType.Url,
              title: "Learn More Link",
              value: "/",
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
              alt: "MoreTv Box item",
            },
            title: {
              id: 1,
              type: StructureType.String,
              title: "Title",
              value: "U8G",
            },
            model: {
              id: 2,
              type: StructureType.String,
              title: "Model",
              value: "FireTv",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Discover a New Expanse of Color",
            },
            link: {
              id: 4,
              type: StructureType.Url,
              title: "Learn More Link",
              value: "/",
            },
          },
        ],
      },
      link: {
        id: 4,
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
  onValueChanged(){

    if(this.isEmpty) this.reset();
  }
}
</script>

<style type="text/css"></style>
