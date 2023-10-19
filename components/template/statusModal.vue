<template>
    <v-dialog max-width="700px" v-model="showSynced">
        <v-card class="h-full">
            <v-card-title>
                Set Default Template
                <v-spacer />
                <v-btn icon @click="showSynced = false">
                    <v-icon> mdi-window-close </v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <form-standard
                    @submit="submit"
                    :model="model"
                    :fields="formFields"
                    ref="TemplateStatusForm"
                />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Emit, Watch } from "vue-property-decorator";
import Validation from "@/utils/validation";
import { FormField } from "@/models";
import { Api } from "@/store";

@Component
export default class TemplateStatusModal extends Vue {
    @PropSync("show", { type: Boolean }) showSynced!: Boolean;

    Api = Api;
    Validation = Validation;
    formFields: Array<FormField> = [];

    model: any = {
        firmwareOnly: "",
        support: "",
    };

    mounted() {
        this.updateSettingFormFields();
        this.updateData();
    }

    updateData() {
        this.model = {
            firmwareOnly: Api.Template.all.find(
                (item: any) => item.status?.name === "firmwareOnly"
            )?.id,
            support: Api.Template.all.find(
                (item: any) => item.status?.name === "Support"
            )?.id,
        };
    }

    updateSettingFormFields() {
        this.formFields = [
            {
                modelKey: "firmwareOnly",
                "item-value": "id",
                "item-text": "name",
                items: () => Api.Template.all,
                loading: () => Api.Template.loading,
                type: "form-field-select-autocomplete",
                label: "Frimware Only Template",
                placeholder: "Search Template",
                rules: [Validation.required],
                colAttrs: { cols: 12 },
            },
            {
                modelKey: "support",
                "item-value": "id",
                "item-text": "name",
                items: () => Api.Template.all,
                loading: () => Api.Template.loading,
                type: "form-field-select-autocomplete",
                label: "Product Support Template",
                placeholder: "Search Template",
                rules: [Validation.required],
                colAttrs: { cols: 12 },
            },
        ];
    }

    async submit() {
        if (this.formValidate()) {
            this.showSynced = false;
            this.$emit("submit", { ...this.model });
            this.model = {
                firmwareOnly: "",
                support: "",
            };
        }
    }

    formValidate() {
        return (this.$refs.TemplateStatusForm as any).validate();
    }

    @Watch("show")
    showed() {
        this.updateData();
    }
}
</script>
