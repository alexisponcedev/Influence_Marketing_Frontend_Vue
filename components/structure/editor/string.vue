<template>
    <form-field-textarea :field="field" v-model="model.value"/>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";

@Component
export default class StructureStringEditor extends Vue {
    @VModel({type: StructureField}) model!: StructureField

    field = {
        label: 'Filed',
        rules: [],
        colAttrs: {cols: 12}
    }

    mounted() {
        this.field.label = this.model.title ?? 'field';
    }
}
</script>
