<template>
  <div v-if="asset" class="tw-flex tw-items-center tw-space-x-2 tw-cursor-pointer hover:tw-bg-green-50 tw-transition tw-duration-200 tw-p-1.5 tw-rounded-lg">
    <img  :src="asset.thumb ?? asset.url" @click="selected"
          class="tw-object-cover tw-h-12  tw-w-16 tw-rounded tw-bg-gray-100"
          alt="asset file" />
    <div class="tw-flex-1 tw-flex tw-flex-col tw-justify-center" @click="selected">
      <div class="tw-mb-1 tw-text-gray-600 tw-font-bold">{{  asset.title }}</div>
      <div>{{  asset.description }}</div>
    </div>
    <div>
      <button @click="deleteAsset">
        <v-icon>mdi-delete</v-icon>
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";

@Component
export default class StructureImageEditor extends Vue {
  @Prop(Object) readonly asset!: any

  Api = Api;

  selected() {
    this.$emit('selected' , this.asset);
  }

  deleteAsset() {
    Api.Asset.delete(this.asset.id).then(Api.Asset.getAll);
  }
}
</script>

