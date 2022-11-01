<template>
  <div>
    <img src="/blocks/UHDNewsBox.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlocUHDkNewsBox extends Vue {
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
            title: "Upload Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/dece2f50ff/Android-TV-min__ScaleMaxWidthWzMwNDhd.jpg-nhodhc.jpg",
            alt: "Some note about this image",
          },
          title: {
            id: 1,
            type: StructureType.String,
            title: "Title",
            value: "Let Android TV entertain you",
          },
          description: {
            id: 2,
            type: StructureType.Text,
            title: "Description",
            value: "Hisense 4K UHD Android TVs put a world of entertainment at your fingertips. Instantly tap into more than 5,000 apps and games on your big screen. Android TV makes it easy to discover and watch movies, TV shows, music and games.",
          },
        },
        value: [
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/dece2f50ff/Android-TV-min__ScaleMaxWidthWzMwNDhd.jpg-nhodhc.jpg",
              alt: "Some note about this image",
            },
            title: {
              id: 1,
              type: StructureType.String,
              title: "Title",
              value: "Let Android TV entertain you",
            },
            description: {
              id: 2,
              type: StructureType.Text,
              title: "Description",
              value: "Hisense 4K UHD Android TVs put a world of entertainment at your fingertips. Instantly tap into more than 5,000 apps and games on your big screen. Android TV makes it easy to discover and watch movies, TV shows, music and games.",
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/5b6fe1b839/Roku-TV-min__ScaleMaxWidthWzMwNDhd.jpg-o82n6r.jpg",
              alt: "Some note about this image",
            },
            title: {
              id: 1,
              type: StructureType.String,
              title: "Title",
              value: "Start streaming with Roku TV",
            },
            description: {
              id: 2,
              type: StructureType.Text,
              title: "Description",
              value: "It’s easy to watch what you love with a Hisense 4K Roku TV. Search by title, actor or director to stream for free or at the lowest cost across thousands of channels. Great for cable, satellite, streaming and free TV with a HDTV antenna. You can even fire up your games console, all from the simple home screen.",
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/a632a531ff/XClass_HisenseWebsiteImage_1020212x1__ScaleMaxWidthWzMwNDhd.png-gdb3la.png",
              alt: "Some note about this image",
            },
            title: {
              id: 1,
              type: StructureType.String,
              title: "Title",
              value: "Welcome to your joy with XClass TV",
            },
            description: {
              id: 2,
              type: StructureType.String,
              title: "Description",
              value: "XClass TV brings you all the joy of TV and none of the frustration. You’re greeted by a home screen that puts the apps and services you love in one place. Quickly pick up where you left off with your recently watched programs, plus get recommendations based on what you watch. Get access to over thousands of movies and TV shows.",
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
