<template>
  <div>
    <img src="/blocks/BlockSpotlight.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class BlockSpotlight extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: Object

  reset() {
    this.model = {
      title: {id: 0, type: StructureType.String, title: 'Title', value: 'Spotlight Releases'},
      tabs: {
        id: 1, type: StructureType.List, title: 'List',
        newItem: {
          title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'Televisions'},
          products: {
            id: 1, type: StructureType.List, title: 'Products',
            newItem: {},
            value: [
              {
                model: {id: 0, type: StructureType.String, title: 'Product Model', value: ''},
                link: {id: 1, type: StructureType.Url, title: 'Explore the U6H', value: '/'}
              }
            ]
          }

        },
        value: [
          {
            title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'Televisions'},
            products: {
              id: 1, type: StructureType.List, title: 'Products',
              newItem: {},
              value: [
                {
                  model: {id: 0, type: StructureType.String, title: 'Product Model', value: ''},
                  link: {id: 1, type: StructureType.Url, title: 'Explore the U6H', value: '/'}
                }
              ]
            }

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
