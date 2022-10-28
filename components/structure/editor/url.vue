<template>
  <div class="tw-px-2">
    <div class="tw-mb-1"> {{ model.title }}</div>

    <div class="tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-pt-1" style="background-color: #fdfdfd">

      <form-field-text :field="titleField" v-model="model.title"/>

      <form-field-select :field="typeField" v-model="type"/>

      <form-field-select-page-name v-if="type === LinkType.Internal" :field="selectField" v-model="route"/>
      <form-field-text v-if="type === LinkType.Internal" :field="queryField" v-model="query"/>

      <form-field-text v-if="type === LinkType.External" :field="urlFiled" v-model="model.value"/>

      <form-field-text v-if="type === LinkType.openChannelAdvisor" :field="productField" v-model="productModel"/>
    </div>
    {{ model.value }}
  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";
import Validation from "~/utils/validation";

enum LinkType {
  Internal = 'internal',
  External = 'external',
  openChannelAdvisor = 'openChannelAdvisor',
}

@Component
export default class StructureUrlEditor extends Vue {
  @VModel({type: StructureField}) model!: StructureField

  LinkType = LinkType;

  type = LinkType.Internal;
  route = '';
  query = '';

  productModel = '';

  typeField = {
    label: 'Link Type',
    rules: [],
    'item-text': 'title',
    'item-value': 'value',
    colAttrs: {cols: 12},
    items: [
      {title: 'Internal URL', value: LinkType.Internal},
      {title: 'External URL', value: LinkType.External},
      {title: 'Open Channel Advisor', value: LinkType.openChannelAdvisor}
    ]
  }
  titleField = {
    label: "Url Title",
    placeholder: 'Enter Title',
    rules: [],
    colAttrs: {cols: 12},
  }
  productField = {
    label: "Product Model",
    placeholder: 'Enter Product Model',
    rules: [],
    colAttrs: {cols: 12},
  }
  selectField = {
    label: "Page URL",
    placeholder: 'Enter page name',
    'item-text': 'title',
    'item-value': 'absolute',
    rules: [],
    colAttrs: {cols: 12},
  }
  urlFiled = {
    label: "External URL",
    placeholder: 'Enter a valid url',
    rules: [],
    colAttrs: {cols: 12},
  }
  queryField = {
    label: "Query params (optional)",
    placeholder: 'filter=55&category_id=3...',
    rules: [],
    colAttrs: {cols: 12},
  }

  mounted() {
    this.selectField.label = this.model.title ?? 'field';
    if (this.model.value) {
      let arr = this.model.value.split('?');
      this.route = arr[0];
      this.query = arr.length > 1 ? arr[1] : '';
      this.type = this.model.value.includes('https://') ? LinkType.External : LinkType.Internal;
    }
  }

  @Watch('route')
  @Watch('query')
  onChanged() {
    this.model.value = this.route + (this.query.length > 0 ? '?' + this.query : '');
  }

  @Watch('productModel')
  onProductModelChanged() {
    this.model.value = 'openChannelAdvisor:' + this.productModel.toUpperCase()
  }



}
</script>
