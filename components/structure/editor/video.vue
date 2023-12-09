<template>
    <form-field-text
        v-if="typeof model.hidden === 'undefined' || !model.hidden"
        :field="field"
        v-model="model.value"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, VModel } from "vue-property-decorator";
import { StructureField } from "~/interfaces/StructureField";
import Validation from "~/utils/validation";

@Component
export default class StructureStringEditor extends Vue {
    @VModel() model!: StructureField;

    field = {
        label: "Filed",
        rules: [Validation.url],
        colAttrs: { cols: 12 },
    };

    mounted() {
        this.field.label = this.model.title ?? "field";
    }
}
</script>
