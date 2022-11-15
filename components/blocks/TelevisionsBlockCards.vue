<template>
  <div>
    <img src="/blocks/TelevisionsBlockCards.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class TelevisionsBlockCards extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      title: {id: 1, type: StructureType.Text, title: 'Title', value: ''},
      subtitle: {id: 2, type: StructureType.Text, title: 'Subtitle', value: ''},
      list: {
        id: 3, type: StructureType.List, title: "List",
        newItem: {
          title: {id: 1, type: StructureType.Text, title: 'Title', value: ''},
          subtitle: {id: 2, type: StructureType.Text, title: 'Subtitle', value: ''},
          image: { id: 2, type: StructureType.Image, title: 'Image', src: '', alt: '' },
          backgroundImage: { id: 2, type: StructureType.Image, title: 'Background Image', src: '', alt: '' },
          link: {id: 2, type: StructureType.Url, title: 'Link', value: ''},
        },
        value: [
          {
            title: {id: 1, type: StructureType.Text, title: 'Title', value: ''},
            subtitle: {id: 2, type: StructureType.Text, title: 'Subtitle', value: ''},
            image: { id: 2, type: StructureType.Image, title: 'Image', src: '', alt: '' },
            backgroundImage: { id: 2, type: StructureType.Image, title: 'Background Image', src: '', alt: '' },
            link: {id: 2, type: StructureType.Url, title: 'Link', value: ''},
          }
        ]
      },
      supportBox:{
        id : 4 , type : StructureType.Object , title : 'Support Box',
        value : {
          title: {id: 1, type: StructureType.Text, title: 'Title', value: ''},
          image: {id: 1, type: StructureType.Image, title: 'Image', src : '' , alt : ''},
          link: {id: 1, type: StructureType.Url, title: 'Link', value: ''},
        }
      }
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
