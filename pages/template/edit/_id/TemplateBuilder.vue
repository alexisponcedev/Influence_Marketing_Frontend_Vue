<template>
    <v-container fluid style="background-color: #f2f3f8; height: 100vh">
        <v-card
            color="#FCFCFC"
            elevation="0"
            class="mb-4 px-7 page-builder-header"
        >
            <v-row align="center">
                <v-col cols="12" md="5">
                    <h1 class="text-h6 font-weight-bold mb-1">
                        Template builder
                    </h1>
                    <span class="text-subtitle-2 grey--text text--darken-2">
                        {{ Template.name }}
                    </span>
                </v-col>
                <v-col cols="12" md="7" class="text-right">
                    <v-btn
                        @click="discard"
                        elevation="0"
                        outlined
                        color="grey darken-4"
                        class="control-btns"
                    >
                        Discard
                    </v-btn>
                    <v-btn
                        elevation="0"
                        outlined
                        color="grey darken-4"
                        class="control-btns"
                    >
                        Preview
                    </v-btn>
                    <v-btn
                        @click="saveTemplate"
                        elevation="0"
                        color="grey darken-4 white--text"
                        class="control-btns"
                    >
                        Save Template
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>

        <page-builder v-model="Template.widgets" />

        <loading-overlay :show="Api.Template.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TemplateResource } from "@/repositories";
import { Api } from "@/store";

@Component
export default class TemplateBuilderSection extends Vue {
    Api = Api;

    Template: any = {};
    lang: string | null = null;

    mounted() {
        this.setLanguage();
        this.getEntity();
    }

    setLanguage() {
        if (!Api.Auth.languages.length) Api.Auth.getBrandLanguages();
        if (this.$route.query.lang)
            this.lang = this.$route.query.lang as string;
    }

    async getEntity() {
        const template = (await Api.Template.get(
            +this.$route.params.id
        )) as TemplateResource;
        const langTemplate: any =
            template.translations?.find(
                (translation) => translation.language == this.lang
            )?.body || null;
        template.widgets = langTemplate?.widgets || template.widgets || [];
        this.Template = template;
    }

    discard() {
        this.$router.push("/template/edit/" + this.Template.id);
    }

    async saveTemplate() {
        if (this.isDefaultLanguage)
            Api.Template.update({
                id: this.Template.id!,
                Template: this.Template,
            });
        else if (this.lang)
            Api.Template.addTranslation({
                id: this.Template.id,
                language: this.lang,
                widgets: this.Template.widgets,
            });
    }

    get isDefaultLanguage() {
        if (!this.lang) return true;
        const defaultLangSlug = Api.Auth.languages.find(
            (language: any) => language.pivot.primary == 1
        )?.slug;
        if (this.lang == defaultLangSlug) return true;
        return false;
    }
}
</script>
