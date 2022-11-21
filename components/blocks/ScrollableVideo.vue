<template>
  <div>
    <img src="/blocks/ScrollableVideo.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeScrollableVideo extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      video : {id : 1 , type : StructureType.String , title : 'Video' , value : 'https://player.vimeo.com/external/589889816.hd.mp4?s=3a4d44392283549cd4e6b8172bb7b8342ec44062&profile_id=175'},
      text: { id: 0, type: StructureType.Text, title: 'Text', value: '<p class="ql-align-center">Meet the L9G TriChroma Laser TV. Inspired by a world of incredible color. A true feast for your eyes at a scale that makes everything feel brand new.</p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center">From $5,499</p>' },
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
