<template>
  <v-col class="py-0" v-bind="field.colAttrs">
    <label>
      {{ field.label }}
      <v-btn icon color="primary" @click="addRow">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </label>
    <div v-for="(row, index) in model" :key="index">
      <v-text-field
        v-model="model[index]"
        outlined
        single-line
        :type="type"
        :rules="field.rules"
        :placeholder="field.placeholder"
        append-outer-icon="mdi-delete"
        @click:append-outer="removeRow(index)"
        :readonly="
          typeof field.readonly === 'function'
            ? field.readonly()
            : field.readonly
        "
        :disabled="
          typeof field.disabled === 'function'
            ? field.disabled()
            : field.disabled
        "
      />
    </div>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { FormField } from "@/models";

@Component
export default class TextArrayFormField extends Vue {
  @Prop({ default: "text" }) readonly type!: "text" | "password";
  @Prop(Object) readonly field!: FormField;
  @VModel() model!: Array<string>;

  addRow() {
    if (!this.model) this.model = [""];
    else this.model.push("");
  }

  removeRow(index: number) {
    this.model.splice(index, 1);
  }
}
</script>
