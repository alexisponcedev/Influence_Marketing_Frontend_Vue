<template>
  <div>
    <div v-if="placeholder">
      <div class="tw-flex tw-items-center tw-space-x-3 tw-border tw-border-solid tw-border-gray-200 tw-rounded-xl tw-p-1.5 hover:tw-bg-gray-100 tw-cursor-pointer tw-animate-pulse">
        <div class="tw-h-14 tw-w-32  tw-bg-gray-100 tw-rounded-lg" />
        <div class="tw-flex-1 tw-space-y-2.5">
          <div class="tw-bg-gray-100 tw-rounded-xl tw-h-4 tw-bg-gray-100"/>
          <div class="tw-gray-700 tw-flex tw-justify-between">
            <div class="tw-bg-gray-100 tw-rounded-xl tw-h-4 tw-w-20" />
            <div class="tw-bg-gray-100 tw-rounded-xl tw-h-4 tw-w-20" />
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!isEmpty"
         class='tw-flex tw-items-center tw-space-x-3 tw-border tw-border-solid tw-border-gray-200 tw-rounded-xl tw-p-1.5 hover:tw-bg-gray-100 tw-cursor-pointer'
         :title="model.name"
         @click="select">

      <img :src="model.image" alt="image address" class="tw-h-14 tw-max-w-52 tw-object-cover "/>

      <div>
        <div class="product-detail tw-line-clamp-1">{{ model.name }}</div>
        <div class="tw-gray-700 tw-flex tw-justify-between">
          <span>{{ model.model }}</span>
          <span class="tw-text-cyan-500" v-if="model.isNew || true">New</span>
        </div>
      </div>

    </div>
  </div>


</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class LandingSlider extends Vue {
  @Prop(Number) readonly id: number | undefined
  @Prop(Boolean) readonly placeholder!: boolean
  @VModel({type: Object}) model!: any

  // get Image() {
  //   return !this.isEmpty && this.model
  //   && this.model.media
  //   && this.model.media.url !== ''
  //     ?
  //     this.model.media.url
  //     :
  //     "https://assets.hisense-usa.com/assets/GalleryImages/Product/475/cbf5a253da/a4gv___ScaleMaxWidthWzY0MF0.png";
  // }

  get isEmpty(): Boolean {
    return this.model && Object.keys(this.model).length === 0;
  }
  select(){
    console.log('selected product : ' , this.model);
    this.$emit('select' , this.model);
  }
}
</script>
