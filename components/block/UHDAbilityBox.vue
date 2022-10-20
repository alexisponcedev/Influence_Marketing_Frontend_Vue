<template>
  <div>
    <img src="/blocks/UHDAbilityBox.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlocUHDAbilityBox extends Vue {
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
      list: {
        id: 1,
        type: StructureType.List,
        title: "Items",
        newItem:  {
          image: {
            id: 0,
            type: StructureType.Image,
            title: "Main Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/f42d1cf104/Game-Mode-min__ScaleMaxWidthWzMwNDhd.jpg-ytwax3.jpg",
            alt: "Some note about this image",
          },
          smallImage: {
            id: 1,
            type: StructureType.Image,
            title: "Small Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/b20eaf78a7/Game-mode__ScaleMaxWidthWzMwNDhd.png-a0ht61.png",
            alt: "Some note about this image",
          },
          title: {
            id: 2,
            type: StructureType.String,
            title: "Title",
            value: "Game Mode",
          },
          description: {
            id: 3,
            type: StructureType.String,
            title: "Description",
            value: "Super-low latency kills input lag for easier frags, because your controller commands are virtually instant on screen.",
          },
        },
        value: [
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Main Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/f42d1cf104/Game-Mode-min__ScaleMaxWidthWzMwNDhd.jpg-ytwax3.jpg",
              alt: "Some note about this image",
            },
            smallImage: {
              id: 1,
              type: StructureType.Image,
              title: "Small Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/b20eaf78a7/Game-mode__ScaleMaxWidthWzMwNDhd.png-a0ht61.png",
              alt: "Some note about this image",
            },
            title: {
              id: 2,
              type: StructureType.String,
              title: "Title",
              value: "Game Mode",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Super-low latency kills input lag for easier frags, because your controller commands are virtually instant on screen.",
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Main Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/5c4cd12cc5/Motion-Rate-min__ScaleMaxWidthWzMwNDhd.jpg-zdeklf.jpg",
              alt: "Some note about this image",
            },
            smallImage: {
              id: 1,
              type: StructureType.Image,
              title: "Small Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/20ff8ee94b/motion__ScaleMaxWidthWzMwNDhd.png-tdk718.png",
              alt: "Some note about this image",
            },
            title: {
              id: 2,
              type: StructureType.String,
              title: "Title",
              value: "Motion Rate 120",
            },
            description: {
              id: 3,
              type: StructureType.String,
              title: "Description",
              value: "Makes fast-moving scenes smooth like butter.",
            },
          },
        ],
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
