<template>
  <v-col class="py-0" v-bind="field.colAttrs">
    <v-checkbox
      v-model="model"
      :rules="field.rules"
      :label="field.label"
      :readonly="field.readonly"
      false-value="0"
      true-value="1"
    />
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { FormField } from "@/models";

@Component
export default class CheckboxFormField extends Vue {
  @VModel() model!: any;
  @Prop(Object) readonly field!: FormField;

  mounted() {
    this.forceString();
  }

  @Watch("model")
  modelChanged() {
    this.forceString();
  }

  forceString() {
    if (!this.model) this.model = "0";
    else if (this.model === 1) this.model = "1";
  }
}
</script>
