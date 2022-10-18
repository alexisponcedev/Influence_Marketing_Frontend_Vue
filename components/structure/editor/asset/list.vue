<template>
  <v-card>
    <v-card-title>
      Uploaded Asset Files
    </v-card-title>

    <v-card-text>
      <v-row>

        <form-field-text :field="searchField" v-model="search"/>

        <v-col cols="2" class="py-0 pb-6 word-wrap-break-word">
          <button class="tw-p-3.5 tw-bg-gray-100 tw-rounded tw-border tw-border-gray-200 tw-border-solid"
                  @click="addNewAsset">
            <v-icon>mdi-cloud-upload</v-icon>
          </button>
        </v-col>
      </v-row>


      <div class="tw-space-y-2 tw-max-h-80 tw-overflow-y-auto no-scrollbar">
        <structure-editor-asset-item
          v-for="asset in Api.Asset.all.slice(0,20)" :key="asset.id"
          :asset="asset"
          @selected="selected"/>
      </div>

      <v-progress-linear class="tw-mt-2" v-show="Api.Asset.loading" indeterminate color="cyan"/>

    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="cancel" text color="red"> Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel, Emit} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";
import {Api} from "~/utils/store-accessor";
import {Asset} from "~/repositories";

@Component
export default class StructureAssetList extends Vue {
  @VModel({type: StructureField}) item!: StructureField

  Api = Api;

  assets: Asset[] = [];

  search: string = '';

  searchField = {
    label: '',
    placeholder: 'asset name or title',
    rules: [],
    colAttrs: {cols: 10}
  }

  mounted() {
    this.getAssets();
  }

  _timer : any = null;

  searchWithDebounceTime() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.getAssets();
    }, 700);
  }


  async getAssets() {
    if (this.search)
      await Api.Asset.searchAssets(this.search)
    else
      await Api.Asset.getAll()
  }

  selected(asset: Asset) {
    this.$emit('selected', asset);
  }

  addNewAsset() {
    this.$emit('addNewAsset');
    return true;
  }

  cancel() {
    this.$emit('cancel');
    return true;
  }

  @Watch('search')
  searchUpdated() {
    this.searchWithDebounceTime()
  }

}
</script>
