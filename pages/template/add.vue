<template>
    <v-container fluid>
        <div v-if="editMode" class="d-flex justify-space-between align-center">
            <breadcrumbs :locations="locations" />
            <v-spacer />
            <v-menu
                rounded
                offset-y
                nudge-top="-3"
                nudge-width="-30"
                nudge-left="-15"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        elevation="0"
                        color="grey darken-4 white--text"
                        class="btn"
                        :to="
                            Api.Auth.languages.length
                                ? undefined
                                : `/template/edit/${Template.id}/TemplateBuilder`
                        "
                        v-bind="attrs"
                        v-on="on"
                    >
                        Go to Template Builder
                        <v-icon v-if="Api.Auth.languages.length">
                            mdi-chevron-down
                        </v-icon>
                    </v-btn>
                </template>
                <v-list v-if="Api.Auth.languages.length">
                    <v-list-item
                        v-for="language in Api.Auth.languages"
                        :to="`/template/edit/${Template.id}/TemplateBuilder?lang=${language.slug}`"
                    >
                        <v-list-item-title>
                            {{ language.title }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
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
import HoverButton from "@/components/base/HoverButton.vue";
import Validation from "@/utils/validation";
import { Template } from "@/repositories";
import { FormField } from "@/models";
import { Api } from "@/store";

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
        if (!Api.Auth.languages.length) await Api.Auth.getBrandLanguages();
        await this.initTemplatesTab();
        this.updateLocations();
    }

    updateLocations() {
        this.locations = [
            {
                title: "Templates",
                to: "/template",
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
            if (!this.editMode) this.$router.push("/template");
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
