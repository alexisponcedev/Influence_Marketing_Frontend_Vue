<template>
    <v-dialog v-model="showSynced" max-width="900px">
        <v-card>
            <v-card-title>
                Deployment Log
                <v-spacer />
                <v-btn icon @click="showSynced = false">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <form-standard
                    preview
                    ref="form"
                    :model="data"
                    :fields="formFields"
                />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop, Watch } from "vue-property-decorator";
import Validation from "@/utils/validation";
import { FormField } from "@/models";

@Component
export default class uploadFileModal extends Vue {
    @PropSync("show", { type: Boolean }) showSynced!: Boolean;
    @Prop({ type: String, default: "" }) output!: String;

    forceUpdateIndex: number = 0;

    Validation = Validation;

    data: any = {
        output: this.output,
    };

    formFields: Array<FormField> = [
        {
            type: "form-field-textarea",
            label: "Output:",
            readonly: true,
            "auto-grow": true,
            modelKey: "output",
            rules: [Validation.required],
            colAttrs: { cols: 12 },
        },
    ];

    reset() {
        this.data = {
            output: this.output,
        };
        this.forceUpdateIndex++;
    }

    @Watch("show")
    showed() {
        this.reset();
    }
}
</script>
