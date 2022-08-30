import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
  Adventure,
  Configuration,
  AdventureResource,
  AdventureApiFactory,
} from "@/repositories";

@Module({
  name: "api__adventure",
  stateFactory: true,
  namespaced: true,
})
export default class api__adventure extends VuexModule {
  loading: Boolean = false;
  all: Array<AdventureResource> = [];

  @Mutation
  setLoading(status: Boolean) {
    this.loading = status;
  }

  @Mutation
  updateAll(all: Array<AdventureResource>) {
    this.all = all;
  }

  @Action({ commit: "updateAll" })
  async getAll() {
    this.setLoading(true);
    const response = await AdventureApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .adventureList()
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
    const response = await AdventureApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getAdventure(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data;
    return {};
  }

  @Action
  async create(adventure: Adventure) {
    this.setLoading(true);
    const response = await AdventureApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .addAdventure(adventure)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async update(payload: { id: number; adventure: Adventure }) {
    this.setLoading(true);
    const response = await AdventureApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .updateAdventure(payload.id, payload.adventure)
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
    const response = await AdventureApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .deleteAdventure(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async getByRegionId(regionId: number) {
    this.setLoading(true);
    const response = await AdventureApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getAdventureByRegionId(regionId)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data;
    return [];
  }
}
