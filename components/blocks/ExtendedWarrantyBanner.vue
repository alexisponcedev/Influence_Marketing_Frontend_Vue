<template>
  <div>
    <img src="/blocks/ExtendedWarrantyBanner.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class ExtendedWarrantyBanner extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
      title: {id: 1, type: StructureType.Text, title: 'Title', value: ''},
      showSearch: {
        id: 2,
        type: StructureType.Select,
        title: 'Show Search',
        value: true,
        items: [
          {title: 'Show', value: true},
          {title: "Don't show", value: false},
        ]
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
