<template>
  <form-field-file :field = "field" v-model="item.value" />
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import Validation from "~/utils/validation";
import {StructureField} from "~/utils/StructureField";

@Component
export default class StructureFileEditor extends Vue {
  @VModel({ type: StructureField }) item!: StructureField

  field = {
    label : 'Filed',
    rules : [],
    colAttrs : {cols : 12}
  }

  mounted(){
    this.field.label = this.item.title ?? 'field';
  }
}
</script>
