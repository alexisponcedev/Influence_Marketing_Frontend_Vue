<template>
    <v-container fluid>
        <div
            class="tw-grid tw-grid-cols-11 tw-gap-3"
            style="grid-template-columns: 230px 1fr"
        >
            <pages-page-sidenav />
            <div class="tw-col-span-8">
                <div
                    v-if="editMode"
                    class="tw-flex tw-justify-between tw-items-center tw-flex-wrap lg:tw-flex-nowrap"
                >
                    <breadcrumbs :locations="locations" />
                    <v-spacer />
                    <div class="tw-flex tw-items-center tw-space-x-2">
                        <page-lock class="btn" v-model="Page" />

                        <v-btn
                            elevation="0"
                            outlined
                            class="btn"
                            @click="gotoLiveWebsite"
                        >
                            <span>Live Preivew</span>
                        </v-btn>
                        <v-btn
                            elevation="0"
                            color="grey darken-4 white--text"
                            class="btn"
                            @click="goToPageBuilder"
                        >
                            Go to Page Builder
                        </v-btn>
                    </div>
                </div>

                <v-row>
                    <v-col>
                        <v-tabs
                            show-arrows
                            v-model="tab"
                            background-color="transparent"
                        >
                            <v-tab href="#Details">Page Details</v-tab>
                            <v-tab href="#Metas">Page Metas</v-tab>
                            <v-tab v-if="Page.id > 0" href="#Redirection">
                                Redirection
                            </v-tab>
                        </v-tabs>
                    </v-col>
                </v-row>

                <v-form ref="form" @submit.prevent="submit">
                    <v-tabs-items
                        v-model="tab"
                        style="background-color: transparent !important"
                    >
                        <v-tab-item value="Details">
                            <v-card>
                                <v-card-text>
                                    <v-row>
                                        <form-field-text
                                            :max="60"
                                            :field="formFields[0]"
                                            v-model="Page.title"
                                            @input="pageTitleChanged"
                                        />
                                        <form-field-select-autocomplete
                                            :field="formFields[1]"
                                            v-model="Page.status_id"
                                        />
                                    </v-row>

                                    <form-field-select-page-route
                                        :field="formFields[2]"
                                        v-model="Page.route"
                                        :pageId="Page.id"
                                    />

                                    <div
                                        v-if="Page.model_type === 'product'"
                                        class="tw-flex tw-space-x-2 tw-items-center tw-px-3"
                                    >
                                        <div>Support URL :</div>
                                        <nuxt-link
                                            v-if="support && support.id > 0"
                                            class="tw-font-bold tw-underline tw-text-orange-600"
                                            :to="`/page/edit/${support.id}`"
                                            >Open Support Page
                                        </nuxt-link>
                                        <button
                                            v-else
                                            @click.prevent="createSupportPage"
                                            class="tw-bg-gray-50 tw-px-3 tw-py-2 tw-rounded-lg tw-text-blue-500"
                                        >
                                            Create Support Page
                                        </button>
                                    </div>

                                    <div
                                        v-if="Page.model_type === 'support'"
                                        class="tw-flex tw-space-x-2 tw-items-center tw-px-3"
                                    >
                                        <div>Product URL :</div>
                                        <nuxt-link
                                            v-if="product && product.id > 0"
                                            class="tw-font-bold tw-underline tw-text-orange-600"
                                            :to="`/page/edit/${product.id}`"
                                            >Open Product Page
                                        </nuxt-link>
                                        <button
                                            v-else
                                            @click.prevent="createProductPage"
                                            class="tw-bg-gray-50 tw-px-3 tw-py-2 tw-rounded-lg tw-text-blue-500"
                                        >
                                            Create Product Page
                                        </button>
                                    </div>
                                </v-card-text>
                            </v-card>
                            <button
                                class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
                                @click.prevent="submit"
                            >
                                Save
                            </button>
                        </v-tab-item>

                        <v-tab-item value="Metas">
                            <form-field-meta
                                :field="formFields[3]"
                                v-model="Page"
                            />

                            <button
                                class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
                                @click.prevent="submit"
                            >
                                Save
                            </button>
                        </v-tab-item>

                        <v-tab-item value="Live">
                            <iframe
                                style="min-height: 700px"
                                :src="liveWebsite"
                                frameborder="0"
                                class="tw-w-full"
                            />
                        </v-tab-item>

                        <v-tab-item value="Redirection">
                            <pages-page-redirection
                                v-model="openAddRedirectModal"
                                :Page="Page"
                            />
                        </v-tab-item>
                    </v-tabs-items>
                </v-form>
            </div>
        </div>

        <template-selector
            @template-selected="templateSelected"
            ref="templateSelector"
        />

        <loading-overlay :show="Api.Page.loading || Api.Redirect.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Validation from "@/utils/validation";
