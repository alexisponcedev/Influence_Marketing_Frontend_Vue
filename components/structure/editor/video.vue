<template>
  <form-field-text :field = "field" v-model="model.value" />
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";
import Validation from "~/utils/validation";

@Component
export default class StructureStringEditor extends Vue {
  @VModel({ type: StructureField }) model!: StructureField

  field = {
    label : 'Filed',
    rules : [Validation.url],
    colAttrs : {cols : 12}
  }

  mounted(){
    this.field.label = this.model.title ?? 'field';
  }
}
</script>
