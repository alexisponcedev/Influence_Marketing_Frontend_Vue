import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
    Block,
    BlockResource,
    Configuration,
    BlockApiFactory,
} from "@/repositories";

@Module({
    name: "api__block",
    stateFactory: true,
    namespaced: true,
})
export default class api__block extends VuexModule {
    loading: Boolean = false;
    all: Array<BlockResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<BlockResource>) {
        this.all = all;
    }

    @Action({commit: "updateAll"})
    async getAll() {
        this.setLoading(true);
        const response = await BlockApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .blockList()
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
        const response = await BlockApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getBlock(id)
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
    async create(block: Block) {
        this.setLoading(true);
        const response = await BlockApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .addBlock(block)
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
    async update(payload: { id: number; block: Block }) {
        this.setLoading(true);
        const response = await BlockApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updateBlock(payload.id, payload.block)
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
        const response = await BlockApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deleteBlock(id)
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
