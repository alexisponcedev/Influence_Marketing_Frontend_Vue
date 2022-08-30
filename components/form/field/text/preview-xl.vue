<template>
  <form-field-text-preview xl v-model="model" :field="field" />
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { FormField } from "@/models";

@Component
export default class LabelFormField extends Vue {
  @Prop(Object) readonly field!: FormField;
  @VModel() model!: string;
}
</script>
