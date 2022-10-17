<template>
  <div>
    <img src="/blocks/ProductBigContent.png" alt="">
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockProductBigContent extends Vue {
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
        blackTitle: {id : 1, type: StructureType.String, title: 'Black Title', value: 'Big Screen'},
        coloredTitle: {id : 1, type: StructureType.String, title: 'Colored Title', value: 'big entertainment'},
        smallTitle: {id : 2 , type: StructureType.String, title: 'Small Title', value: 'L5G SERIES - 4K SMART LASER TV'},
        paragraph: {
          id : 3,
          type: StructureType.Text,
          title: 'Paragraph Text',
          value: 'Get movie theater immersion with the convenience of TV. The L5G’s ultra-short throw projection technology allows you to place the projector just inches from the screen and gives you a beautifully bright, 4K image that’s 3x bigger than a 55-inch TV. With built-in features like Dolby Atmos® sound, smart Android TV, Game Mode, Filmmaker Mode, and a 25,000 hour laser life, the L5G is an all-in-one, big screen upgrade you can enjoy for years to come.'
        }
      }
    }
  }
  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
}
</script>

<style type="text/css"></style>
