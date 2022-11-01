<template>
  <div>
    <img src="/blocks/SmoothMotion.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeSmoothMotion extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      title : {id : 0 , type : StructureType.Text , title : 'Title' , value : '<h2>Have a healthy heap<br> of buttery - smooth motion.</h2>'},
      fadedImage : {id : 1 , type : StructureType.Image , title : "Faded Image" , src : 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-5-motion2.jpg' , alt : 'Image Alt'},
      image : {id : 2 , type : StructureType.Image , title : "Image" , src : 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-5-motion1.jpg' , alt : 'Image Alt'},
      text:{id : 3 , type : StructureType.Text , title : 'Text' , value :'<p> With microsecond level-processor response and MEMC technology the L9G ensures you never miss a moment of the action. Images are buttery-smooth and crystal clear - so whether its sports, games, or action films, the L9G is gonna give you the picture you deserve.</p>'}
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
