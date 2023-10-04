import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { Configuration, PublicDeploymentApiFactory } from "@/repositories";
import ResponseHandler from "@/utils/ResponseHandler";
import getActiveBrand from "@/utils/getActiveBrand";

@Module({
    name: "api__public_deployment",
    stateFactory: true,
    namespaced: true,
})
export default class api__public_deployment extends VuexModule {
    loading: Boolean = false;
    all: Array<any> = [];

    status: { inprogress: number; waiting: number } = {
        inprogress: 0,
        waiting: 0,
    };

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<any>) {
        this.all = all;
    }

    @Mutation
    setStatus(status: { inprogress: number; waiting: number }) {
        this.status = status;
    }

    @Action({ commit: "updateAll" })
    async getAll() {
        this.setLoading(true);
        const response = await PublicDeploymentApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .publicDeploymentIndex(getActiveBrand())
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        this.setLoading(false);

        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data.data;
        return [];
    }

    @Action({ commit: "setStatus" })
    async getStatus() {
        this.setLoading(true);
        const response = await PublicDeploymentApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .publicDeploymentStatus(getActiveBrand())
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        this.setLoading(false);

        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {
            inprogress: 0,
            waiting: 0,
        };
    }
}
