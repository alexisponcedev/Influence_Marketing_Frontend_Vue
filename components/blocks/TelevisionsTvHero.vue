<template>
  <div>
    <img src="/blocks/TelevisionsTvHero.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class TelevisionsTvHero extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      backgroundImage : {id : 0 , type : StructureType.Image , title : "Image" , src : '' , alt : ''},
      title : {id : 1 , type : StructureType.String , title : 'Title' , value : 'It all starts with X'},
      subtitle : {id : 2 , type : StructureType.String , title : 'Subtitle' , value : 'Pre-order the limited edition ULED X today.'},
      link : {id : 3 , type : StructureType.Url , title : 'Sign Up Now' , value : ''},
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
