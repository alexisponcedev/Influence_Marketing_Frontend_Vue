<template>
    <div>
        <div class="tw-flex tw-space-x-4">
            <div class="tw-flex-1">
                <h6>Redirect from this page to</h6>
                <button
                    @click.prevent="openModal('', RedirectType.To)"
                    :disabled="redirectToList.length > 0"
                    class="tw-w-full tw-mb-2 tw-border tw-border-dashed tw-border-gray-700 tw-rounded-xl tw-text-center tw-py-6 hover:tw-bg-white tw-transition"
                >
                    Add Redirection
                </button>

                <div class="tw-space-y-2">
                    <div
                        v-for="redirect in redirectToList"
                        :key="redirect.id"
                        class="tw-bg-white tw-p-4 tw-rounded-xl tw-space-y-1.5"
                    >
                        <div class="tw-flex tw-items-center tw-justify-between">
                            <div class="tw-space-y-2">
                                <div class="tw-font-semibold tw-ml-1">
                                    {{ redirect.redirect_url }}
                                </div>

                                <div class="tw-flex tw-space-x-2">
                                    <div
                                        class="tw-w-min tw-whitespace-nowrap tw-bg-gray-50 tw-rounded-lg tw-px-2 tw-py-1 tw-text-gray-500 tw-text-center"
                                    >
                                        <span>{{
                                            redirect.redirect_code
                                        }}</span>
                                    </div>
                                    <div
                                        class="tw-w-min tw-whitespace-nowrap tw-bg-gray-50 tw-rounded-lg tw-px-2 tw-py-1 tw-text-gray-500 tw-text-center"
                                    >
                                        <span
                                            v-if="
                                                redirect.source_url !==
                                                RedirectType.route
                                            "
                                            >Redirect To</span
                                        >
                                        <span v-else>Redirect From</span>
                                    </div>
                                </div>
                            </div>
                            <div class="tw-space-x-1">
                                <button
                                    class="tw-rounded-lg tw-bg-gray-50 tw-p-2"
                                    @click.prevent="deleteRedirect(redirect)"
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tw-bg-gray-300 tw-w-px tw-mt-8" />

            <div class="tw-flex-1">
                <h6>Redirect to this page from</h6>

                <button
                    @click.prevent="openModal('', RedirectType.From)"
                    class="tw-w-full tw-mb-2 tw-border tw-border-dashed tw-border-gray-700 tw-rounded-xl tw-text-center tw-py-6 hover:tw-bg-white tw-transition"
                >
                    Add Redirection
                </button>

                <div class="tw-space-y-2">
                    <div
                        v-for="redirect in redirectFromList"
                        :key="redirect.id"
                        class="tw-bg-white tw-p-4 tw-rounded-xl tw-space-y-1.5"
                    >
                        <div class="tw-flex tw-items-center tw-justify-between">
                            <div class="tw-space-y-2">
                                <div class="tw-font-semibold tw-ml-1">
                                    {{ redirect.source_url }}
                                </div>

                                <div class="tw-flex tw-space-x-2">
                                    <div
                                        class="tw-w-min tw-whitespace-nowrap tw-bg-gray-50 tw-rounded-lg tw-px-2 tw-py-1 tw-text-gray-500 tw-text-center"
                                    >
                                        <span>{{
                                            redirect.redirect_code
                                        }}</span>
                                    </div>
                                    <div
                                        class="tw-w-min tw-whitespace-nowrap tw-bg-gray-50 tw-rounded-lg tw-px-2 tw-py-1 tw-text-gray-500 tw-text-center"
                                    >
                                        <span
                                            v-if="
                                                redirect.source_url ===
                                                RedirectType.route
                                            "
                                            >Redirect To</span
                                        >
                                        <span v-else>Redirect From</span>
                                    </div>
                                </div>
                            </div>
                            <div class="tw-space-x-1">
                                <button
                                    class="tw-rounded-lg tw-bg-gray-50 tw-p-2"
                                    @click.prevent="deleteRedirect(redirect)"
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <v-dialog v-model="showModal" max-width="500">
            <v-card>
                <v-card-title>Redirect this page to</v-card-title>
                <v-card-text>
                    <structure-editor-url
                        :showTitle="false"
                        :options="options"
                        v-model="redirectionObj"
                    />

                    <form-field-select
                        :field="redirectionCodeField"
                        v-model="redirectionObj.redirection_code"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        elevation="0"
                        color="grey darken-4 white--text"
                        block
                        class="btn"
                        @click="saveRedirect"
                    >
                        Add
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, VModel } from "vue-property-decorator";
import { Api } from "@/store";
import { UrlTypeEnum } from "~/interfaces/UrlTypeEnum";
import { Redirect, RedirectResource } from "~/repositories";
import {
    RedirectCodeEnum,
    RedirectTypeEnum,
} from "~/interfaces/RedirectTypeEnum";

