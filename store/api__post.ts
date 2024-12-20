import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import getActiveBrand from "@/utils/getActiveBrand";
import {
    Post,
    PostResource,
    PageResource,
    Configuration,
    PostApiFactory,
} from "@/repositories";

@Module({
    name: "api__post",
    stateFactory: true,
    namespaced: true,
})
export default class api__post extends VuexModule {
    loading: Boolean = false;
    all: Array<PostResource> = [];
    allNews: Array<PostResource> = [];

    @Mutation
    updateAll(all: Array<PostResource>) {
        this.all = all;
    }

    @Mutation
    updateAllNews(all: Array<PostResource>) {
        this.allNews = all;
    }

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    @Action({ commit: "updateAll" })
    async getAll() {
        this.setLoading(true);
        const response = await PostApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .postList(getActiveBrand(), "blog")
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

    @Action({ commit: "updateAllNews" })
    async getAllNews() {
        this.setLoading(true);
        const response = await PostApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .postList(getActiveBrand(), "news")
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
        const response = await PostApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .getPost(getActiveBrand(), id)
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
    async create(Post: Post) {
        this.setLoading(true);
        const response = await PostApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .addPost(getActiveBrand(), Post)
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
    async update(payload: { id: number; Post: Post }) {
        this.setLoading(true);
        const response = await PostApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .updatePost(getActiveBrand(), payload.id, payload.Post)
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
        const response = await PostApiFactory(
            new Configuration({
                accessToken: localStorage.getItem("access_token") || "",
            })
        )
            .deletePost(getActiveBrand(), id)
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
