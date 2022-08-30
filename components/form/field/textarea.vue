<template>
  <v-col class="py-0" v-bind="field.colAttrs">
    <label>
      {{ field.label }}
    </label>
    <v-textarea
      outlined
      v-model="model"
      :rules="field.rules"
      :readonly="field.readonly"
      :placeholder="field.placeholder"
    />
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { FormField } from "@/models";

@Component
export default class TextAreaFormField extends Vue {
  @VModel({ type: String }) model!: string;
  @Prop(Object) readonly field!: FormField;
}
</script>
