<template>
  <v-col class="py-0" v-bind="field.colAttrs">
    <label>
      {{ field.label }}
    </label>
    <v-text-field
      v-model="model"
      outlined
      single-line
      :type="type"
      :rules="field.rules"
      :placeholder="field.placeholder"
      :readonly="
        typeof field.readonly === 'function' ? field.readonly() : field.readonly
      "
      :disabled="
        typeof field.disabled === 'function' ? field.disabled() : field.disabled
      "
    />
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { FormField } from "@/models";

@Component
export default class ImageFormFiled extends Vue {
  @Prop({ default: "file" }) readonly type!: "file";
  @Prop(Object) readonly field!: FormField;
  @VModel() model!: string;
}
</script>
