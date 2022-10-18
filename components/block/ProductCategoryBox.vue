<template>
  <div>
    <img src="/blocks/ProductCategoryBox.png" alt="">
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockProductCategoryBox extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop(Number) readonly product_id!: number
  @VModel({type: Object}) model!: Object

  Theme = Theme;

  mounted() {
    if (this.isEmpty) {
      this.model = {
        theme: {
          id: 0,
          type: StructureType.Select,
          title: 'Theme',
          value: Theme.dark,
          items: [
            {title: 'Light', value: this.Theme.light},
            {title: 'Dark', value: this.Theme.dark},
          ]
        },
        WhereToBuy:{
          id : 1 ,
          type : StructureType
        },
        support : {
          id : 2 ,
          type : StructureType.Url,
          title : 'Support',
          value : '',
        },
        tags: {
          id : 1,
          type: StructureType.List,
          title: 'Tags',
          newItem: {
          },
          value: [
            {
              title  : { id : 0 , type : StructureType.String , title : 'Tag Title' , value : 'Sample Tag Title'},
              target : { id : 0 , type : StructureType.IdSelector , title : 'ID Selector' , value : ''},
            },
          ]
        },
      }
    }
  }
  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
}
</script>

<style type="text/css"></style>
