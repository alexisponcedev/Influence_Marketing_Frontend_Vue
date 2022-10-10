<template>
  <form-field-select
    :field = "field"
    v-model="model.value" />
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";

@Component
export default class StructureSelectEditor extends Vue {
  @VModel({ type: StructureField }) model!: StructureField

  field = {
    label : 'Filed',
    rules : [],
    'item-text' :  'title',
    'item-value' : 'value',
    colAttrs : {cols : 12},
    items : []
  }

  mounted(){
    this.field.label = this.model.title ?? 'field';
    this.field["item-text"] = this.model.itemText ?? 'title';
    this.field["item-value"] = this.model.itemValue ?? 'value';
    this.field.items = this.model.items;
  }
}
</script>
