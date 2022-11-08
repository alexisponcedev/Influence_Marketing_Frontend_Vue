<template>
  <div>
    <img src="/blocks/CompareProduct.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class CompareProduct extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop({default: true}) readonly editable: Boolean | undefined
  @VModel({type: Object}) model!: any

  categories: Array<any> = [];

  reset() {
    this.model = {}
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
