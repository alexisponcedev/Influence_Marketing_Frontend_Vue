<template>
    <form-field-select-page-name
        v-if="typeof model.hidden === 'undefined' || !model.hidden"
        :field="field"
        v-model="model.value"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, VModel } from "vue-property-decorator";
import { StructureField } from "~/interfaces/StructureField";

@Component
export default class StructureUrlEditor extends Vue {
    @VModel({ type: StructureField }) model!: StructureField;

    field = {
        label: "Page URL",
        placeholder: "Enter page name",
        "item-text": "title",
        "item-value": "route",
        rules: [],
        colAttrs: { cols: 12 },
    };

    mounted() {
        this.field.label = this.model.title ?? "field";
    }
}
</script>
