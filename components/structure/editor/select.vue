<template>
    <form-field-select :field="field" v-model="model.value" @change="changed" />
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureField } from "@/interfaces/StructureField";

@Component
export default class StructureSelectEditor extends Vue {
    @VModel() model!: StructureField;

    field = {
        label: "Filed",
        rules: [],
        "item-text": "title",
        "item-value": "value",
        colAttrs: { cols: 12 },
        items: [],
    };

    mounted() {
        this.field.label = this.model.title ?? "field";
        this.field["item-text"] = this.model.itemText ?? "title";
        this.field["item-value"] = this.model.itemValue ?? "value";
        this.field.items = this.model.items;
    }

    changed(event: any) {
        if (this.model && this.model.onChanged) {
            this.$emit("forceUpdate");
            this.model.onChanged(event);
        }
    }
}
</script>
