<template>
  <v-col cols="12">
    <v-row>
      <form-field-select-page-name :field="selectField" v-model="parentRoute" :rules="selectField.rules"
                                   :placeholder="selectField.placeholder"/>
      <form-field-text :field="textField" v-model="pageRoute" :rules="field.rules" :placeholder="field.placeholder"
                       :readonly="typeof field.readonly === 'function' ? field.readonly() : field.readonly"
                       :disabled="typeof field.disabled === 'function' ? field.disabled() : field.disabled"/>
    </v-row>
    <div class="tw-flex tw-items-center tw-space-x-2">
      <div>Generated URL :</div>
      <div class="tw-font-bold tw-text-gray-400 tw-flex tw-items-center tw-space-x-2">
        <div class="tw-flex tw-space-x-0">
          <span>{{ parentRoute }}</span>
          <span v-if="parentRoute !== '/'">/</span>
          <span class="tw-text-gray-800">{{ getSlug(pageRoute) }}</span>
        </div>

        <div v-if="getDuplicates > 0" class="tw-text-red-400 tw-bg-red-400 tw-bg-opacity-30 tw-font-xs tw-rounded-full tw-px-2 tw-py-0">
          {{getDuplicates}} Duplicate
        </div>
      </div>
    </div>
  </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {FormField} from "~/models";
import {Api} from "~/utils/store-accessor";
import {Page} from "~/repositories";

@Component
export default class AutoCompleteSelectPageRouteFormField extends Vue {
  @VModel({type: String, default: ''}) model!: String;
  @Prop(Number) readonly pageId!: number
  @Prop(Object) readonly field!: FormField;

  Api = Api;

  parentRoute: string = '/';
  pageRoute: string = '';

  selectField = {
    label: "Parent Page URL",
    placeholder: 'Enter page name',
    'item-text': 'title',
    'item-value': 'route',
    rules: [],
    colAttrs: {cols: 4},
  }

  textField = {
    label: this.field.label,
    placeholder: 'Enter page name',
    modelKey: "route",
    rules: [],
    colAttrs: {cols: 8},
  }

  items: Array<any> = [];

  get calculateRoute() {
    return this.parentRoute
      + (this.parentRoute === '/' ? '' : '/')
      + this.getSlug(this.pageRoute);
  }

  @Watch('calculateRoute')
  onRouteChanged() {
    this.$emit('input', this.calculateRoute);
  }

  get getDuplicates() {
    return Api.Page.routes.filter(page => page.id !== this.pageId && (page.route === this.model || page.route + '/' === this.model )).length
  }

  getRoutes() {
    if (this.model !== '') {
      let lastIndexOf = this.model.lastIndexOf('/');
      this.parentRoute = this.model.substring(0, lastIndexOf === 0 ? lastIndexOf + 1 : lastIndexOf);
      this.pageRoute = this.model.substring(lastIndexOf + 1);
    }
  }

  getSlug(str: string): string {
    return str
      // .toLowerCase()
      .replace(/ /g, '-')

      .replace('"', '')
      .replace("'", '')

    // .replace(/[^\w-]+/g, '')
  }

  @Watch('value')
  onValueChanged() {
    this.getRoutes();
  }

  async mounted() {
    this.getRoutes()
  }
}
</script>
