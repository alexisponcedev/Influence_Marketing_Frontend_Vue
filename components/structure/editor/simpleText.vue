<template>
    <v-col>
        <label v-if="field.label && field.label !== ''">
            {{ field.label }}
        </label>
        <vue-editor v-model="model.value" :editor-toolbar="customToolbar"/>
    </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import Validation from "~/utils/validation";
import {StructureField} from "~/interfaces/StructureField";

@Component
export default class StructureTextEditor extends Vue {
    @VModel({type: StructureField}) model!: StructureField

    customToolbar = [
        ["bold", "italic", "underline"]
    ]

    field = {
        label: 'Textarea',
        rules: [],
        colAttrs: {cols: 12}
    }

    mounted() {
        this.field.label = this.model.title ?? '';
    }
}
</script>

<style>
.ql-editor {
    min-height: 100px !important;
}

.ql-editor strong {
    font-weight: bold !important;
}

.ql-editor .ql-video {
    width: 100%;
    aspect-ratio: 854/480;
}
</style>
