<template>
  <div class="tw-p-2">
    <label>
      {{ model.title }}
    </label>


    <button @click="show = true" class="tw-text-center tw-w-full">
      <div v-if="model.src" class="tw-flex tw-items-center tw-justify-center tw-space-x-2  tw-bg-white tw-py-3.5 tw-px-2 tw-rounded-lg  hover:tw-bg-blue-200">
        <img class="tw-w-10 tw-object-cover tw-max-h-8 tw-rounded" :src="model.src" alt="alt about imgae">
        <div class="tw-line-clamp-1">{{model.alt}}</div>
      </div>
      <div v-else class="tw-flex tw-items-center tw-justify-center tw-space-x-2  tw-bg-white tw-py-3.5 tw-rounded-lg tw-text-center tw-w-full hover:tw-bg-blue-200">
        <span>select or upload asset</span>
        <v-icon>mdi-cloud-upload</v-icon>
      </div>
    </button>

    <v-dialog v-model="show" max-width="500">
      <structure-editor-asset-upload
        v-if="showUploadBox"
        v-model="model"
        :type="type"
        @uploaded="selected"
        @cancel="showUploadBox = false"/>

      <structure-editor-asset-list
        v-else
        @selected="selected"
        @cancel="close"
        @addNewAsset="showUploadBox = true"/>
    </v-dialog>


  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";
import {Api} from "~/utils/store-accessor";
import {Asset} from "~/repositories";
import {AssetTokens} from "~/models/AssetTokens";

@Component
export default class StructureImageEditor extends Vue {
  @Prop(String) readonly type!: AssetTokens
  @VModel({type: StructureField}) model!: StructureField

  Api = Api;

  showUploadBox: Boolean = false;

  show: Boolean = false;

  selected(asset: Asset) {
    console.log('you have selected asset : ', asset);
    this.model.src = asset.url!;
    this.model.alt = asset.description!;
    this.close();
  }

  close() {
    this.show = false;
    this.showUploadBox = false;
  }
}
</script>
