<template>
  <div>
    <img src="/blocks/ExtendedWarrantyProductsSlider.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";


@Component
export default class ExtendedWarrantyProductsSlider extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: any

  categories: Array<any> = [];

  reset() {
    this.model = {
      list: {
        id: 0,
        type: StructureType.List,
        title: "List",
        newItem: {
          image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
          link: {id: 1, type: StructureType.Url, title: 'Link', value: ''},
          category: {
            id: 3,
            type: StructureType.Select,
            title: 'Select Category',
            value: this.categories.length > 0 ? this.categories[0].id : 0,
            itemText: 'name',
            itemValue: 'id',
            items: this.categories
          },
        },
        value: [
          {
            image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
            link: {id: 1, type: StructureType.Url, title: 'Link', value: ''},
            category: {
              id: 3,
              type: StructureType.Select,
              title: 'Select Category',
              value: this.categories.length > 0 ? this.categories[0].id : 0,
              itemText: 'name',
              itemValue: 'id',
              items: this.categories
            },
          }
        ]
      }

    }
  }

  async mounted() {
    this.categories = (await this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getCategories')).data
    if (this.isEmpty) this.reset();
    else{
      this.model.list.value.forEach((item: any) => {
        if(item.category) item.category.items = this.categories;
      })
      if(this.model.list.newItem.category)
        this.model.list.newItem.category.items = this.categories;
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
