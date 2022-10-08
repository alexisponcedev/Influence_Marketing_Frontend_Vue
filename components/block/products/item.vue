<template>
  <div v-if="!isEmpty" class='product-container'>

    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="product-class">50" Class</div>
      <div class="product-model">100L5G-DLT100B</div>
    </div>

    <div class="product-new "> New</div>

    <img
      src="https://assets.hisense-usa.com/assets/GalleryImages/Product/475/cbf5a253da/a4gv___ScaleMaxWidthWzY0MF0.png"
      alt="image address"
      class="product-image tw-mb-6">

    <div class="product-series tw-mb-12">Laser Series</div>

    <div class="product-detail tw-mb-6">100" 4K Smart Laser TV</div>

    <div class="tw-flex tw-justify-center tw-items-center tw-space-x-2  tw-mb-6">
      <div class="product-coming-soon">Comming Soon</div>
      <div class="product-link">View Product</div>
    </div>

    <div class="tw-flex tw-items-center tw-justify-center tw-space-x-4">
      <img src="@/assets/svgs/compare.svg" alt="compare icon">
      <span class="compare-text">Add to compare</span>
    </div>

  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class LandingSlider extends Vue {
  @Prop(Number) readonly id: number | undefined
  @VModel({type: Object}) model!: any

  mounted() {
    if (this.isEmpty)
      this.model = {
        url: {
          id: 0,
          type: StructureType.Url,
          title: 'PIM URL',
          value: 'https://load-from-pim-server.com/api',
        },
      }
  }

  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
}
</script>

<style scoped>
.product-container {
  padding: 29px;
}

.product-class {
  font-family: 'hisense', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  color: #565656;
}

.product-model {
  font-family: 'hisense', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  text-align: right;
  color: #5A5B75;
}

.product-new {
  font-family: 'hisense', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  text-align: right;
  color: #00CCCC;
}

.product-image {
  max-height: 221px;
}

.product-class {
  border: 1px solid #A2A2A2;
  border-radius: 7px;
  padding: 3px;

  font-family: 'hisense', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #565656;
}

.product-series {
  font-family: 'hisense', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 36px;
  text-align: center;
  color: #00CCCC;
}

.product-detail {
  font-family: 'hisense', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 26px;
  text-align: center;
  color: #5A5B75;
}

.product-coming-soon {

  background-color: #D0D0D0;
  font-family: 'hisense', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 48px;
  width: 100%;
  text-align: center;
  color: #FFFFFF;
}

.product-link {
  background: #00CCCC;
  font-family: 'hisense', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 48px;
  text-align: center;
  width: 100%;

  color: #FFFFFF;
}

.compare-text {
  font-family: 'hisense', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 48px;
  text-align: center;
  color: #000000;
}
</style>
