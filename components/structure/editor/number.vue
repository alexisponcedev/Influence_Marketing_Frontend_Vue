<template>
    <form-field-text
        :key="forceUpdateIndex"
        v-if="typeof model.hidden === 'undefined' || !model.hidden"
        :field="field"
        v-model="model.value"
        type="number"
        @input="valueUpdated"
    />
</template>

<script lang="ts">
import { Vue, Component, VModel, Watch } from "vue-property-decorator";
import { StructureField } from "@/interfaces/StructureField";

@Component
export default class StructureNumberEditor extends Vue {
    @VModel() model!: StructureField;

    forceUpdateIndex: number = 0;

    field = {
        label: "Field",
        rules: [],
        colAttrs: { cols: 12 },
    };

    mounted() {
        this.field.label = this.model.title ?? "field";
    }

    @Watch("model.value")
    valueUpdated(newValue: number) {
        if (this.model.min && this.model.value < this.model.min)
            this.model.value = this.model.min;
        if (this.model.max && this.model.value > this.model.max)
            this.model.value = this.model.max;
        if (newValue !== this.model.value) this.forceUpdateIndex++;
    }
}
</script>