@Component
export default class PageRedirection extends Vue {
    @VModel({ type: Boolean }) openAddRedirectModal!: any;
    @Prop(Boolean) readonly editMode!: Boolean;
    @Prop({
        type: Object,
        default: () => {},
    })
    Page!: any;

    RedirectType = RedirectTypeEnum;
    RedirectCode = RedirectCodeEnum;

    redirectionCodeField = {
        label: "Redirection Code",
        rules: [],
        "item-text": "title",
        "item-value": "value",
        colAttrs: { cols: 12 },
        items: [
            { title: "301", value: RedirectCodeEnum.code301 },
            { title: "302", value: RedirectCodeEnum.code302 },
            { title: "303", value: RedirectCodeEnum.code303 },
            { title: "307", value: RedirectCodeEnum.code307 },
            { title: "308", value: RedirectCodeEnum.code308 },
        ],
    };

    options = [
        { title: "Page URLs", value: UrlTypeEnum.Internal },
        { title: "Custom URL", value: UrlTypeEnum.Custom },
    ];

    redirect: Redirect = {
        id: 0,
        page_id: this.Page.id,
        redirect_url: "",
        redirect_type: this.RedirectType.To,
        redirect_code: this.RedirectCode.code301,
    };

    Api = Api;

    showModal: Boolean = false;

    redirectionObj: any = {
        id: -1,
        title: "Redirect To",
        value: "",
        redirection_type: RedirectTypeEnum.To,
        redirection_code: 301,
    };

    async loadRedirects() {
        await Api.Redirect.getPageRedirects(this.Page.id);
    }

    mounted() {
        this.loadRedirects();
        if (this.openAddRedirectModal) {
            this.openModal("", this.RedirectType.From);
        } else {
            this.showModal = false;
            this.openAddRedirectModal = false;
        }
    }

    openModal(
        route: String = "",
        type: RedirectTypeEnum = RedirectTypeEnum.To
    ) {
        this.redirectionObj.value = route;
        this.redirectionObj.redirection_type = type;
        this.showModal = true;
    }

    get redirectToList() {
        return Api.Redirect
            ? // Api.Redirect.all.filter((i: RedirectResource) => i.redirect_type === RedirectTypeEnum.To) :
              Api.Redirect.all.filter(
                  (i: RedirectResource) => i.source_url === this.Page.route
              )
            : [];
    }

    get redirectFromList() {
        return Api.Redirect
            ? // Api.Redirect.all.filter((i: RedirectResource) => i.redirect_type === RedirectTypeEnum.From) :
              Api.Redirect.all.filter(
                  (i: RedirectResource) => i.redirect_url === this.Page.route
              )
            : [];
    }

    async saveRedirect() {
        if (this.redirectionObj.value) {
            await Api.Redirect.create({
                page_id: this.Page.id,
                redirect_type: RedirectTypeEnum.To,
                redirect_code: this.redirectionObj.redirection_code,
                source_url:
                    this.redirectionObj.redirection_type === RedirectTypeEnum.To
                        ? this.Page.route
                        : this.redirectionObj.value,
                redirect_url:
                    this.redirectionObj.redirection_type === RedirectTypeEnum.To
                        ? this.redirectionObj.value
                        : this.Page.route,
            }).then(Api.Page.doDeploy);
            this.showModal = false;
            await this.loadRedirects();
        }
    }

    async updateRedirect(Redirect: Redirect) {
        await Api.Redirect.update({
            id: Redirect.id!,
            Redirect: Redirect,
        }).then(Api.Page.doDeploy);
    }

    async deleteRedirect(Redirect: Redirect) {
        await Api.Redirect.delete(Number(Redirect.id)).then(Api.Page.doDeploy);
        await this.loadRedirects();
    }

    @Watch("openAddRedirectModal")
    openModalAddRedirect() {
        if (this.openAddRedirectModal) {
            this.openModal("", this.RedirectType.From);
        } else {
            this.openAddRedirectModal = false;
            this.showModal = false;
        }
    }
}
</script>

<style scoped></style>