import { Page, PageResource } from "@/repositories";
import { FormField } from "@/models";
import { Api } from "@/store";
import HoverButton from "~/components/base/HoverButton.vue";
import getActiveBrand from "~/utils/getActiveBrand";

@Component({
    components: { HoverButton },
    layout: "panel",
})
export default class PageForm extends Vue {
    @Prop(Boolean) readonly editMode!: Boolean;

    Api = Api;

    tab = "";

    route: string = "";

    openAddRedirectModal = false;

    meta: Array<{ rel: string; name: string; content: string }> = [];

    oldRoute: string = "";
    oldStatus: number = 0;

    statusList = [
        { id: 1, title: "Published" },
        { id: 2, title: "Hidden" },
        // { id: 3, title: 'SupportOnly' },
        { id: 7, title: "firmwareOnly" },
    ];

    Page: Page = {
        id: 0,
        title: "",
        route: "",
        meta: [],
        widgets: [],
        draft: [],
        model_id: 0,
        model_type: "",
        status_id: 1,
    };

    locations: Array<{ title: string; to: string }> = [];

    formFields: Array<FormField> = [];

    product = {};
    support = {};

    mounted() {
        this.init();
    }

    async beforeDestroy() {
        await this.unlock();
    }

    async init() {
        await this.initPagesTab();
        this.updateLocations();
        this.initMetaTags();
    }

    initMetaTags() {
        if (this.Page.meta?.length === 0) {
            this.Page.meta = [
                { rel: "blank", name: "title", content: "" },
                { rel: "blank", name: "description", content: "Hisense USA" },
                { rel: "blank", name: "robots", content: "index" },

                {
                    rel: 'property="og:site_name"',
                    name: 'property="og:site_name"',
                    content: "Hisense USA",
                },
                {
                    rel: 'property="og:title"',
                    name: 'property="og:title"',
                    content: "",
                },
                {
                    rel: 'property="og:description"',
                    name: 'property="og:description"',
                    content: "Hisense USA",
                },
                {
                    rel: 'property="og:image"',
                    name: 'property="og:image"',
                    content: "",
                },
                {
                    rel: 'property="og:url"',
                    name: 'property="og:url"',
                    content: "",
                },
                {
                    rel: 'property="og:type"',
                    name: 'property="og:type"',
                    content: "website",
                },
                {
                    rel: 'property="og:locale"',
                    name: 'property="og:locale"',
                    content: "en_US",
                },
            ];
        }
    }

    updateLocations() {
        this.locations = [
            {
                title: "Pages",
                to: "/page",
            },
            {
                title: this.Page.title || "",
                to: "/page/edit/" + this.Page.id!,
            },
        ];
    }

    async initPagesTab() {
        await this.getEntity();
        this.updatePageFormFields();
    }

    async getEntity() {
        if (this.editMode) {
            await this.lock();
            this.Page = (await Api.Page.get(+this.$route.params.id)) as Page;
            this.oldRoute = this.Page.route!;
            this.oldStatus = this.Page.status_id!;
            if (this.Page.model_id && this.Page.model_type === "product")
                this.findSupport();
            else if (this.Page.model_id && this.Page.model_type === "support")
                this.findProduct();
        }
    }

    updatePageFormFields() {
        this.formFields = [
            {
                type: "form-field-text",
                label: "Title",
                modelKey: "title",
                placeholder: "please enter page title",
                rules: [Validation.required],
                colAttrs: { cols: 8 },
            },
            {
                type: "form-field-select-autocomplete",
                label: "Status",
                modelKey: "status_id",
                placeholder: "please select Status",
                "item-text": "title",
                "item-value": "id",
                items: this.statusList,
                rules: [Validation.required],
                colAttrs: { cols: 4 },
                disabled: () => this.isPDP,
            },
            {
                type: "form-field-select-page-route",
                label: "Page URL",
                modelKey: "route",
                rules: [],
                colAttrs: { cols: 12 },
            },
            {
                type: "form-field-meta",
                label: "Meta",
                modelKey: "meta",
                rules: [],
                colAttrs: { cols: 12 },
            },
        ];
    }

