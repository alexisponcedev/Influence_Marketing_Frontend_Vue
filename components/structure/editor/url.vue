<template>
  <div class="tw-w-full" :class="{'tw-px-2' : hasBackground}">
    <div class="tw-mb-1" v-if="showTitle"> {{ model.title }}</div>

    <div class=""
         :class="{ 'tw-flex tw-space-x-2' : inline ,
         'tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-pt-1' : hasBackground}"
         :style="{'backgroundColor': hasBackground ?  '#fdfdfd' : 'transparent'}">

      <form-field-text v-if="showTitle" :field="titleField" v-model="model.title"/>

      <form-field-select :field="typeField" v-model="type"/>

      <form-field-select-page-name v-if="type === UrlTypeEnum.Internal" :field="selectField" v-model="route"/>

      <form-field-text v-if="type === UrlTypeEnum.Internal" :field="queryField" v-model="query"/>

      <form-field-text v-if="type === UrlTypeEnum.Custom" :field="urlFiled" v-model="model.value"/>

      <form-field-text v-if="type === UrlTypeEnum.openChannelAdvisor" :field="productField" v-model="productModel"/>

      <structure-editor-id-selector v-if="type === UrlTypeEnum.anchor" :field="anchorField" v-model="model"/>
    </div>
    <p class="tw-text-blue-500 tw-my-1 tw-pl-1">{{ model.value }}</p>

  </div>

</template>

<script lang="ts">
import {Component, Prop, VModel, Vue, Watch} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";
import {UrlTypeEnum} from "~/interfaces/UrlTypeEnum";
import {Api} from "~/utils/store-accessor";


@Component
export default class StructureUrlEditor extends Vue {

  @Prop({
    type: Array, default: () => [
      {title: 'Page URLs', value: UrlTypeEnum.Internal},
      {title: 'Custom URL', value: UrlTypeEnum.Custom},
      {title: 'Open Channel Advisor', value: UrlTypeEnum.openChannelAdvisor},
      {title: 'Section or Anchor', value: UrlTypeEnum.anchor}
    ]
  }) options!: any
  @Prop({
    type: Object, default: () => {
    }
  }) rebuild!: any
  @Prop({type: Boolean, default: true}) hasBackground!: Boolean
  @Prop({type: Boolean, default: false}) disableTitle!: Boolean
  @Prop({type: Boolean, default: true}) showTitle!: Boolean
  @Prop({type: Boolean, default: false}) inline!: Boolean
  @VModel({type: StructureField}) model!: StructureField

  UrlTypeEnum = UrlTypeEnum;

  Api = Api;

  type = UrlTypeEnum.Internal;
  route = '';
  query = '';
  anchor = '';

  productModel = '';

  typeField = {
    label: 'Link Type',
    rules: [],
    'item-text': 'title',
    'item-value': 'value',
    colAttrs: {cols: this.inline ? 2 : 12},
    items: this.options
  }

  titleField = {
    label: "Url Title",
    placeholder: 'Enter Title',
    rules: [],
    disabled: this.disableTitle,
    colAttrs: {cols: this.inline ? 3 : 12},
  }

  anchorField = {
    label: "Select Section",
    placeholder: 'Select a Section',
    rules: [],
    colAttrs: {cols: this.inline ? 6 : 12},
  }

  productField = {
    label: "Product Model",
    placeholder: 'Enter Product Model',
    rules: [],
    colAttrs: {cols: this.inline ? 6 : 12},
  }

  selectField = {
    label: "Page URL",
    placeholder: 'Enter page name',
    'item-text': 'title',
    'item-value': 'route',
    rules: [],
    colAttrs: {cols: this.inline ? 3 + (this.showTitle ? 0 : 3) : 12},
  }

  urlFiled = {
    label: "Custom URL",
    placeholder: 'Enter a valid url',
    rules: [],
    colAttrs: {cols: this.inline ? 6 : 12},
  }

  queryField = {
    label: "Query params (optional)",
    placeholder: 'filter=55&category_id=3...',
    rules: [],
    colAttrs: {cols: this.inline ? 3 : 12},
  }

  async prepare() {
    console.log('prepare : ', this.model, this.model.value);
    return new Promise((resolve, reject) => {
      this.selectField.label = this.model.title ?? 'field';
      if (this.model && this.model.value) {
        if (this.model.value && this.model.value.startsWith('#')) {
          this.type = UrlTypeEnum.anchor;
        } else if (this.model.value && this.model.value.startsWith('openChannelAdvisor:')) {
          this.productModel = this.model.value.replace('openChannelAdvisor:', '')
        } else {
          let arr = this.model.value.split('?');
          this.route = arr[0];
          this.query = arr.length > 1 ? arr[1] : '';
        }
      } else {
        this.route = '';
        this.query = '';
      }
      resolve(true);
    });
  }

  updateType() {
    console.log('update type : ');
    if (this.model.value && this.model.value.startsWith('#'))
      this.type = UrlTypeEnum.anchor
    else if (this.model.value && this.model.value.startsWith('openChannelAdvisor:'))
      this.type = UrlTypeEnum.openChannelAdvisor
    else if (this.model.value && this.model.value.includes('https://'))
      this.type = UrlTypeEnum.Custom
    else if (this.model.value && !Api.Page.routes.map(i => i.route).includes(this.model.value))
      this.type = UrlTypeEnum.Custom;
    else
      this.type = UrlTypeEnum.Internal;
  }

  mounted() {
    this.prepare().then(this.updateType);
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

  @Watch('value', {deep: true, immediate: true})
  onValueChanged(value: any, oldValue: any) {
    this.model = value;
    this.prepare()
    // .then(this.updateType);
  }

  @Watch('model', {immediate: true, deep: true})
  onModelUpdated() {
    this.$emit('update:url', this.model);
  }

  @Watch('rebuild', {immediate: true, deep: true})
  onRebuild() {
    console.log('on rebuild  fired: ')
    this.updateType()
  }


}
</script>
