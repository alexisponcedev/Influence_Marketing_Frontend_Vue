import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import getActiveBrand from "@/utils/getActiveBrand";
import {
    Redirect,
    Configuration,
    RedirectResource,
    RedirectApiFactory,
} from "@/repositories";

@Module({
    name: "api__redirect",
    stateFactory: true,
    namespaced: true,
})
export default class api__redirect extends VuexModule {
    loading: Boolean = false;
    all: Array<RedirectResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<RedirectResource>) {
        this.all = all;
    }

    @Action({commit: "updateAll"})
    async getAll() {
        this.setLoading(true);
        const response = await RedirectApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .redirectList(getActiveBrand())
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        ) {
            return response.data.data;
        }
        return [];
    }

    @Action({commit: "updateAll"})
    async getPageRedirects(id: number) {
        this.setLoading(true);
        const response = await RedirectApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getRedirectsByPageId(getActiveBrand(), id)
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
        const response = await RedirectApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getRedirect(getActiveBrand(), id)
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
    async create(Redirect: Redirect) {
        this.setLoading(true);
        Redirect.source_url = Redirect.source_url?.replace("https://public.stage.hisenseportal.com" , "")
        Redirect.redirect_url = Redirect.redirect_url?.replace("https://public.stage.hisenseportal.com" , "")
        const response = await RedirectApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .addRedirect(getActiveBrand(), Redirect)
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
    async update(payload: { id: number; Redirect: Redirect }) {
        this.setLoading(true);
        payload.Redirect.source_url = payload.Redirect.source_url?.replace("https://public.stage.hisenseportal.com" , "")
        payload.Redirect.redirect_url = payload.Redirect.redirect_url?.replace("https://public.stage.hisenseportal.com" , "")
        const response = await RedirectApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updateRedirect(getActiveBrand(), payload.id, payload.Redirect)
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
        const response = await RedirectApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deleteRedirect(getActiveBrand(), id)
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
