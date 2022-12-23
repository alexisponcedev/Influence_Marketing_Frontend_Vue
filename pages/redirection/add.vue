<template>
    <v-container fluid>

        <div v-if="editMode" class="d-flex justify-space-between align-center">
            <breadcrumbs :locations="locations" />
        </div>

        <v-row>
            <v-col>
                <v-tabs show-arrows v-model="tab" background-color="transparent">
                    <v-tab href="#Redirects">Redirect Details</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-form ref="form" @submit.prevent="submit">

            <v-tabs-items v-model="tab">
                <v-tab-item value="Redirects">
                    <v-card-text>

                        <div class="tw-flex tw-items-center tw-justify-between">
                            <div class="tw-text-center tw-flex-1">
                                <h5>{{ fromObj.title }}</h5>
                                <structure-editor-url :showTitle="false" :options="options" :rebuild="fromObj"
                                    v-model="fromObj" />
                            </div>

                            <div class="tw-w-20 tw-flex tw-justify-center">
                                <v-icon color="red" v-if="Redirect.redirect_type === 'To'">mdi-arrow-right</v-icon>
                                <v-icon color="red" v-else>mdi-arrow-left</v-icon>
                            </div>

                            <div class="tw-text-center tw-flex-1">
                                <h5>{{ toObj.title }}</h5>
                                <structure-editor-url :showTitle="false" :hasBackground="true" :options="options"
                                    :rebuild="toObj" v-model="toObj" />
                            </div>
                        </div>

                        <form-field-select :field="redirectionCodeField" v-model="Redirect.redirect_code" />

                    </v-card-text>

                </v-tab-item>

            </v-tabs-items>

        </v-form>

        <button
            class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
            @click="submit">Save
        </button>

        <loading-overlay :show="Api.Redirect.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Validation from "@/utils/validation";
import { Redirect } from "@/repositories";
import { FormField } from "@/models";
import { Api } from "@/store";
import HoverButton from "~/components/base/HoverButton.vue";
import { RedirectCodeEnum, RedirectTypeEnum } from "~/interfaces/RedirectTypeEnum";
import { UrlTypeEnum } from "~/interfaces/UrlTypeEnum";

@Component({
    components: { HoverButton },
    layout: "panel"
})
export default class EntityForm extends Vue {
    @Prop(Boolean) readonly editMode!: Boolean;

    Api = Api;

    tab = "";

    redirectionCodeField = {
        label: 'Redirect Code',
        rules: [Validation.required],
        'item-text': 'title',
        'item-value': 'value',
        colAttrs: { cols: 12 },
        items: [
            { title: '301', value: RedirectCodeEnum.code301 },
            { title: '302', value: RedirectCodeEnum.code302 },
            { title: '303', value: RedirectCodeEnum.code303 },
            { title: '307', value: RedirectCodeEnum.code307 },
            { title: '308', value: RedirectCodeEnum.code308 },
        ]
    }

    fromObj: any = { id: -1, title: 'Source URL', value: '' };
    toObj: any = { id: -1, title: 'Destination URL', value: '' };

    options = [
        { title: 'Page URLs', value: UrlTypeEnum.Internal },
        { title: 'Custom URL', value: UrlTypeEnum.Custom },
    ]

    Redirect: Redirect = {
        id: 0,
        page_id: 0,
        redirect_code: RedirectCodeEnum.code301,

        redirect_type: RedirectTypeEnum.To,

        source_url: '',
        redirect_url: '',
    };

    locations: Array<{ title: string; to: string }> = [];

    formFields: Array<FormField> = [];

    mounted() {
        this.init();
    }

    async init() {
        await this.initRedirectsTab();
        this.updateLocations();
    }

    updateLocations() {
        this.locations = [
            {
                title: "Redirects",
                to: "/redirection",
            },
            {
                title: 'Redirect id:' + this.Redirect.id || "",
                to: "/redirection/edit/" + this.Redirect.id!,
            },
        ];
    }

    async initRedirectsTab() {
        await this.getEntity();
        this.updateRedirectFormFields();
    }

    async getEntity() {
        if (this.editMode) {
            this.Redirect = (await Api.Redirect.get(+this.$route.params.id)) as Redirect;
            this.fromObj.value = this.Redirect.source_url;
            this.toObj.value = this.Redirect.redirect_url;
        }
    }

    updateRedirectFormFields() {
        this.formFields = [
            {
                type: "form-field-text",
                label: "Name",
                modelKey: "name",
                placeholder: 'enter the redirect name',
                rules: [Validation.required],
                colAttrs: { cols: 12 },
            },
        ];
    }

    async submit() {
        if (this.formValidate()) {
            this.Redirect.source_url = this.fromObj.value;
            this.Redirect.redirect_url = this.toObj.value;

            let from = Api.Page.routes.find(i => i.route === this.fromObj.value);
            let to = Api.Page.routes.find(i => i.route === this.toObj.value);

            if (from) {
                this.Redirect.page_id = from.id;
                this.Redirect.redirect_type = RedirectTypeEnum.To;
            } else if (to) {
                this.Redirect.page_id = from.id;
                this.Redirect.redirect_type = RedirectTypeEnum.To;
            }


            if (this.editMode)
                await Api.Redirect.update({
                    id: +this.Redirect.id!,
                    Redirect: this.Redirect,
                })
                    .then(Api.Page.doDeploy);
            else await Api.Redirect.create(this.Redirect)
                .then(Api.Page.doDeploy);
            if (!this.editMode) this.$router.push("/redirection");
        }
    }

    formValidate() {
        return (this.$refs.form as any).validate();
    }

    @Watch("tab")
    tabChanged(newTab: string, _: string) {
        switch (newTab) {
            case "Redirects":
                this.initRedirectsTab();
                break;
            default:
                break;
        }
    }


}
</script>