    async submit() {
        if (this.formValidate()) {
            if (this.editMode) {
                if (this.Page.id === 1565) this.Page.route = this.oldRoute;
                console.log(this.Page.route);

                await Api.Page.update({
                    id: +this.Page.id!,
                    Page: this.Page,
                });

                if (
                    this.Page.route !== this.oldRoute ||
                    this.Page.status_id !== this.oldStatus
                )
                    Api.Page.doDeploy();
                if (this.Page.route !== this.oldRoute) {
                    this.tab = "Redirection";
                    this.openAddRedirectModal = true;
                }
            } else {
                let page = await Api.Page.create(this.Page);
                await Api.Page.doDeploy();
                this.$router.push("/page/edit/" + page.id);
            }
            Api.Page.clearRoutes();
        }
    }

    formValidate() {
        return (this.$refs.form as any).validate();
    }

    gotoLiveWebsite() {
        if (this.Page.status_id === 2)
            window.open(
                process.env.LIVE_WEBSITE + "/preview/" + this.Page.id,
                "_blank"
            );
        else window.open(this.liveWebsite, "_blank");
    }

    goToPageBuilder() {
        if (
            (!this.Page.widgets || this.Page.widgets?.length === 0) &&
            (!this.Page.draft || this.Page.draft?.length === 0)
        )
            (this.$refs.templateSelector as any).open();
        else this.openPageBuilder();
    }

    get liveWebsite() {
        return process.env.LIVE_WEBSITE + (this.Page.route || "");
    }

    openPageBuilder() {
        this.$router.push(`/page/edit/${this.Page.id}/page-builder`);
    }

    templateSelected(template: any) {
        Api.Page.saveDraft({
            page_id: this.Page.id,
            page_draft: template.widgets,
        }).then(this.openPageBuilder);
    }

    @Watch("tab")
    tabChanged(newTab: string, _: string) {
        switch (newTab) {
            case "Details":
                this.updatePageFormFields();
                break;
            default:
                break;
        }
    }

    pageTitleChanged() {
        let parentRoute = "/";
        if (this.Page.route && this.Page.route !== "") {
            let lastIndexOf = this.Page.route!.lastIndexOf("/") + 1;
            parentRoute = this.Page.route!.substring(
                0,
                lastIndexOf === 0 ? lastIndexOf + 1 : lastIndexOf
            );
        }
        this.Page.route = parentRoute + this.Page.title;
    }

    findProduct() {
        Api.Page.getPageByModelTypeModelId({
            model_id: +this.Page.model_id!,
            model_type: "product",
        }).then((product) => {
            this.product = product;
        });
    }

    findSupport() {
        Api.Page.getPageByModelTypeModelId({
            model_id: +this.Page.model_id!,
            model_type: "support",
        }).then((support) => {
            this.support = support;
        });
    }

    async getProductInfo() {
        return this.$axios
            .$get(
                process.env.PIM_API_URL +
                    "/cms/getProduct/" +
                    this.Page!.model_id +
                    "?brand_id=" +
                    getActiveBrand() +
                    "&status[]=1&status[]=2&status[]=3"
            )
            .then((res) => {
                if (res && res.data) return res.data;
                return {};
            });
    }

