import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import getActiveBrand from "@/utils/getActiveBrand";
import {
    Configuration,
    ErrorResource,
    ErrorApiFactory, PageResource,
} from "@/repositories";

@Module({
    name: "api__error",
    stateFactory: true,
    namespaced: true,
})
export default class api__error extends VuexModule {
    loading: Boolean = false;
    all: Array<ErrorResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<ErrorResource>) {
        this.all = all;
    }

    @Mutation
    updateItem(item: ErrorResource) {
        this.all = this.all.map((i: PageResource) => {
            return i.id === item.id ? item : i;
        });
    }

    @Action({commit: "updateAll"})
    async getAll() {
        this.setLoading(true);
        const response = await ErrorApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .errorList(getActiveBrand())
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

    @Action
    async get(id: number) {
        this.setLoading(true);
        const response = await ErrorApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getError(getActiveBrand(), id)
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

    @Action({commit: "updateItem"})
    async setAsDone(id: number) {
        this.setLoading(true);
        const response = await ErrorApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .setAsDone(getActiveBrand(), id)
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
