<template>
  <div class="tw-space-y-2">
    <div v-for="(item , index) in model" :key="index">
      <v-row v-if="editing === index" align="start">
        <form-field-text :field="textField" v-model="item.name"/>
        <form-field-select-page-name
          :field="urlField"
          v-model="item.url"
          :rules="[]"
          placeholder="p"
        />
        <v-col justify="center">
          <v-btn icon elevation="0" text @click="confirm">
            <v-icon class="red--text">mdi-check</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div v-else class="tw-flex tw-items-center tw-justify-between tw-bg-gray-50 tw-rounded-xl tw-p-4">
        <div class="tw-text-base  tw-flex-1">{{ item.name }}</div>
        <div class="tw-flex-1">{{ item.url }}</div>
        <div class="tw-flex tw-items-center tw-space-x-4">
          <button @click="edit(index)">
            <v-icon small class="gray--text">mdi-pencil</v-icon>
          </button>
          <button @click="remove(index)">
            <v-icon small class="red--text">mdi-delete</v-icon>
          </button>
        </div>
      </div>
    </div>

    <button
      @click="addNew"
      class="tw-border tw-border-dashed tw-bg-gray-50  tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3 hover:tw-bg-gray-200">
      Add New Item
    </button>

  </div>
</template>
<script lang="ts">
import {Vue, Component, VModel} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";
import {Page} from "~/repositories";

@Component
export default class MenuItemEditor extends Vue {
  @VModel({type: Array}) model!: any
  Api = Api;

  editing: number = -1;

  textField = {
    label: '',
    placeholder: 'enter name',
    rules: [],
    colAttrs: {cols: 4},
  }

  urlField = {
    label: "",
    placeholder: 'Enter page name',
    'item-text': 'title',
    'item-value': 'value',
    rules: [],
    colAttrs: {cols: 7},
  }

  pages: Array<any> = [];

  edit(index: number) {
    this.editing = index;
  }

  remove(index: number) {
    this.model.splice(index, 1);
  }

  addNew() {
    this.model.push({
      id: this.model.length + 1,
      name: 'Sample Title',
      url: '/'
    })
    this.edit(this.model.length - 1)
  }

  confirm(){
    this.editing = -1;
  }

}
</script>

