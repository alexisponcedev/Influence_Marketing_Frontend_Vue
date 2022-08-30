import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
  Region,
  Configuration,
  RegionResource,
  RegionApiFactory,
} from "@/repositories";

@Module({
  name: "api__region",
  stateFactory: true,
  namespaced: true,
})
export default class api__region extends VuexModule {
  loading: Boolean = false;
  all: Array<RegionResource> = [];

  @Mutation
  setLoading(status: Boolean) {
    this.loading = status;
  }

  @Mutation
  updateAll(all: Array<RegionResource>) {
    this.all = all;
  }

  @Action({ commit: "updateAll" })
  async getAll() {
    this.setLoading(true);
    const response = await RegionApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .regionList()
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
    const response = await RegionApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getRegion(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data;
    return {};
  }

  @Action
  async create(region: Region) {
    this.setLoading(true);
    const response = await RegionApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .addRegion(region)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async update(payload: { id: number; region: Region }) {
    this.setLoading(true);
    const response = await RegionApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .updateRegion(payload.id, payload.region)
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
    const response = await RegionApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .deleteRegion(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }
}
