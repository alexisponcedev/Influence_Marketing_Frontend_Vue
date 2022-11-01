<template>
  <div>
    <img src="/blocks/CESPX1ImageAndText1.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class CESPX1ImageAndText1 extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      text: {
        id: 0,
        type: StructureType.Text,
        title: 'Text',
        value: ''
      },
      slider: {
        id: 1, type: StructureType.List, title: 'Slider Images',
        newItem: {
          image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
        },
        value: [
          {
            image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
          }
        ]
      }

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
