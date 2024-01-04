import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { AuthApiFactory, Configuration } from "@/repositories";
import ResponseHandler from "@/utils/ResponseHandler";
import getActiveBrand from "~/utils/getActiveBrand";

@Module({
    name: "api__auth",
    stateFactory: true,
    namespaced: true,
})
export default class api__auth extends VuexModule {
    loading: Boolean = false;
    languages: Array<{ id: number; title: string; slug: string }> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateLanguages(languages: Array<any>) {
        this.languages = languages;
    }

    @Action
    async inquery(publicKey: string) {
        this.setLoading(true);
        const response = await AuthApiFactory()
            .userInquiry(publicKey)
            .catch((error) => ResponseHandler.ErrorHandler(error, true))
            .finally(() => this.setLoading(false));
        this.setLoading(false);
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        ) {
            localStorage.setItem(
                "access_token",
                (response.data as any).user_token || ""
            );
            return response.data;
        }
    }

    @Action
    async getUser() {
        this.setLoading(true);
        const response = await AuthApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getUserInfo()
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        this.setLoading(false);
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        ) {
            localStorage.setItem(
                "profile",
                JSON.stringify(response.data.user) || "{}"
            );
            return response.data;
        }
        return {};
    }

    @Action({ commit: "updateLanguages" })
    async getBrandLanguages() {
        this.setLoading(true);
        const response: any = await AuthApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .authBrand(getActiveBrand())
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        this.setLoading(false);
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data.brand.languages;
        return [];
    }
}
