<template>
  <v-card>
    <v-card-title>
      Asset Manager
    </v-card-title>

    <v-card-text>
      <form-field-text :field="titleField" v-model="title"/>
      <form-field-text :field="descriptionFiled" v-model="description"/>
      <form-field-file :field="fileField" v-model="file"/>
      <v-progress-linear v-if="uploading" indeterminate color="cyan"/>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="uploading" @click="upload" text color="green"> Upload</v-btn>
      <v-btn :disabled="uploading" @click="cancel" text color="red"> Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel, Emit} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";
import {Api} from "~/utils/store-accessor";
import {Asset} from "~/repositories";
import {AssetTokens} from "~/models/AssetTokens";


@Component
export default class StructureFileUploader extends Vue {
  @VModel({type: StructureField}) item!: StructureField

  Api = Api;

  file: any = null;

  uploading: Boolean = false;

  title: string = '';

  description: string = '';

  titleField = {
    label: 'Asset Title',
    placeholder: 'asset name or title',
    rules: [],
    colAttrs: {cols: 12}
  }

  descriptionFiled = {
    label: 'Asset description',
    placeholder: 'please add some note about this asset',
    rules: [],
    colAttrs: {cols: 12}
  }

  fileField = {
    label: 'File',
    placeholder: 'please select file to upload',
    rules: [],
    colAttrs: {cols: 12}
  }

  @Emit()
  cancel() {
  }


  uploaded(asset: Asset): Asset {
    this.$emit('uploaded', asset);
    return asset;
  }

  upload() {
    let formData = new FormData();
    formData.append('attachment', this.file);
    formData.append('keep_original_name', '0');

    let res = null;
    this.uploading = true;
    this.$axios.$post('https://assets.dev-api.hisenseportal.com/api/v1/upload/' + AssetTokens.image, formData)
      .then(res => {
        this.saveAsset({
          title: this.title,
          description: this.description,
          location: 'asset/image',
          extension: res.extension,
          thumb: res.view_link.replace(res.file_name, '500x500-' + res.file_name),
          url: res.view_link,
        }).then(res => {
          this.uploading = false;
        });
      });
  }

  async saveAsset(asset: Asset) {
    return await Api.Asset.create(asset)
      .then(response => {
        this.$emit('uploaded', response);
      })
  }

}
</script>
