<template>
  <div>
    <img src="/blocks/BlogDescriptionBox.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class BlogDescriptionBox extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      text: {id: 0, type: StructureType.Text, title: 'Text', value: ''},
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
