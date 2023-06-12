<template>
    <v-container fluid>
        <div v-if="editMode" class="d-flex justify-space-between align-center">
            <breadcrumbs :locations="locations" />
            <v-btn
                elevation="0"
                color="grey darken-4 white--text"
                class="btn"
                :to="`/template/edit/${Template.id}/TemplateBuilder`"
            >
                Go to Template Builder
            </v-btn>
        </div>

        <v-row>
            <v-col>
                <v-tabs
                    show-arrows
                    v-model="tab"
                    background-color="transparent"
                >
                    <v-tab href="#Templates">Template Details</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-tabs-items v-model="tab">
            <v-tab-item value="Templates">
                <v-card-text>
                    <form-standard
                        ref="TemplatesForm"
                        :model="Template"
                        :fields="formFields"
                        @submit="submit"
                    />
                </v-card-text>
            </v-tab-item>
        </v-tabs-items>
        <page-preview
            :value="Template.widgets"
            class="tw-bg-white tw-mt-10 tw-rounded-lg"
        />

        <loading-overlay :show="Api.Template.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Validation from "@/utils/validation";
import { Template } from "@/repositories";
import { FormField } from "@/models";
import { Api } from "@/store";
import HoverButton from "~/components/base/HoverButton.vue";

@Component({
    components: { HoverButton },
    layout: "panel",
})
export default class EntityForm extends Vue {
    @Prop(Boolean) readonly editMode!: Boolean;

    Api = Api;

    tab = "";

    Template: Template = {
        id: 0,
        name: "",
        widgets: [],
    };

    locations: Array<{ title: string; to: string }> = [];

    formFields: Array<FormField> = [];

    mounted() {
        this.init();
    }

    async init() {
        await this.initTemplatesTab();
        this.updateLocations();
    }

    updateLocations() {
        this.locations = [
            {
                title: "Templates",
                to: "/template/all",
            },
            {
                title: this.Template.name || "",
                to: "/template/edit/" + this.Template.id!,
            },
        ];
    }

    async initTemplatesTab() {
        await this.getEntity();
        this.updateTemplateFormFields();
    }

    async getEntity() {
        if (this.editMode)
            this.Template = (await Api.Template.get(
                +this.$route.params.id
            )) as Template;
    }

    updateTemplateFormFields() {
        this.formFields = [
            {
                type: "form-field-text",
                label: "Name",
                modelKey: "name",
                placeholder: "enter the template name",
                rules: [Validation.required],
                colAttrs: { cols: 12 },
            },
        ];
    }

    async submit() {
        if (this.formValidate()) {
            if (this.editMode)
                await Api.Template.update({
                    id: +this.Template.id!,
                    Template: this.Template,
                });
            else await Api.Template.create(this.Template);
            if (!this.editMode) this.$router.push("/template/all");
        }
    }

    formValidate() {
        return (this.$refs.TemplatesForm as any).validate();
    }

    @Watch("tab")
    tabChanged(newTab: string, _: string) {
        switch (newTab) {
            case "Templates":
                this.initTemplatesTab();
                break;
            default:
                break;
        }
    }
}
</script>
