<template>
  <div class="tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-p-3">

    <v-row>
      <form-field-text :field="optionTitleField" v-model="model.name"/>
      <form-field-select-page-name
        :field="optionUrlField"
        v-model="model.url"
        :rules="[]"
        placeholder="p"
      />
    </v-row>

    <ul class="tw-list-none">
      <li class="optionBox" v-for="(column , index) in model.columns" :key="`option_${index}`">
        <div class="tw-flex tw-items-center tw-space-x-3 tw-p-2">
          <div class="tw-text-blue-400">
            <span>Column</span>
            <span>{{ index + 1 }}</span>
          </div>
          <button @click="remove(index)">
            <v-icon small class="red--text">mdi-delete</v-icon>
          </button>
        </div>
        <menu-items :value="column" @input="v => column = v"/>
      </li>
      <li class="tw-mt-2">
        <button
          @click="addNewColumn"
          class="tw-border tw-border-dashed tw-bg-blue-50 hover:tw-bg-blue-200 tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3">
          Add New Column
        </button>
      </li>
    </ul>




    <div class="tw-pl-6 tw-mt-4">

      <div class="tw-flex tw-items-center tw-space-x-3 tw-p-2">
        <div class="tw-text-blue-400">
          <span>Products</span>
        </div>
      </div>
      <menu-products :value="model.products" @input="v => model.products = v" />
    </div>





  </div>

</template>
<script lang="ts">
import {Vue, Component, VModel} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";
import {Page} from "~/repositories";

@Component
export default class MenuOptionEditor extends Vue {
  @VModel({type: Array}) model!: any
  Api = Api;

  optionTitleField = {
    label: '',
    placeholder: 'Option Title',
    rules: [],
    colAttrs: {cols: 4},
  }

  optionUrlField = {
    label: "",
    placeholder: 'Enter page name',
    'item-text': 'title',
    'item-value': 'value',
    rules: [],
    colAttrs: {cols: 8},
  }

  addNewColumn() {
    this.model.columns.push([{id : 0 , name: 'Sample Item', url: '/'},]);
  }

  remove(index : number) {
    this.model.columns.splice(index , 1);
  }


}
</script>

<style scoped>
.optionBox {
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 13px;
}
</style>
