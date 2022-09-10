import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
  Rule,
  RuleResource,
  Configuration,
  RuleApiFactory,
} from "@/repositories";

@Module({
  name: "api__rule",
  stateFactory: true,
  namespaced: true,
})
export default class api__rule extends VuexModule {
  loading: Boolean = false;
  all: Array<RuleResource> = [];

  @Mutation
  setLoading(status: Boolean) {
    this.loading = status;
  }

  @Mutation
  updateAll(all: Array<RuleResource>) {
    this.all = all;
  }

  @Action({ commit: "updateAll" })
  async getAll() {
    this.setLoading(true);
    const response = await RuleApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .rulesList()
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data;
    return [];
  }

  @Action
  async getBySiteId(siteId: number) {
    this.setLoading(true);
    const response = await RuleApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getRulesBySiteId(siteId)
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
    const response = await RuleApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getRule(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data;
    return {};
  }

  @Action
  async create(Rule: Rule) {
    this.setLoading(true);
    const response = await RuleApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .addRules(Rule)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async update(payload: { id: number; Rule: Rule }) {
    this.setLoading(true);
    const response = await RuleApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .updateRules(payload.id, payload.Rule)
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
    const response = await RuleApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .deleteRule(id)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    this.setLoading(false);
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }
}
