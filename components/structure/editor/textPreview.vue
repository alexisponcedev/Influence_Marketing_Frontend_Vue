<template>
    <v-col v-if="typeof model.hidden === 'undefined' || !model.hidden">
        <label v-if="field.label && field.label !== ''">
            {{ field.label }}
        </label>
        :
        <label v-if="model.value && model.value !== ''">
            {{ model.value }}
        </label>
    </v-col>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureField } from "@/interfaces/StructureField";

@Component
export default class StructureTextEditor extends Vue {
    @VModel() model!: StructureField;

    field = {
        label: "",
        colAttrs: { cols: 12 },
    };

    mounted() {
        this.field.label = this.model.title ?? "";
    }
}
</script>
