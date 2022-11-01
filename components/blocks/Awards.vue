<template>
  <div>
    <img src="/blocks/Awards.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeAwards extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      title: {id: 0, type: StructureType.String, title: 'Title', value: 'Awards and Accolades'},
      awards: {
        id: 1, type: StructureType.List,
        title: 'Awards',
        newItem: {
          image: {
            id: 0,
            type: StructureType.Image,
            title: 'Image',
            src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/projectorreviewsbadge.png',
            alt: 'Image Alt'
          },
        },
        value: [
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: 'Image',
              src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/projectorreviewsbadge.png',
              alt: 'Image Alt'
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: 'Image',
              src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/valueelectronicsbadge.png',
              alt: 'Image Alt'
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: 'Image',
              src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/projectorcentralbadge.png',
              alt: 'Image Alt'
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: 'Image',
              src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/cediabadge.png',
              alt: 'Image Alt'
            },
          },
          {
            image: {
              id: 0,
              type: StructureType.Image,
              title: 'Image',
              src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/projectorscreenbadge.png',
              alt: 'Image Alt'
            },
          },
        ]
      },
      comments: {
        id: 1, type: StructureType.List,
        title: 'Comments',
        newItem: {
          quote : {id : 0 , type : StructureType.String , title : 'Quote' , value : 'The best UST for gaming I\'ve tried so far.'},
          author : {id : 0 , type : StructureType.String , title : 'Comment' , value : 'Mark Henninger, ProjectorCentral.com'},
        },
        value: [
          {
            quote : {id : 0 , type : StructureType.String , title : 'Quote' , value : 'The best UST for gaming I\'ve tried so far.'},
            author : {id : 0 , type : StructureType.String , title : 'Comment' , value : 'Mark Henninger, ProjectorCentral.com'},
          },
          {
            quote : {id : 0 , type : StructureType.String , title : 'Quote' , value : 'We have reviewed several good Laser TVs, but the L9G is arguably the best.'},
            author : {id : 0 , type : StructureType.String , title : 'Comment' , value : 'Phil Jones, ProjectorReviews.com'},
          },
          {
            quote : {id : 0 , type : StructureType.String , title : 'Quote' , value : 'The screen needs to be part of the UST experience, and the inclusion of a high-quality, easily adjustable screen sets the Hisense apart.'},
            author : {id : 0 , type : StructureType.String , title : 'Comment' , value : 'Mark Henninger, ProjectorCentral.com'},
          },
          {
            quote : {id : 0 , type : StructureType.String , title : 'Quote' , value : 'The color that this projector produces are just stunning.'},
            author : {id : 0 , type : StructureType.String , title : 'Comment' , value : 'Phil Jones, ProjectorReviews.com'},
          },
          {
            quote : {id : 0 , type : StructureType.String , title : 'Quote' , value : 'I saw extremely rich colors and excellent rendering of fine gradation at all brightness levels, and no notion of the tonality being out of balance. It\'s an impressive feat of dynamic contrast picture processing that allows the L9G to rise to the top of its class.'},
            author : {id : 0 , type : StructureType.String , title : 'Comment' , value : 'Mark Henninger, ProjectorCentral.com'},
          },
          {
            quote : {id : 0 , type : StructureType.String , title : 'Quote' , value : 'Quite possibly, the best-designed Laser TV that I\'ve reviewed in the last two years.'},
            author : {id : 0 , type : StructureType.String , title : 'Comment' , value : 'Phil Jones, ProjectorReviews.com'},
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
