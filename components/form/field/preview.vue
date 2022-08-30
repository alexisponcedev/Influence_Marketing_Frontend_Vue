<template>
  <v-col class="py-0" v-bind="field.colAttrs">
    <label>
      {{ field.label }}
      <v-btn
        icon
        small
        color="danger"
        class="float-right"
        v-if="field.onClick"
        @click="field.onClick"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </label>
    <v-img max-width="150px" :src="model" />
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { FormField } from "@/models";

@Component
export default class PreviewFormField extends Vue {
  @VModel({ type: String }) model!: string;
  @Prop(Object) readonly field!: FormField;
}
</script>
