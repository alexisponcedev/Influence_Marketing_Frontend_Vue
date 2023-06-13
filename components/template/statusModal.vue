<template>
    <v-dialog
        v-model="showSynced"
        max-width="800px"
        content-class="custom_height"
    >
        <v-card class="h-full">
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

<style lang="scss">
.custom_height {
    height: 100% !important;
    max-height: 500px !important;
}
</style>

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
    template: any = {
        status: "",
    };

    mounted() {
        this.init();
        this.updateSettingFormFields();
        this.updateData();
    }

    async init() {
        if (!Api.Template.all.length) await Api.Template.getAll();
    }

    updateData() {
        this.template = {
            status: Api.Template.all.find(
                (item: any) => item.status?.name === "firmwareOnly"
            )?.id,
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
            Api.Template.updateStatus(this.template.status).then(() => {
                this.showSynced = false;
                Api.Template.getAll();
            });
        }
    }

    formValidate() {
        return (this.$refs.TemplateStatusForm as any).validate();
    }
}
</script>
