<template>
    <v-dialog v-model="showSynced" max-width="800px">
        <v-card>
            <v-card-title>
                Template Status
                <v-spacer />
                <v-btn icon @click="showSynced = false">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <form-standard
                    :model="template"
                    :fields="formFields"
                    @submit="submit"
                    ref="TemplateStatusForm"
                />
            </v-card-text>
            <v-card-text> </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Watch } from "vue-property-decorator";
import Validation from "@/utils/validation";
import { FormField } from "@/models";
import { Api, AppStore } from "@/store";
import { Template } from "~/repositories";

@Component
export default class TemplateStatusModal extends Vue {
    @PropSync("show", { type: Boolean }) showSynced!: Boolean;

    forceUpdateIndex: number = 0;

    Validation = Validation;
    formFields: Array<FormField> = [];

    Api = Api;
    template: Template = {
        status: {},
        brand_id: 3,
        widgets: [],
        name: "",
    };

    mounted() {
        this.init();
        this.updateSettingFormFields();
    }

    async init() {
        if (!Api.Template.all.length) await Api.Template.getAll();
    }

    updateData() {
        this.template = {
            status: Api.Template.all.find((item) => item.status !== null)?.id,
        };
    }

    updateSettingFormFields() {
        this.formFields = [
            {
                type: "form-field-select-autocomplete",
                label: "Templates",
                modelKey: "status",
                "item-value": "id",
                "item-text": "name",
                placeholder: "Search Template",
                items: () => Api.Template.all,
                rules: [Validation.required],
                colAttrs: { cols: 12 },
            },
        ];
    }

    async submit() {
        if (this.formValidate()) {
            alert();
            // Api.Template.updateStatus(_id).then(() => Api.Template.getAll());
        }
    }

    formValidate() {
        return (this.$refs.TemplateStatusForm as any).validate();
    }
}
</script>
