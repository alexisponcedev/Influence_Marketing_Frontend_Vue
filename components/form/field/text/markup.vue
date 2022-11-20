<template>
    <v-col class="py-0" v-bind="field.colAttrs">
        <label>
            {{ field.label }}
        </label>
        <vue-editor class="pb-6" v-model="model" useCustomImageHandler/>
    </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {FormField} from "@/models";

@Component
export default class MarkupTextFormField extends Vue {
    @VModel({type: String}) model!: string;
    @Prop({
        default: () => {
        }
    }) readonly field!: FormField;
}
</script>
