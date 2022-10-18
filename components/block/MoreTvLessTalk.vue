<template>
    <div>
        <img src="/blocks/MoreTvLessTalk.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";


@Component
export default class BlockMoreTvLessTalk extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({ type: Object }) model!: Object

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    reset(){
      this.model = {
        theme: {
          id: 0,
          type: StructureType.Select,
          title: 'Theme',
          value: Theme.light,
          items: [
            { title: 'Light', value: this.Theme.light },
            { title: 'Dark', value: this.Theme.dark },
          ]
        },
        title: {
          id: 1, type: StructureType.String, title: 'Title', value: 'Why less talk <br /> means more TV.'
        },
        littleTitle: {
          id: 2, type: StructureType.String, title: 'little Title', value: 'We let our technology do the talking, not our ads.'
        },
        image: {
          id: 3,
          type: StructureType.Image,
          title: "Upload Image",
          src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
          alt: "less talk",
        },
        imageFull: {
          id: 4,
          type: StructureType.Image,
          title: "Upload Image",
          src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
          alt: "less talk",
        },
        list: {
          id: 5,
          type: StructureType.List,
          title: "Items",
          newItem: {
            image: {
              id: 0,
              type: StructureType.Image,
              title: "Upload Image",
              src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
              alt: "MoreTv tech item",
            },
            description: {
              id: 1,
              type: StructureType.String,
              title: "Description",
              value: "One billion+ colors, we’ve counted",
            },
          },
          value: [
            {
              image: {
                id: 0,
                type: StructureType.Image,
                title: "Upload Image",
                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                alt: "MoreTv tech item",
              },
              description: {
                id: 1,
                type: StructureType.String,
                title: "Description",
                value: "One billion+ colors, we’ve counted",
              },
            },
            {
              image: {
                id: 0,
                type: StructureType.Image,
                title: "Upload Image",
                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                alt: "MoreTv tech item",
              },
              description: {
                id: 1,
                type: StructureType.String,
                title: "Description",
                value: "One billion+ colors, we’ve counted",
              },
            },
            {
              image: {
                id: 0,
                type: StructureType.Image,
                title: "Upload Image",
                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                alt: "MoreTv tech item",
              },
              description: {
                id: 1,
                type: StructureType.String,
                title: "Description",
                value: "One billion+ colors, we’ve counted",
              },
            },
            {
              image: {
                id: 0,
                type: StructureType.Image,
                title: "Upload Image",
                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                alt: "MoreTv tech item",
              },
              description: {
                id: 1,
                type: StructureType.String,
                title: "Description",
                value: "One billion+ colors, we’ve counted",
              },
            },
            {
              image: {
                id: 0,
                type: StructureType.Image,
                title: "Upload Image",
                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                alt: "MoreTv tech item",
              },
              description: {
                id: 1,
                type: StructureType.String,
                title: "Description",
                value: "One billion+ colors, we’ve counted",
              },
            },
          ],
        },
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
  onValueChanged(){
    console.log('component is empty now');
    if(this.isEmpty) this.reset();
  }
}
</script>

<style type="text/css">

</style>
