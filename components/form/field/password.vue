<template>
  <form-field-text type="password" v-model="model" :field="field" />
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { FormField } from "@/models";

@Component
export default class PasswordFormField extends Vue {
  @VModel({ type: String }) model!: string;
  @Prop(Object) readonly field!: FormField;
}
</script>
