import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
  Post,
  PostResource,
  Configuration,
  PostApiFactory, Draft, Widgets, PageResource,
} from "@/repositories";

@Module({
  name: "api__post",
  stateFactory: true,
  namespaced: true,
})
export default class api__post extends VuexModule {
  loading: Boolean = false;
  all: Array<PostResource> = [];

  @Mutation
  updateAll(all: Array<PageResource>) {
    this.all = all;
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
      .postList()
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
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
      .getPost(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
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
      .addPost(Post)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
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
      .updatePost(payload.id, payload.Post)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
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
      .deletePost(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }
}
