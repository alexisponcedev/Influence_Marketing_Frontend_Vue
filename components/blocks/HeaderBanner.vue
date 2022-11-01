<template>
  <div>
    <img src="/blocks/HeaderBanner.png" alt=""/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockHeaderBanner extends Vue {
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
      mobile: {
        id: 1, type: StructureType.Image, title: 'Mobile Image',
        src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/8d994c5faa/MobileHeader__ScaleMaxWidthWzMwNDhd.jpg-p5h3yt.jpg',
        alt : 'Image Data',
      },
      tablet: {
        id: 2, type: StructureType.Image, title: 'Tablet Image',
        src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/8d994c5faa/MobileHeader__ScaleMaxWidthWzMwNDhd.jpg-p5h3yt.jpg',
        alt : 'Image Data',
      },
      desktop: {
        id: 3, type: StructureType.Image, title: 'Desktop Image',
        src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/3cd5e3c19c/HUSA-100-Day-v-copy-2__ScaleMaxWidthWzMwNDhd.png-gs3474.png',
        alt : 'Image Data',
      },
      text : {
        id : 4 ,
        type : StructureType.Text ,
        title : 'Text' ,
        value : '<h5 class="ql-align-center">From September 1st - October 31st,</h5><h4 class="ql-align-center">BUY A <span style="color: rgb(255, 187, 243);">65"OR LARGER</span> HISENSE GOOGLE TV WITH A </h4><h4 class="ql-align-center">100 DAY GUARANTEE <span style="color: rgb(255, 187, 243);">AND </span>GET AWARDED <span style="color: rgb(255, 187, 243);">$100*</span></h4>'}
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
