import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import getLiveWebisteURL from "@/utils/getLiveWebisteURL";
import ResponseHandler from "@/utils/ResponseHandler";
import getActiveBrand from "@/utils/getActiveBrand";
import safeString from "@/utils/safeString";
import { AppStore, Api } from "@/store";
import {
    Page,
    Draft,
    Widgets,
    PageResource,
    Configuration,
    PageApiFactory,
    InlineResponse204,
} from "@/repositories";

@Module({
    name: "api__page",
    stateFactory: true,
    namespaced: true,
})
export default class api__page extends VuexModule {
    loading: Boolean = false;
    routes: Array<any> = [];
    all: Array<PageResource> = [];
    dynamicPages: Array<PageResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<PageResource>) {
        this.all = all;
    }

    @Mutation
    updateDynamicPages(all: Array<PageResource>) {
        this.dynamicPages = all;
    }

    @Mutation
    deleteItem(id: number) {
        this.all.splice(
            this.all.findIndex((i: PageResource) => i.id === id),
            1
        );
    }

    @Mutation
    addItem(item: PageResource) {
        if (item) this.all.push(item);
    }

    @Mutation
    updateItem(item: PageResource) {
        this.all = this.all.map((i: PageResource) => {
            return i.id === item.id ? item : i;
        });
    }

    // @Mutation
    // lockItem(userId: number) {
    //     this.all = this.all.map((i: PageResource) => {
    //         return {...i, locked_by: userId};
    //     });
    // }
    //
    // @Mutation
    // unlockItem(item: number) {
    //     this.all = this.all.map((i: PageResource) => {
    //         return {...i, locked_by: 0};
    //     });
    // }

    @Mutation
    updateRoutes(routes: Array<any>) {
        this.routes = routes;

        this.routes = [
            // {
            //   id: 0,
            //   title: 'Root',
            //   model_id: 0,
            //   model_type: '',
            //   route: '/',
            //   domain: 'https://public.stage.imdigital.ca/',
            // },
            ...routes.map((page: any) => {
                return {
                    id: page.id,
                    title: page.title,
                    model_id: page.model_id,
                    model_type: page.model_type,
                    route: page.route,
                    domain: getLiveWebisteURL() + page.route,
                };
            }),
        ];
    }

    @Action({ commit: "updateAll" })
    @Action({ commit: "updateRoutes" })
    async getAll() {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getListAllPages(getActiveBrand())
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data.data;
        return [];
    }

    @Action({ commit: "updateDynamicPages" })
    async getDynamicPages() {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getListDynamicPage(getActiveBrand())
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data.data;
        return [];
    }

    @Action({ commit: "updateRoutes" })
    async getRoutes() {
        this.setLoading(true);
        const response: any = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getListAllPages(getActiveBrand())
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data.data;
        return [];
    }

    @Action({ commit: "updateRoutes" })
    clearRoutes() {
        return [];
    }

    @Action
    async get(id: number) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getPage(getActiveBrand(), id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data.data;
        return {};
    }

    @Action
    async getPageByModelTypeModelId(payload: {
        model_id: number;
        model_type: string;
    }) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getPageByModelTypeModelId(
                getActiveBrand(),
                payload.model_type,
                payload.model_id
            )
            .catch((error) => {
                console.log(error);
            })
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action({ commit: "addItem" })
    async create(Page: Page) {
        this.setLoading(true);
        Page.widgets = JSON.parse(safeString(JSON.stringify(Page.widgets)));
        Page.meta = JSON.parse(safeString(JSON.stringify(Page.meta)));

        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .addPage(getActiveBrand(), Page)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action
    async saveDraft(draft: Draft) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updatePageDraft(getActiveBrand(), Number(draft.page_id), draft)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action
    async getDraft(id: number) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getPageDraft(getActiveBrand(), id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action
    async savePageWidgets(widgets: Widgets) {
        this.setLoading(true);
        widgets.widgets = JSON.parse(
            safeString(JSON.stringify(widgets.widgets))
        );
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updatePageWidgets(
                getActiveBrand(),
                Number(widgets.page_id),
                widgets
            )
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action({ commit: "updateItem" })
    async update(payload: { id: number; Page: Page }) {
        this.setLoading(true);
        payload.Page.widgets = JSON.parse(
            safeString(JSON.stringify(payload.Page.widgets))
        );
        payload.Page.meta = JSON.parse(
            safeString(JSON.stringify(payload.Page.meta))
        );
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updatePage(getActiveBrand(), payload.id, payload.Page)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action({ commit: "deleteItem" })
    async delete(id: number) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deletePage(getActiveBrand(), id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action
    async doDeploy() {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .doDeploy(getActiveBrand())
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        ) {
            Api.PublicDeployment.getStatus();
            return response.data;
        }
        return {};
    }

    @Action
    async deployStageDbToProd(tables: string = "") {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deployStageDbToProd(getActiveBrand(), tables)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action
    async deployProdDbToStage() {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deployProdDbToStage(getActiveBrand())
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action({ commit: "addItem" })
    async createPDP(payload: {
        product: any;
        type: string;
        route: string;
        slug: string;
        status_id: number;
    }) {
        this.setLoading(true);
        let slug =
            payload.slug ||
            (
                `${payload.product.name} ${payload.product.model} ` +
                (payload.product.hasOwnProperty("brand")
                    ? payload.product.brand!.name
                    : "")
            )
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
        let route = `${payload.route}/${slug}`;
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .addPage(getActiveBrand(), {
                title: payload.product.model + " - new",
                route,
                meta: [
                    { rel: "blank", name: "title", content: "" },
                    {
                        rel: "blank",
                        name: "description",
                        content: "Hisense USA",
                    },
                    { rel: "blank", name: "robots", content: "index" },

                    {
                        rel: 'property="og:site_name"',
                        name: 'property="og:site_name"',
                        content: "Hisense USA",
                    },
                    {
                        rel: 'property="og:title"',
                        name: 'property="og:title"',
                        content: payload.product.name,
                    },
                    {
                        rel: 'property="og:description"',
                        name: 'property="og:description"',
                        content: payload.product.name,
                    },
                    {
                        rel: 'property="og:image"',
                        name: 'property="og:image"',
                        content: payload.product.image,
                    },
                    {
                        rel: 'property="og:url"',
                        name: 'property="og:url"',
                        content: route,
                    },
                    {
                        rel: 'property="og:locale"',
                        name: 'property="og:locale"',
                        content: "en_US",
                    },
                    {
                        rel: 'property="og:type"',
                        name: 'property="og:type"',
                        content: "website",
                    },
                ],
                model_id: payload.product.id,
                model_type: payload.type,
                status_id: payload.status_id,
            })
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return null;
    }

    @Action
    async lockPage(id: number) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .lockPage(getActiveBrand(), id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action
    async unlockPage(id: number) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .unLockPage(getActiveBrand(), id)
            .catch((error) =>
                AppStore.showSnackBar({
                    message:
                        "Access Denied: You do not have permission to perform this operation.",
                    color: "error",
                })
            )
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return;
    }

    @Action
    async getLockStatus(pageId: number) {
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getLockStatus(getActiveBrand(), pageId)
            .catch((error) => ResponseHandler.ErrorHandler(error));

        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return (response.data as any).data as InlineResponse204;
        return {} as InlineResponse204;
    }

    @Action({ commit: "updateAll" })
    async getDeletedPages() {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getTrashedPages(getActiveBrand())
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data.data;
        return [];
    }

    @Action({ commit: "deleteItem" })
    async restorePage(id: number) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .restorePage(getActiveBrand(), id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action({ commit: "deleteItem" })
    async forceDelete(id: number) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .forceDeletePage(getActiveBrand(), id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }

    @Action({ commit: "addItem" })
    async duplicatePage(payload: {
        page_id: number;
        route: string;
        title: string;
        model_id: number;
    }) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            ._0f917f275a0d5168341cc92753f96732(getActiveBrand(), {
                page_id: payload.page_id,
                title: payload.title,
                route: payload.route,
                model_id: payload.model_id,
            })
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }
}
