<template>
  <v-col class="py-0" v-bind="field.colAttrs">
    <v-row>
      <v-col class="py-0" cols="2">
        <label> {{field.prefixLabel}} </label>
        <v-text-field
          :value="field.prefix"
          outlined
          single-line
          :disabled="true"
        />
      </v-col>
      <v-col class="py-0">
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
    </v-row>
  </v-col>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {FormField} from "@/models";

@Component
export default class TextFormField extends Vue {
  @Prop({default: "text"}) readonly type!: "text" | "password";
  @Prop(Object) readonly field!: FormField;
  @VModel() model!: string;
}
</script>
