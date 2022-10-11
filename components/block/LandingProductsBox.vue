<template>
  <div class='' v-if="!isEmpty">
    <h2 class="main-title tw-py-4">{{ model.title.value }}</h2>
    <div class='tw-flex tw-justify-center'>
      <block-LandingProductItem
        v-for="(item , index) in model.list.value"
        :key="index"
        :value="item"
        @input="v => item = v"
      />
    </div>
  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";


@Component
export default class LandingProductsBox extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({ default: true }) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  mounted() {
    if (this.isEmpty)
      this.model = {
        title: { id : 0 , type: StructureType.String, title: 'Top Title', value: 'French Door Refrigerator Recall Information'},
        list: {
          id : 1,
          type: StructureType.List,
          title: 'Items',
          newItem: {
            link: { id : 0 , type: StructureType.String, title: 'Shop Now URL', value: '/products'},
            image: {
              id : 1,
              type: StructureType.Image,
              title: 'Upload Image',
              src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
              alt: 'Some note about this image',
            },
            title: {id : 2,type: StructureType.String, title: 'Title', value: 'TELEVISIONS'},
          },
          value: [
            {
              link: { id : 0 , type: StructureType.String, title: 'Shop Now URL', value: '/products'},
              image: {
                id : 1 ,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
                alt: 'Some note about this image',
              },
              title: {id : 2 , type: StructureType.String, title: 'Title', value: 'TELEVISIONS'},
            },
            {
              link: {id : 0 , type: StructureType.String, title: 'Shop Now URL', value: '/products'},
              image: {
                id : 1,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/4e2c190508/content_dp-refrigerator-min-hloqgg.png',
                alt: 'Some note about this image',
              },
              title: {id : 2 ,type: StructureType.String, title: 'Title', value: 'REFRIGERATORS'},
            },
            {
              link: {id : 0 , type: StructureType.String, title: 'Shop Now URL', value: '/products'},
              image: {
                id : 1 ,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/GalleryImages/Product/278/e7a660ef50/Artboard-1__ScaleMaxWidthWzY0MF0.png',
                alt: 'Some note about this image',
              },
              title: {id : 2 , type: StructureType.String, title: 'Title', value: 'DISHWASHERS'},
            },
            {
              link: { id : 0 , type: StructureType.String, title: 'Shop Now URL', value: '/products'},
              image: {
                id : 1,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/GalleryImages/Product/274/e4489e1ec0/Front-min__ScaleMaxWidthWzY0MF0.png',
                alt: 'Some note about this image',
              },
              title: { id : 2 , type: StructureType.String, title: 'Title', value: 'BEVERAGE + WINE COOLER'},
            },
            {
              link: {id : 0 , type: StructureType.String, title: 'Shop Now URL', value: '/products'},
              image: {
                id : 1 ,
                type: StructureType.Image,
                title: 'Upload Image',
                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/d199b89212/content_dp-dehumidifier-min-yli72a.png',
                alt: 'Some note about this image',
              },
              title: {id : 2 ,type: StructureType.String, title: 'Title', value: 'AIR PRODUCTS'},
            },

          ]
        },
      }
  }

  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
}
</script>

<style scoped>
.main-title {
  font-family: 'hisense', serif;
  font-style: normal;
  font-weight: 500;
  font-size: 42px;
  line-height: 48px;

  text-align: center;
  color: #000000;
  margin-top: 70px;
  margin-bottom: 72px;
}
</style>
