<template>
    <v-col v-if="typeof model.hidden === 'undefined' || !model.hidden">
        <label v-if="field.label && field.label !== ''">
            {{ field.label }}
        </label>
        <vue-editor v-model="internalValue" :editor-toolbar="customToolbar" />
    </v-col>
</template>

<script lang="ts">
import { Vue, Component, VModel, Watch } from "vue-property-decorator";
import { StructureField } from "@/interfaces/StructureField";

@Component
export default class StructureTextEditor extends Vue {
    @VModel() model!: StructureField;

    internalValue: string = "";

    customToolbar = [
        [
            "bold",
            "italic",
            "underline",
            { list: "bullet" },
            {
                color: [
                    "#00AAA6",
                    "#00CCCC",
                    "#000000",
                    "#101010",
                    "#252525",
                    "#FFFFFF",
                    "#EAEAEA",
                    "#D9D9D9",
                    "#F6F7FD",
                    "#9747FF",
                    "#1E518A",
                    "#0C4955",
                    "#ffbbf3",
                    "#2b0038",
                ],
            },
        ],
    ];

    field = {
        label: "Textarea",
        rules: [],
        colAttrs: { cols: 12 },
    };

    mounted() {
        this.field.label = this.model.title ?? "";
        this.internalValue = this.model.value;
    }

    @Watch("internalValue")
    valueChanged() {
        if (this.internalValue)
            this.model.value = this.internalValue.replace(/\u00a0/g, " ");
        else this.model.value = "";
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
