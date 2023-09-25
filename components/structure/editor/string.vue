<template>
    <form-field-textarea
        v-if="typeof model.hidden === 'undefined' || !model.hidden"
        :field="field"
        v-model="model.value"
    />
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureField } from "~/interfaces/StructureField";

@Component
export default class StructureStringEditor extends Vue {
    @VModel() model!: StructureField;

    field = {
        label: "Field",
        rules: [],
        colAttrs: { cols: 12 },
    };

    mounted() {
        this.field.label = this.model.title ?? "field";
    }
}
</script>
