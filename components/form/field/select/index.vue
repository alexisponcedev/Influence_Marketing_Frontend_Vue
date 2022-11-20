<template>
    <v-col class="py-0" v-bind="field.colAttrs">
        <label>
            {{ field.label }}
        </label>
        <v-select
            v-model="model"
            outlined
            :rules="field.rules"
            :item-text="field['item-text']"
            :item-value="field['item-value']"
            :placeholder="field.placeholder"
            :items="typeof field.items === 'function' ? field.items() : field.items"
            :loading="
        typeof field.loading === 'function' ? field.loading() : field.loading
      "
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
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {FormField} from "@/models";

@Component
export default class SelectFormField extends Vue {
    @VModel() model!: any;
    @Prop(Object) readonly field!: FormField;
}
</script>
