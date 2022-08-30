<template>
  <form-field-file-multiple :field="field" v-model="model" :multiple="false" />
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { FormField } from "@/models";

@Component
export default class FileFormField extends Vue {
  @VModel() model!: Array<Number> | Number;
  @Prop(Object) readonly field!: FormField;
}
</script>