    getSupportWidgets() {
        return [
            {
                id: 1,
                name: "Header",
                image: "Header.png",
                title: "Header Menu",
                selected: false,
                structure: {
                    theme: {
                        id: 0,
                        type: "select",
                        items: [
                            { title: "Light", value: "light" },
                            { title: "Dark", value: "dark" },
                        ],
                        title: "Theme",
                        value: "dark",
                    },
                },
            },
            {
                id: 2,
                name: "ProductSupportNewHead",
                image: "ProductSupportNewHead.png",
                title: "Product Support Info",
                selected: false,
                structure: {
                    theme: {
                        id: 0,
                        type: "select",
                        items: [
                            { title: "Light", value: "light" },
                            { title: "Dark", value: "dark" },
                        ],
                        title: "Theme",
                        value: "dark",
                    },
                },
            },
            {
                id: 3,
                name: "ProductSupportNavBar",
                image: "ProductSupportNavBar.png",
                title: "Product Support NavBar",
                selected: false,
                structure: {
                    tags: {
                        id: 2,
                        type: "list",
                        title: "Tags",
                        value: [
                            {
                                title: {
                                    id: 0,
                                    type: "string",
                                    title: "Tag Title",
                                    value: "Sample Tag Title",
                                },
                                target: {
                                    id: 0,
                                    type: "idSelector",
                                    title: "ID Selector",
                                    value: "#ProductSupportNavBar3",
                                },
                            },
                        ],
                        newItem: {
                            title: {
                                id: 0,
                                type: "string",
                                title: "Tag Title",
                                value: "Item Title",
                            },
                            target: {
                                id: 0,
                                type: "idSelector",
                                title: "ID Selector",
                                value: null,
                            },
                        },
                    },
                    theme: {
                        id: 0,
                        type: "select",
                        items: [
                            { title: "Light", value: "light" },
                            { title: "Dark", value: "dark" },
                        ],
                        title: "Theme",
                        value: "dark",
                    },
                },
            },
            {
                id: 6,
                name: "ProductSupportRegister",
                image: "ProductSupportRegister.png",
                title: "Product Support Register",
                selected: false,
                structure: {
                    theme: {
                        id: 0,
                        type: "select",
                        items: [
                            { title: "Light", value: "light" },
                            { title: "Dark", value: "dark" },
                        ],
                        title: "Theme",
                        value: "dark",
                    },
                    title: {
                        id: 1,
                        type: "string",
                        title: "Title",
                        value: "Register Laser TV",
                    },
                    subtitle: {
                        id: 1,
                        type: "string",
                        title: "Subtitle",
                        value: "Get started with registering your Hisense product.",
                    },
                    submitURL: {
                        id: 1,
                        type: "string",
                        title: "Submit URL",
                        value: "https://imcrm.dev-api.hisenseportal.com/api/hisense/contact/register-product",
                    },
                },
            },
            {
                id: 8,
                name: "SupportNeedAssistance",
                image: "SupportNeedAssistance.png",
                title: "Support Need Assistance",
                selected: true,
                structure: {
                    theme: {
                        id: 0,
                        type: "select",
                        items: [
                            { title: "Light", value: "light" },
                            { title: "Dark", value: "dark" },
                        ],
                        title: "Theme",
                        value: "dark",
                    },
                    title: {
                        id: 1,
                        type: "string",
                        title: "Title",
                        value: "Need More Assistance?",
                    },
                    linkUrl: {
                        id: 1,
                        type: "string",
                        title: "Link Url",
                        value: "/",
                    },
                    linkTitle: {
                        id: 1,
                        type: "string",
                        title: "Link Title",
                        value: "Contact Us",
                    },
                },
            },
            {
                id: 9,
                name: "Subscribe",
                image: "subscribe.png",
                title: "Subscribe",
                selected: false,
                structure: {
                    Url: {
                        id: 1,
                        type: "string",
                        title: "Submit URL",
                        value: "https://imcrm.dev-api.hisenseportal.com/api/hisense/lead",
                    },
                    title: {
                        id: 0,
                        type: "string",
                        title: "Title",
                        value: "Stay up to date with emails\nabout new products & other news",
                    },
                },
            },
            {
                id: 10,
                name: "Footer",
                image: "Footer.png",
                title: "Footer Menu",
                selected: false,
                structure: {
                    theme: {
                        id: 0,
                        type: "select",
                        items: [
                            { title: "Light", value: "light" },
                            { title: "Dark", value: "dark" },
                        ],
                        title: "Theme",
                        value: "dark",
                    },
                },
            },
        ];
    }

    createProductPage() {
        this.createPage("product", "/products").then((page: any) =>
            this.$router.push(`/page/edit/${page.id}`)
        );
    }

    createSupportPage() {
        this.createPage("support", "/support").then((page: any) => {
            if (page) this.$router.push(`/page/edit/${page.id}`);
        });
    }

    async createPage(type: string, route: string) {
        return this.getProductInfo().then((product) => {
            let slug =
                this.Page.route?.substring(
                    this.Page.route.lastIndexOf("/") + 1
                ) || "";
            return Api.Page.createPDP({
                product,
                type,
                route,
                slug,
                status_id: product.status.id,
            }).then((page) => {
                if (type === "support") this.findSupport();
                else this.findProduct();
                return page;
            });
        });
    }

    get userId() {
        let profile = JSON.parse(localStorage.getItem("profile")!.toString());
        return profile ? profile.user_id : 0;
    }

    async lock() {
        // await Api.Page.lockPage(this.Page.id!).then(() => {
        //     this.Page.locked_by = this.userId
        // });
    }

    async unlock() {
        if (this.Page.id! > 0)
            Api.Page.unlockPage(this.Page.id!).then(() => {
                this.Page.locked_by = 0;
            });
    }

    get isPDP() {
        return (
            this.Page.model_type === "product" ||
            this.Page.model_type === "support"
        );
    }
}
</script>

<style scoped>
a[role="anchor"] {
    color: #002bff;
    width: 100%;
    text-align: center;
    display: block;
    padding: 2px 0px 8px;
}
</style>
