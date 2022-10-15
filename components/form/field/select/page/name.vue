<template>
  <v-col class="py-0" v-bind="field.colAttrs">
    <label>
      {{ field.label }}
    </label>
    <v-autocomplete
      outlined
      v-model="model"
      :rules="field.rules"
      :item-text="'title'"
      :item-value="'value'"
      placeholder="Parent Route"
      :items="Api.Page.routes"
      :loading="typeof field.loading === 'function' ? field.loading() : field.loading "
      :readonly="typeof field.readonly === 'function' ? field.readonly() : field.readonly"
      :disabled=" typeof field.disabled === 'function' ? field.disabled() : field.disabled "
      :multiple=" typeof field.multiple === 'function' ? field.multiple() : field.multiple "
    />
  </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {FormField} from "~/models";
import {Api} from "~/utils/store-accessor";
import {Page} from "~/repositories";

@Component
export default class AutoCompleteSelectPageNameFormField extends Vue {
  @VModel() model!: Array<String>
  // @Prop({type: Array , default: () => []}) pages!: Array<any>
  @Prop({
    type: Object, default: {
      label: 'Page Url',
      placeholder: 'Enter page name',
      rules: [],
      colAttrs: {cols: 12},
    }
  }) readonly field!: FormField;

  Api = Api;

  async mounted() {
    if(Api.Page.routes.length === 0) await Api.Page.getRoutes();
  }
}
</script>
