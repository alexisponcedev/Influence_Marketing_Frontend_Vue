<template>
  <div>
    <img src="/blocks/BlogHead.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class BlogHead extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
      sharingTitle: {id: 1, type: StructureType.String, title: 'Sharing Title', value: ''},
      list: {
        id: 2, type: StructureType.List, title: 'List',
        newItem: {
          link: {id: 0, type: StructureType.Url, title: 'Link', value: ''},
        },
        value: [
          {
            link: {id: 0, type: StructureType.Url, title: 'Link', value: ''},
          }
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
