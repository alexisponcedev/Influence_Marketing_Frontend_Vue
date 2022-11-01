<template>
    <div>
        <img src="/blocks/HomeApplianceTextBoxWithImage.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";


@Component
export default class BlockHomeApplianceTextBoxWithImage extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({ type: Object }) model!: Object

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    reset(){
      this.model = {
        theme: {
          id: 0,
          type: StructureType.Select,
          title: 'Theme',
          value: Theme.light,
          items: [
            { title: 'Light', value: this.Theme.light },
            { title: 'Dark', value: this.Theme.dark },
          ]
        },
        title: {
          id: 1, type: StructureType.String, title: 'Title', value: 'Stylish, Roomy and Modern'
        },
        coloredTitle: {
          id: 2, type: StructureType.String, title: 'Colored Title', value: 'DISHWASHER'
        },
        paragraph: {
          id: 3, type: StructureType.Text, title: 'Paragraph', value: 'Seamlessly integrating premium design with cutting-edge technology, the Hisense Dishwasher is perfect for large families. A stainless steel finish, condensation drying and movable upper basket, are just some of the features that make this a must-have for your kitchen a wise choice.'
        },
        image: {
          id: 4,
          type: StructureType.Image,
          title: 'Image',
          src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/7ef1e22810/Artboard-1__ScaleMaxWidthWzMwNDhd.png-5i5s5q.png',
          alt: 'Some note about this image',
        },
        link:{
          id : 5,
          type : StructureType.Url,
          title : 'Shop Now URL',
          value : '/'
        }
      }
    }
    mounted() {
        if (this.isEmpty) this.reset();
        // this.loadProduct();
    }

    loadProduct() {
        // this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/' + this.product_id )
        this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/781')
            .then(res => {
                this.product = res.data;
            }).finally(() => {
                this.loadingProduct = false;
            })
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

  @Watch('isEmpty')
  onValueChanged(){

    if(this.isEmpty) this.reset();
  }
}
</script>

<style type="text/css">

</style>
