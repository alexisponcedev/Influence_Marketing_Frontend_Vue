<template>
  <div>
    <img src="/blocks/CESPX1Header.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class CESPX1Header extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      title : {id : 0 , type : StructureType.Text , title : 'Title' , value : '<h2>PX1-PRO <br/> Trichroma Laser Cinema</h2>'},
      subtitle : {id : 1 , type : StructureType.Text , title : 'Subtitle' , value : '<h3>Triple-Lazer UST <br/> Built for home theater</h3>'},
      link : {id : 2 , type : StructureType.Url , title : 'Learn More' , value : '/' },
      image : {id : 3 , type : StructureType.Image , title : 'Image' , src : '' , alt : 'Image Alt'},
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
