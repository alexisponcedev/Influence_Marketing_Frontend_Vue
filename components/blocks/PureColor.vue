<template>
  <div>
    <img src="/blocks/PureColor.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomePureColor extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      title: {id: 0, type: StructureType.String, title: 'Title', value: '3 Pure-Color Lasers.'},
      video: {
        id: 1,
        type: StructureType.Video,
        title: 'Video',
        value: 'https://player.vimeo.com/external/585404879.hd.mp4?s=862ec08597335d11ae1fc97988b9711a9182d37f&profile_id=175'
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
  onValueChanged() {
    if (this.isEmpty) this.reset();
  }
}
</script>
