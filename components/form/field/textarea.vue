<template>
    <v-col class="py-0" v-bind="field.colAttrs">
        <label>
            {{ field.label }}
        </label>
        <v-textarea
            outlined
            v-model="model"
            :rules="field.rules"
            :placeholder="field.placeholder"
            :auto-grow="field['auto-grow']"
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
