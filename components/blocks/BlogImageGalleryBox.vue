<template>
  <div>
    <img src="/blocks/BlogImageGalleryBox.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class BlogImageGalleryBox extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      image1: {id: 0, type: StructureType.Image, title: 'Image 1', src: '' , alt : ''},
      image2: {id: 0, type: StructureType.Image, title: 'Image 2', src: '' , alt : ''},
      image3: {id: 0, type: StructureType.Image, title: 'Image 3', src: '' , alt : ''},
      image4: {id: 0, type: StructureType.Image, title: 'Image 4', src: '' , alt : ''},
      image5: {id: 0, type: StructureType.Image, title: 'Image 5', src: '' , alt : ''},
      image6: {id: 0, type: StructureType.Image, title: 'Image 6', src: '' , alt : ''},
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
