import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import getActiveBrand from "@/utils/getActiveBrand";
import {
    Notification,
    Configuration,
    NotificationResource,
    NotificationApiFactory,
} from "@/repositories";

@Module({
    name: "api__notification",
    stateFactory: true,
    namespaced: true,
})
export default class api__notification extends VuexModule {
    loading: Boolean = false;
    all: Array<NotificationResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<NotificationResource>) {
        this.all = all;
    }

    @Mutation
    deleteItem(id: number) {
        this.all.splice(
            this.all.findIndex((i: NotificationResource) => i.id === id),
            1
        );
    }

    @Mutation
    addItem(item: NotificationResource) {
        this.all.push(item);
    }

    @Mutation
    updateItem(item: NotificationResource) {
        this.all = this.all.map((i: NotificationResource) => {
            return i.id === item.id ? item : i;
        });
    }

    @Action({ commit: "updateAll" })
    async getAll() {
        this.setLoading(true);
        const response = await NotificationApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .notificationList(getActiveBrand())
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

    @Action({ commit: "updateRoutes" })
    clearRoutes() {
        return [];
    }

    @Action
    async get(id: number) {
        this.setLoading(true);
        const response = await NotificationApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .showNotification(id)
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

    @Action({ commit: "addItem" })
    async create(Notification: Notification) {
        this.setLoading(true);
        const response = await NotificationApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .importNotification(getActiveBrand(), Notification)
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

    @Action({ commit: "updateItem" })
    async update(payload: { id: number; Notification: Notification }) {
        this.setLoading(true);
        const response = await NotificationApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updateNotification(
                getActiveBrand(),
                payload.id,
                payload.Notification
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

    @Action({ commit: "deleteItem" })
    async delete(id: number) {
        this.setLoading(true);
        const response = await NotificationApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deleteNotification(id)
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
