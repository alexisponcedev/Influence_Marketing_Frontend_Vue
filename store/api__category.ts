import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
    Configuration,
    CategoryResource, CategoryApiFactory, Category,
} from "@/repositories";

@Module({
    name: "api__category",
    stateFactory: true,
    namespaced: true,
})
export default class api__category extends VuexModule {
    loading: Boolean = false;
    all: Array<CategoryResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Mutation
    updateAll(all: Array<CategoryResource>) {
        this.all = all;
    }

    @Mutation
    deleteItem(id: number) {
        this.all.splice(this.all.findIndex((i: CategoryResource) => i.id === id), 1);
    }

    @Mutation
    addItem(item: CategoryResource) {
        this.all.push(item);
    }

    @Mutation
    updateItem(item: CategoryResource) {
        this.all = this.all.map((i: CategoryResource) => {
            return i.id === item.id ? item : i
        });
    }

    @Action({commit: "updateAll"})
    async getAll() {

        this.setLoading(true);
        let brand_id = Number(localStorage.getItem("active_brand_id") || 0);
        const response = await CategoryApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            ._062b0e17b0b265231ad33ece1785b1fe(brand_id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data.data;
        return [];
    }

    @Action
    async get(id: number) {
        this.setLoading(true);
        const response = await CategoryApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            ._0fd985657bea3b2f3a919bdc16fec5b9(id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data.data;
        return {};
    }

    @Action({commit: 'addItem'})
    async create(category: Category) {
        this.setLoading(true);
        const response = await CategoryApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            ._8a437c9b58cb5726b37615e8a5a9857c(category)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data;
        return {};
    }

    @Action({commit: 'updateItem'})
    async update(payload: { id: number; category: Category }) {
        this.setLoading(true);
        const response = await CategoryApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            ._2aeef67a0c5f4a9161985387cab71ccc(payload.id, payload.category)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        if (response && response.data && ResponseHandler.checkResponse(response))
            return response.data;
        return {};
    }

    @Action({commit: 'deleteItem'})
    async delete(id: number) {
        this.setLoading(true);
        const response = await CategoryApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .c22ffb01fe96cd5baf6a4174466b2672(id)
            .catch((error) => ResponseHandler.ErrorHandler(error))
            .finally(() => this.setLoading(false));
        // if (response && response.data && ResponseHandler.checkResponse(response))
        return id;
        // return {};
    }

}
