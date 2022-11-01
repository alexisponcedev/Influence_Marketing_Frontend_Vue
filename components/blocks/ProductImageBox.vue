<template>
  <div>
    <img src="/blocks/ProductImageBox.png" alt="">
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockProductImageBox extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop(Number) readonly product_id!: number
  @VModel({type: Object}) model!: Object

  Theme = Theme;

  reset(){
    this.model = {
      theme: {
        id: 0,
        type: StructureType.Select,
        title: 'Theme',
        value: Theme.dark,
        items: [
          {title: 'Light', value: this.Theme.light},
          {title: 'Dark', value: this.Theme.dark},
        ]
      },
      image: {
        id : 0 ,
        type: StructureType.Image,
        title: 'Upload Image',
        src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/c7a41f8e33/A7H_Lifestyle_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.jpg-s4crsj.png-vt2y8s.png',
        alt: 'Some note about this image',
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
  onValueChanged(){

    if(this.isEmpty) this.reset();
  }
}
</script>

<style type="text/css"></style>
