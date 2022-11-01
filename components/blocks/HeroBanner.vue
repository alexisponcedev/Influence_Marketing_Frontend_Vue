<template>
  <div>
    <img src="/blocks/HeroBanner.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeHeroBanner extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      video : {id : 1 , type : StructureType.String , title : 'Video' , value : 'https://player.vimeo.com/external/592327208.hd.mp4?s=8bdcaebd3de4874d5dbc3a573ec7f7e2eda1aa6e&profile_id=175'},
      desktopIntroImage:{id : 2 , type : StructureType.Image , title : 'Desktop Intro Image' , src : 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/TriChroma-Desktop-logo-lockup-L9G-outlined.svg' , alt : 'Desktop Intro Image'},
      desktopImage:{id : 3 , type : StructureType.Image , title : 'Desktop Image' , src : 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/TriChromaHero-device.png' , alt : 'Device Desktop'},
      mobileImage:{id : 4 , type : StructureType.Image , title : 'Desktop Image' , src : 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/TriChromaHero-device-mobile-new.jpg' , alt : 'Device Mobile'},
      mobileText : {id : 5 , type : StructureType.Text , title : 'Mobile Text' , value : '<p class="ql-align-center">Meet the L9G TriChroma Laser TV. Inspired by a world of incredible color. A true feast for your eyes at a scale that makes everything feel brand new.</p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center">From $5,499</p>'},
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
