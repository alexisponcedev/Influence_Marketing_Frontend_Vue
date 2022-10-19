import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
  Page,
  PageResource,
  Configuration,
  PageApiFactory, Draft, Widgets,
} from "@/repositories";

@Module({
  name: "api__page",
  stateFactory: true,
  namespaced: true,
})
export default class api__page extends VuexModule {
  loading: Boolean = false;
  all: Array<PageResource> = [];
  routes : Array<any> = [];

  @Mutation
  setLoading(status: Boolean) {
    this.loading = status;
  }

  @Mutation
  updateAll(all: Array<PageResource>) {
    this.all = all;
  }

  @Mutation
  updateRoutes(routes: Array<any>) {
    // this.routes = [{title : 'Static Route' , value : '#'}] .concat(routes);
    this.routes = routes;
  }

  @Action({ commit: "updateAll" })
  async getAll() {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .pageList()
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data!.map(page => {
        return { ... page , hasData : page.widgets && page.widgets.length > 0 ? 'Yes' : ''}
      });
    return [];
  }

  @Action({ commit: "updateAll" })
  async getDynamicPages() {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getListDynamicPage()
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data;
    return [];
  }



  @Action({ commit: "updateRoutes" })
  async getRoutes() {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .pageList()
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data!.map(page => {
        return {
          title: page.title,
          model_id : page.model_id,
          model_type : page.model_type,
          route: 'https://hisense-usa.com' + page.route,
          relative: page.route,
          absolute: page.route!.toString().replace('[...param]' , page.model_id + '/' + page.title!.toLowerCase().replace(/ /g, '-'))
        }
      });
    return [];
  }

  @Action({ commit: "updateRoutes" })
  clearRoutes() {
    return [];
  }

  @Action
  async get(id: number) {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getPage(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async create(Page: Page) {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .addPage(Page)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async saveDraft(draft : Draft) {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .updatePageDraft(Number(draft.page_id) , draft)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async getDraft(id : number) {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getPageDraft(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async savePageWidgets(widgets : Widgets) {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .updatePageWidgets(Number(widgets.page_id) , widgets)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async update(payload: { id: number; Page: Page }) {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .updatePage(payload.id, payload.Page)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async delete(id: number) {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .deletePage(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }
}
