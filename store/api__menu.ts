import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import getActiveBrand from "@/utils/getActiveBrand";
import safeString from "@/utils/safeString";
import {
    Menu,
    MenuResource,
    Configuration,
    MenuApiFactory,
} from "@/repositories";

@Module({
    name: "api__menu",
    stateFactory: true,
    namespaced: true,
})
export default class api__menu extends VuexModule {
    loading: Boolean = false;
    all: Array<MenuResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<MenuResource>) {
        this.all = all;
    }

    @Action({ commit: "updateAll" })
    async getAll() {
        this.setLoading(true);
        const response = await MenuApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .menuList(getActiveBrand())
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

    //TODO: remote get and getHeader and footer
    @Action
    async getHeader() {
        return await this.get(parseInt(process.env.HEADER_KEY || "1"));
    }

    @Action
    async getFooter() {
        return await this.get(parseInt(process.env.FOOTER_KEY || "2"));
    }

    @Action
    async get(id: number) {
        this.setLoading(true);
        const response = await MenuApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getMenu(getActiveBrand(), id)
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
    async getMenu(id: number) {
        this.setLoading(true);
        const response = await MenuApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getMenu(getActiveBrand(), id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data.data;
        return {} as MenuResource;
    }

    @Action
    async create(Menu: Menu) {
        this.setLoading(true);
        Menu.widgets = JSON.parse(safeString(JSON.stringify(Menu.widgets)));
        const response = await MenuApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .addMenu(getActiveBrand(), Menu)
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
    async update(payload: { id: number; Menu: Menu }) {
        this.setLoading(true);
        payload.Menu.widgets = JSON.parse(
            safeString(JSON.stringify(payload.Menu.widgets))
        );
        const response = await MenuApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updateMenu(getActiveBrand(), payload.id, payload.Menu)
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
        const response = await MenuApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deleteMenu(getActiveBrand(), id)
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
    async addTranslation(payload: {
        id: number;
        language: string;
        widgets: Array<any>;
    }) {
        this.setLoading(true);
        payload.widgets = JSON.parse(
            safeString(JSON.stringify(payload.widgets))
        );
        const response = await MenuApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .addMenuTranslation(
                getActiveBrand(),
                payload.id,
                payload.language,
                { widgets: payload.widgets }
            )
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
