<template>
  <div>
    <img src="/blocks/ExtendedWarrantyFeatureBlocks.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class ExtendedWarrantyFeatureBlocks extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      backgroundColor: {id: 0, type: StructureType.Color, title: 'Background Color', value: ''},
      title: {id: 1, type: StructureType.String, title: 'Title', value: ''},
      list: {
        id: 2,
        type: StructureType.List,
        title: 'List',
        newItem: {
          image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
          text: {id: 1, type: StructureType.Text, title: 'Text', value: ''},
          link: {id: 2, type: StructureType.Url, title: 'Link', value: ''},
        },
        value: [
          {
            image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
            text: {id: 1, type: StructureType.Text, title: 'Text', value: ''},
            link: {id: 2, type: StructureType.Url, title: 'Link', value: ''},
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
