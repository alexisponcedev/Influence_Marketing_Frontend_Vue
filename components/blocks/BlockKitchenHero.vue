<template>
  <div>
    <img src="/blocks/BlockKitchenHero.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class BlockKitchenHero extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      image : {id : 0 , type : StructureType.Image , title : 'Image' , src : '' , alt : 'Image Alt'},
      text : {id : 1 , type : StructureType.Text , title : 'Text' , value : 'INTRODUCING OUR NEW ' +
          'Kitchen-Suite\n' +
          'Bring home a suite fit for the\n' +
          'family.'},
      link : {id : 2 , type : StructureType.Url , title : 'View All Our Appliances' , value : ''}
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
