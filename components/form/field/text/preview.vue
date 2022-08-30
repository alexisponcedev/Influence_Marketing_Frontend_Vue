<template>
  <v-col class="py-0 pb-6 word-wrap-break-word" v-bind="field.colAttrs">
    <small>
      {{ field.label }}
    </small>
    <component :is="xl ? 'h2' : 'h6'" v-if="field.valueFunc">
      {{ field.valueFunc(model) }}
    </component>
    <component :is="xl ? 'h2' : 'h6'" v-else>
      {{ model }}
    </component>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { FormField } from "@/models";

@Component
export default class LabelFormField extends Vue {
  @Prop(Object) readonly field!: FormField;
  @Prop(Boolean) readonly xl!: Boolean;
  @VModel() model!: any;
}
</script>
