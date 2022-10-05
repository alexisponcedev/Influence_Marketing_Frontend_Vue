import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
  Adventure,
  Configuration,
  // ComponentResource,
  // ComponentApiFactory,
  // Component,
} from "@/repositories";

@Module({
  name: "api__component",
  stateFactory: true,
  namespaced: true,
})
export default class api__component extends VuexModule {
  loading: Boolean = false;
  // all: Array<ComponentResource> = [];

  @Mutation
  setLoading(status: Boolean) {
    this.loading = status;
  }

  // @Mutation
  // updateAll(all: Array<ComponentResource>) {
  //   this.all = all;
  // }

  // @Action({commit: "updateAll"})
  // async getAll() {
  //   this.setLoading(true);
  //   const response = await ComponentApiFactory(
  //     new Configuration({
  //       accessToken: localStorage.getItem("access_token") || "",
  //     })
  //   )
  //     .componentList()
  //     // .catch((error) => ResponseHandler.ErrorHandler(error))
  //     .finally(() => this.setLoading(false));
  //   if (response && response.data && ResponseHandler.checkResponse(response))
  //     return response.data.data;
  //   return [];
  // }

  // @Action
  // async get(id: number) {
  //   this.setLoading(true);
  //   const response = await ComponentApiFactory(
  //     new Configuration({
  //       accessToken: localStorage.getItem("access_token") || "",
  //     })
  //   )
  //     .getComponent(id)
  //     // .catch((error) => ResponseHandler.ErrorHandler(error))
  //     .finally(() => this.setLoading(false));
  //   this.setLoading(false);
  //   if (response && response.data && ResponseHandler.checkResponse(response))
  //     return response.data.data;
  //   return {};
  // }

  // @Action
  // async create(component: Component) {
  //   this.setLoading(true);
  //   const response = await ComponentApiFactory(
  //     new Configuration({
  //       accessToken: localStorage.getItem("access_token") || "",
  //     })
  //   )
  //     .addComponent(component)
  //     // .catch((error) => ResponseHandler.ErrorHandler(error))
  //     .finally(() => this.setLoading(false));
  //   this.setLoading(false);
  //   if (response && response.data && ResponseHandler.checkResponse(response))
  //     return response.data;
  //   return {};
  // }

  // @Action
  // async update(payload: { id: number; component: Component }) {
  //   this.setLoading(true);
  //   const response = await ComponentApiFactory(
  //     new Configuration({
  //       accessToken: localStorage.getItem("access_token") || "",
  //     })
  //   )
  //     .updateComponent(payload.id, payload.component)
  //     // .catch((error) => ResponseHandler.ErrorHandler(error))
  //     .finally(() => this.setLoading(false));
  //   if (response && response.data && ResponseHandler.checkResponse(response))
  //     return response.data;
  //   return {};
  // }
  //
  // @Action
  // async delete(id: number) {
  //   this.setLoading(true);
  //   const response = await ComponentApiFactory(
  //     new Configuration({
  //       accessToken: localStorage.getItem("access_token") || "",
  //     })
  //   )
  //     .deleteComponent(id)
  //     // .catch((error) => ResponseHandler.ErrorHandler(error))
  //     .finally(() => this.setLoading(false));
  //   this.setLoading(false);
  //   if (response && response.data && ResponseHandler.checkResponse(response))
  //     return response.data;
  //   return {};
  // }

  // @Action
  // async getByCategoryId(categoryId: number) {
  //   this.setLoading(true);
  //   const response = await ComponentApiFactory(
  //     new Configuration({
  //       accessToken: localStorage.getItem("access_token") || "",
  //     })
  //   )
  //     .getComponentByCategoryId(categoryId)
  //     .catch((error) => ResponseHandler.ErrorHandler(error))
  //     .finally(() => this.setLoading(false));
  //   this.setLoading(false);
  //   if (response && response.data && ResponseHandler.checkResponse(response))
  //     return response.data.data;
  //   return [];
  // }

}
