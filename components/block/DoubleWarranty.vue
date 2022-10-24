<template>
  <div>
    <img src="/blocks/DoubleWarranty.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockDoubleWarranty extends Vue {
  @Prop(Number) readonly id: number | undefined;
  @Prop(Number) readonly product_id!: number;
  @VModel({type: Object}) model!: Object;

  Theme = Theme;

  reset() {
    this.model = {
      theme: {
        id: 0,
        type: StructureType.Select,
        title: "Theme",
        value: Theme.dark,
        items: [
          {title: "Light", value: this.Theme.light},
          {title: "Dark", value: this.Theme.dark},
        ],
      },
      image: {
        id: 1, type: StructureType.Image, title: 'Image',
        src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/33402cb3e2/2-yr-Warranty-Badge-copy__ScaleMaxWidthWzMwNDhd.png-e38njy.png',
        alt: 'Image Alt'
      },
      title : {id : 2 , type : StructureType.String , title : 'Title' , value : '**Get double the warranty with Hisense Google TVs!'},
      grayTitle : {id : 3 , type : StructureType.String , title : 'gray Title' , value : '**compared to the 1 year industry standard.'},
    };
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
