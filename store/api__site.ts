import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
  Site,
  SiteResource,
  Configuration,
  SiteApiFactory,
} from "@/repositories";

@Module({
  name: "api__site",
  stateFactory: true,
  namespaced: true,
})
export default class api__site extends VuexModule {
  loading: Boolean = false;
  all: Array<SiteResource> = [];

  @Mutation
  setLoading(status: Boolean) {
    this.loading = status;
  }

  @Mutation
  updateAll(all: Array<SiteResource>) {
    this.all = all;
  }

  @Action({ commit: "updateAll" })
  async getAll() {
    this.setLoading(true);
    const response = await SiteApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .siteList()
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data;
    return [];
  }

  @Action
  async get(id: number) {
    this.setLoading(true);
    const response = await SiteApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getSite(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data;
    return {};
  }

  @Action
  async create(Site: Site) {
    this.setLoading(true);
    const response = await SiteApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .addSite(Site)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async update(payload: { id: number; Site: Site }) {
    this.setLoading(true);
    const response = await SiteApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .updateSite(payload.id, payload.Site)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async delete(id: number) {
    this.setLoading(true);
    const response = await SiteApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .deleteSite(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async getSiteStatus(siteId: number) {
    this.setLoading(true);
    const response = await SiteApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getSiteStatus(siteId)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data?.enable || 0;
    return {};
  }

  @Action
  async setSiteStatus(payload: { siteId: number; status: number }) {
    this.setLoading(true);
    const response = await SiteApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .setSiteStatus(payload.siteId, payload.status)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }
}
