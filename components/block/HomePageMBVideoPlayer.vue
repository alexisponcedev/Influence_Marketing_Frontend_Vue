<template>
  <div>
    <img src="/blocks/HomePageMBVideoPlayer.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";


@Component
export default class HomePageMBVideoPlayer extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({ default: true }) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset(){
    this.model = {
      video : {
        id : 0 ,
        type : StructureType.String,
        title : 'Video Url' ,
        value : 'https://player.vimeo.com/video/408847720?autoplay=1&amp;muted=1&amp;loop=1&amp;controls=0&amp;background=1'},
    }
  }

  mounted() {
    if (this.isEmpty) this.reset();
  }

  clicked(){
    console.log('you have clicked me easily ');
    this.$emit('click');
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
