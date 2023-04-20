<template>
    <v-col class="py-0" v-bind="field.colAttrs">
        <label>
            {{ field.label }}
        </label>
        <v-text-field
            v-model="model"
            @keydown="onKeyDown"
            outlined
            single-line
            :type="type"
            :error="tooLong"
            :rules="field.rules"
            :placeholder="field.placeholder"
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
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { FormField } from "@/models";

@Component
export default class TextFormField extends Vue {
    @Prop({ default: "text" }) readonly type!: "text" | "password";
    @Prop(Number) readonly max!: number;
    @Prop(Object) readonly field!: FormField;
    @VModel() model!: string;

    get tooLong() {
        return this.max && this.model.length > this.max;
    }
    onKeyDown(e: KeyboardEvent) {
        if (this.tooLong && e.code !== "Backspace" && e.code !== "Delete")
            e.preventDefault();
    }
}
</script>
