<template>
  <div>
    <img src="/blocks/BlogListHead.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class BlogListHead extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      image1 : {id : 0 , type : StructureType.Image , title : 'Image 1' , src : '' , alt : ''},
      image2 : {id : 1 , type : StructureType.Image , title : 'Image 2' , src : '' , alt : ''},
      title : {id : 2 , type : StructureType.Text , title : 'Title' , value : ''},
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
