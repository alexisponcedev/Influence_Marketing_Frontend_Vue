import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { Configuration, ForgeApiFactory } from "@/repositories";
import ResponseHandler from "@/utils/ResponseHandler";

@Module({
    name: "api__forge",
    stateFactory: true,
    namespaced: true,
})
export default class api__forge extends VuexModule {
    loading: Boolean = false;

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }
    @Action
    async cxmDeploy() {
        this.setLoading(true);
        const response = await ForgeApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .forgeCxmDeploy()
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
    async cxmDeployHistories() {
        this.setLoading(true);
        const response = await ForgeApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .forgeCxmDeployHistories()
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return (response.data as any).deployments;
        return [];
    }

    @Action
    async cxmDeployOutput(deploymentId: number) {
        this.setLoading(true);
        const response = await ForgeApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .forgeCxmDeployOutput(deploymentId)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data.output;
        return "";
    }

    @Action
    async cxmDeploymentLog() {
        this.setLoading(true);
        const response = await ForgeApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .forgeCxmDeploymentLog()
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
    async publicSiteDeploy() {
        this.setLoading(true);
        const response = await ForgeApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .forgePublicSiteDeploy()
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
    async publicSiteDeployHistories() {
        this.setLoading(true);
        const response = await ForgeApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .forgePublicSiteDeployHistories()
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return (response.data as any).deployments;
        return [];
    }

    @Action
    async publicSiteDeployOutput(deploymentId: number) {
        this.setLoading(true);
        const response = await ForgeApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .forgePublicSiteDeployOutput(deploymentId)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data.output;
        return "";
    }

    @Action
    async publicSiteDeploymentLog() {
        this.setLoading(true);
        const response = await ForgeApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .forgePublicSiteDeploymentLog()
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
