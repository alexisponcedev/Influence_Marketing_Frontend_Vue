<template>
    <structure-editor-image
        v-if="typeof model.hidden === 'undefined' || !model.hidden"
        v-model="model"
        type="file"
    />
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureField } from "@/interfaces/StructureField";

@Component
export default class StructureFileEditor extends Vue {
    @VModel() model!: StructureField;
}
</script>