import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import getActiveBrand from "@/utils/getActiveBrand";
import {
    Setting,
    Configuration,
    SettingResource,
    SettingApiFactory,
} from "@/repositories";

@Module({
    name: "api__setting",
    stateFactory: true,
    namespaced: true,
})
export default class api__setting extends VuexModule {
    loading: Boolean = false;
    all: Array<SettingResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<SettingResource>) {
        this.all = all;
    }

    @Mutation
    async value(key: string) {
        if (this.all.length === 0) await this.getAll();
        return this.all.find((i) => i.key === key)?.value;
    }

    @Action({commit: "updateAll"})
    async getAll() {
        this.setLoading(true);
        const response = await SettingApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .settingList(getActiveBrand())
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
        const response = await SettingApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getSetting(id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && ResponseHandler.checkResponse(response))
            return response.data;
        return {};
    }

    @Action
    async getValue(key: string) {
        if (this.all.length === 0) await this.getAll();
        let obj = this.all.find((i) => i.key === key);
        return obj ? obj.value : "";
    }

    @Action
    async create(setting: Setting) {
        this.setLoading(true);
        const response = await SettingApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .addSetting(getActiveBrand(), setting)
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
    async update(payload: { id: number; Setting: Setting }) {
        this.setLoading(true);
        const response = await SettingApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updateSetting(getActiveBrand(), payload.id, payload.Setting)
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
        const response = await SettingApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deleteSetting(id)
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
