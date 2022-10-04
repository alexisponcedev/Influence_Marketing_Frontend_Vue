<template>
  <form-field-select
    :field = "field"
    v-model="item.value" />
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";

@Component
export default class StructureSelectEditor extends Vue {
  @VModel({ type: StructureField }) item!: StructureField

  field = {
    label : 'Filed',
    rules : [],
    'item-text' : 'title',
    'item-value' : 'value',
    colAttrs : {cols : 12},
    items : []
  }

  mounted(){
    this.field.label = this.item.title ?? 'field';

    this.field.items = this.item.items;
  }
}
</script>
