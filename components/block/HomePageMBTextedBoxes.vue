<template>
  <div>
    <img src="/blocks/HomePageMBTextedBoxes.png" alt=""/>
  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";


@Component
export default class HomePageMBTextedBoxes extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object


  reset() {
    this.model = {
      link: {
        id: 0,
        type: StructureType.Url,
        title: 'Link',
        value: '/'
      },
      littleTitle:{id : 1 , type : StructureType.String , Text : 'Little Title' , value : ''},
      list: {
        id: 1,
        type: StructureType.List,
        title: 'Items',
        newItem: {
          image: {
            id: 0,
            type: StructureType.Image,
            title: 'Upload Image',
            src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
            alt: 'Some note about this image',
          },
          title: {id: 1, type: StructureType.String, title: 'Title', value: 'Televisions'},
          link: {id: 2, type: StructureType.Url, title: 'Shop Now URL', value: '/products'},
        },
        value: [
          {
            backgroundImage: {
              id: 0,
              type: StructureType.Image,
              title: 'Background Image',
              src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
              alt: 'Some note about this image',
            },
            image: {
              id: 1,
              type: StructureType.Image,
              title: 'Upload Image',
              src: '',
              alt: 'Some note about this image',
            },
            title: {id: 2, type: StructureType.String, title: 'Title', value: 'Win a trip to the World Cup finals.'},
            link: {id: 3, type: StructureType.Url, title: 'Shop Now URL', value: '/'},
          },
          {
            backgroundImage: {
              id: 0,
              type: StructureType.Image,
              title: 'Background Image',
              src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
              alt: 'Some note about this image',
            },
            image: {
              id: 1,
              type: StructureType.Image,
              title: 'Upload Image',
              src: '',
              alt: 'Some note about this image',
            },
            title: {id: 2, type: StructureType.String, title: 'Title', value: 'Big. Bold. Beautiful.'},
            link: {id: 3, type: StructureType.Url, title: 'Shop Now URL', value: '/'},
          },
          {
            backgroundImage: {
              id: 0,
              type: StructureType.Image,
              title: 'Background Image',
              src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
              alt: 'Some note about this image',
            },
            image: {
              id: 1,
              type: StructureType.Image,
              title: 'Upload Image',
              src: '',
              alt: 'Some note about this image',
            },
            title: {id: 2, type: StructureType.String, title: 'Title', value: 'Immersive sound optimized just for you.'},
            link: {id: 3, type: StructureType.Url, title: 'Shop Now URL', value: '/'},
          },
          {
            backgroundImage: {
              id: 0,
              type: StructureType.Image,
              title: 'Background Image',
              src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
              alt: 'Some note about this image',
            },
            image: {
              id: 1,
              type: StructureType.Image,
              title: 'Upload Image',
              src: '',
              alt: 'Some note about this image',
            },
            title: {id: 2, type: StructureType.String, title: 'Title', value: 'Official Sponsor of Paris Saint-Germain.'},
            link: {id: 3, type: StructureType.Url, title: 'Shop Now URL', value: '/'},
          },
        ]
      },
    }
  }

  mounted() {
    if (this.isEmpty) this.reset();
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
