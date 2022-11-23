import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
    Page, PageResource, Configuration, PageApiFactory,
} from "@/repositories";

@Module({
    name: "api__notification",
    stateFactory: true,
    namespaced: true,
})

export default class api__notification extends VuexModule {
    loading: Boolean = false;
    all: Array<PageResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<PageResource>) {
        this.all = all;
    }

    @Mutation
    deleteItem(id: number) {
        this.all.splice(this.all.findIndex((i: PageResource) => i.id === id), 1);
    }

    @Mutation
    addItem(item: PageResource) {
        this.all.push(item);
    }

    @Mutation
    updateItem(item: PageResource) {
        this.all = this.all.map((i: PageResource) => {
            return i.id === item.id ? item : i
        });
    }

    @Action({commit: "updateAll"})
    async getAll() {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getListAllPages()
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data.data;
        return [];
    }

    @Action({commit: "updateRoutes"})
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
            .getPage(id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data;
        return {};
    }

    @Action({commit: 'addItem'})
    async create(Page: Page) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .addPage(Page)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data;
        return {};
    }

    @Action({commit: 'updateItem'})
    async update(payload: { id: number; Page: Page }) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updatePage(payload.id, payload.Page)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data;
        return {};
    }

    @Action({commit: 'deleteItem'})
    async delete(id: number) {
        this.setLoading(true);
        const response = await PageApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deletePage(id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data;
        return {};
    }
}
