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
  @VModel({type: Object}) model!: any

  categories: Array<any> = [];

  reset() {
    this.model = {
      title: {id: 0, type: StructureType.String, title: 'Title', value: 'Spotlight Releases'},
      tabs: {
        id: 1, type: StructureType.List, title: 'List',
        newItem: {
          title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'Televisions'},
          category: {
            id: 1,
            type: StructureType.Select,
            title: 'Select Category',
            value: this.categories.length > 0 ? this.categories[0].id : 0,
            itemText: 'name',
            itemValue: 'id',
            items: this.categories
          },
          count: {id: 2, type: StructureType.String, title: 'Product Count', value: ''}
          // products: {
          //   id: 2, type: StructureType.List, title: 'Products',
          //   newItem: {},
          //   value: [
          //     {
          //       model: {id: 0, type: StructureType.String, title: 'Product Model', value: ''},
          //       link: {id: 1, type: StructureType.Url, title: 'Explore the U6H', value: '/'}
          //     }
          //   ]
          // }
        },
        value: [
          {
            title: {id: 0, type: StructureType.String, title: 'Tab Title', value: 'Televisions'},
            category: {
              id: 1,
              type: StructureType.Select,
              title: 'Select Category',
              value: this.categories.length > 0 ? this.categories[0].id : 0,
              itemText: 'name',
              itemValue: 'id',
              items: this.categories
            },
            count: {id: 2, type: StructureType.String, title: 'Product Count', value: ''}

            // products: {
            //   id: 2, type: StructureType.List, title: 'Products',
            //   newItem: {},
            //   value: [
            //     {
            //       model: {id: 0, type: StructureType.String, title: 'Product Model', value: ''},
            //       link: {id: 1, type: StructureType.Url, title: 'Explore the U6H', value: '/'}
            //     }
            //   ]
            // }
          }
        ]
      }
    }
  }

  async mounted() {
    this.categories = (await this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getCategories')).data
    if (this.isEmpty) this.reset();
    else {
      this.model.tabs.value.forEach((item: any) => {
        if (item.category) item.category.items = this.categories;
      })
      if (this.model.tabs.newItem.category)
        this.model.tabs.newItem.category.items = this.categories;
    }
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
