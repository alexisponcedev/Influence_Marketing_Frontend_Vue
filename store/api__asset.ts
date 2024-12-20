import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import getActiveBrand from "@/utils/getActiveBrand";
import {
    Asset,
    Configuration,
    AssetResource,
    AssetApiFactory,
} from "@/repositories";

@Module({
    name: "api__asset",
    stateFactory: true,
    namespaced: true,
})
export default class api__asset extends VuexModule {
    loading: Boolean = false;
    all: Array<AssetResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<AssetResource>) {
        this.all = all;
    }

    @Action({commit: "updateAll"})
    async getAll() {
        this.setLoading(true);
        const response = await AssetApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .assetList(getActiveBrand())
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

    @Action({commit: "updateAll"})
    async searchAssets(search: string) {
        this.setLoading(true);
        const response: any = await AssetApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .doSearchAsset(getActiveBrand(), search)
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
        const response = await AssetApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getAsset(getActiveBrand(), id)
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
    async create(Asset: Asset) {
        this.setLoading(true);
        const response = await AssetApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .addAsset(getActiveBrand(), Asset)
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
    async update(payload: { id: number; Asset: Asset }) {
        this.setLoading(true);
        const response = await AssetApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updateAsset(getActiveBrand(), payload.id, payload.Asset)
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
    async delete(id: number) {
        this.setLoading(true);
        const response = await AssetApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deleteAsset(getActiveBrand(), id)
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
