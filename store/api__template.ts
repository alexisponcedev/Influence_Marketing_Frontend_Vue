import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import getActiveBrand from "@/utils/getActiveBrand";
import {
    Template,
    Configuration,
    TemplateResource,
    TemplateApiFactory,
} from "@/repositories";
import safeString from "~/utils/safeString";

@Module({
    name: "api__template",
    stateFactory: true,
    namespaced: true,
})
export default class api__template extends VuexModule {
    loading: Boolean = false;
    all: Array<TemplateResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<TemplateResource>) {
        this.all = all;
    }

    @Action({ commit: "updateAll" })
    async getAll() {
        this.setLoading(true);
        const response = await TemplateApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .templateList(getActiveBrand())
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
        const response = await TemplateApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getTemplate(getActiveBrand(), id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && ResponseHandler.checkResponse(response))
            return response.data;
        return {};
    }

    @Action
    async create(template: Template) {
        this.setLoading(true);
        template.widgets = JSON.parse(
            safeString(JSON.stringify(template.widgets))
        );
        const response = await TemplateApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .addTemplate(getActiveBrand(), template)
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
    async update(payload: { id: number; Template: Template }) {
        this.setLoading(true);
        payload.Template.widgets = JSON.parse(
            safeString(JSON.stringify(payload.Template.widgets))
        );
        const response = await TemplateApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updateTemplate(getActiveBrand(), payload.id, payload.Template)
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
        const response = await TemplateApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deleteTemplate(getActiveBrand(), id)
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
    async setAsTemplate(payload: {
        id: number;
        asTemplate: "support" | "firmwareOnly";
    }) {
        this.setLoading(true);
        var response = null;

        if (payload.asTemplate == "firmwareOnly")
            response = await TemplateApiFactory(
                new Configuration({
                    accessToken: localStorage.getItem("access_token") || "",
                })
            )
                .setAsFirmwareOnly(getActiveBrand(), payload.id)
                .catch((error) => ResponseHandler.ErrorHandler(error))
                .finally(() => this.setLoading(false));
        else if (payload.asTemplate == "support")
            response = await TemplateApiFactory(
                new Configuration({
                    accessToken: localStorage.getItem("access_token") || "",
                })
            )
                .setAsSupport(getActiveBrand(), payload.id)
                .catch((error) => ResponseHandler.ErrorHandler(error))
                .finally(() => this.setLoading(false));

        this.setLoading(false);

        if (
            response &&
            response.data &&
            ResponseHandler.checkResponse(response)
        )
            return response.data;
        return {};
    }
}
