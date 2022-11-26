import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
    History,
    HistoryResource,
    Configuration,
    HistoryApiFactory, Draft, Widgets, CategoryResource, PageApiFactory, HistoryRequest,
} from "@/repositories";

@Module({
    name: "api__history",
    stateFactory: true,
    namespaced: true,
})

export default class api__history extends VuexModule {
    loading: Boolean = false;
    all: Array<HistoryResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<HistoryResource>) {
        this.all = all;
    }

    @Mutation
    deleteItem(id: number) {
        this.all.splice(this.all.findIndex((i: HistoryResource) => i.id === id), 1);
    }

    @Mutation
    addItem(item: HistoryResource) {
        this.all.push(item);
    }

    @Mutation
    updateItem(item: HistoryResource) {
        this.all = this.all.map((i: HistoryResource) => {
            return i.id === item.id ? item : i
        });
    }

    @Action({commit: "updateAll"})
    async getAll() {
        this.setLoading(true);
        const response = await HistoryApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getAllHistories()
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data.data;
        return [];
    }

    @Action({commit: "updateAll"})
    async getHistoryByModelNameModelId(payload: { model_id: number, model_name: string }) {
        this.setLoading(true);
        const response = await HistoryApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getHistoryByModelNameModelId(payload.model_name, payload.model_id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data;
        return [];
    }


    @Action({commit: 'updateItem'})
    async updateTitle(historyRequest: HistoryRequest) {
        this.setLoading(true);
        const response = await HistoryApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .historyTitleUpdate(historyRequest)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data;
        return {};
    }


}
