<template>
    <structure-editor-image v-model="model" type="file" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, VModel } from "vue-property-decorator";
import { StructureField } from "~/interfaces/StructureField";

@Component
export default class StructureFileEditor extends Vue {
    @VModel({ type: StructureField }) model!: StructureField
}
</script>
