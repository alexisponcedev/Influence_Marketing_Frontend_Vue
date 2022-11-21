import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
  Page,
  PageResource,
  Configuration,
  PageApiFactory, Draft, Widgets, CategoryResource,
} from "@/repositories";

@Module({
  name: "api__page",
  stateFactory: true,
  namespaced: true,
})

export default class api__page extends VuexModule {
  loading: Boolean = false;
  all: Array<PageResource> = [];
  routes: Array<any> = [];

  @Mutation
  setLoading(status: Boolean) {
    this.loading = status;
  }

  @Mutation
  updateAll(all: Array<PageResource>) {
    this.all = all;
  }

  @Mutation
  deleteItem(id: number) {
    this.all.splice(this.all.findIndex((i: PageResource) => i.id === id), 1);
  }

  @Mutation
  addItem(item: PageResource) {
    this.all.push(item);
  }

  @Mutation
  updateItem(item: PageResource) {
    this.all = this.all.map((i: PageResource) => {
      return i.id === item.id ? item : i
    });
  }



  @Mutation
  updateRoutes(routes: Array<any>) {
    this.routes = routes;

    this.routes = [
      // {
      //   id: 0,
      //   title: 'Root',
      //   model_id: 0,
      //   model_type: '',
      //   route: '/',
      //   domain: 'https://hisense-usa.com',
      // },
      ...routes.map((page: any) => {
        return {
          id: page.id,
          title: page.title,
          model_id: page.model_id,
          model_type: page.model_type,
          route: page.route,
          domain: 'https://hisense-usa.com' + page.route,
        }
      })
    ];
  }

  @Action({commit: "updateAll"})
  @Action({commit: "updateRoutes"})
  async getAll() {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getListAllPages()
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data;
    return [];
  }

  @Action({commit: "updateAll"})
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


  @Action({commit: "updateRoutes"})
  async getRoutes() {
    this.setLoading(true);
    const response: any = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getListAllPages()
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data.data;
    return [];
  }

  @Action({commit: "updateRoutes"})
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
  async getPageByModelTypeModelId(payload: { model_id: number, model_type: string }) {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .getPageByModelTypeModelId(payload.model_type, payload.model_id)
      .catch((error) => {console.log(error)})
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action({commit : 'addItem'})
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
  async saveDraft(draft: Draft) {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .updatePageDraft(Number(draft.page_id), draft)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action
  async getDraft(id: number) {
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
  async savePageWidgets(widgets: Widgets) {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .updatePageWidgets(Number(widgets.page_id), widgets)
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }

  @Action({commit : 'updateItem'})
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

  @Action({commit : 'deleteItem'})
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

  @Action
  async doDeploy() {
    this.setLoading(true);
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .doDeploy()
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }


  @Action({commit : 'addItem'})
  async createPDP(payload: { product: any, type: string, route: string , slug : string }) {
    this.setLoading(true);
    let slug = payload.slug || (`${payload.product.name} ${payload.product.model} ` + (payload.product.hasOwnProperty('brand') ? payload.product.brand!.name : ''))
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
    let route = `${payload.route}/${slug}`;
    const response = await PageApiFactory(
      new Configuration({
        accessToken: localStorage.getItem("access_token") || "",
      })
    )
      .addPage({
        title: payload.product.name,
        route,
        meta: [
          {rel: 'blank', name: 'title', content: ''},
          {rel: 'blank', name: 'description', content: 'Hisense USA'},
          {rel: 'blank', name: 'robots', content: 'index'},

          {rel: 'property="og:site_name"', name: 'property="og:site_name"', content: 'Hisense USA'},
          {rel: 'property="og:title"', name: 'property="og:title"', content: payload.product.name},
          {rel: 'property="og:description"', name: 'property="og:description"', content: payload.product.name},
          {rel: 'property="og:image"', name: 'property="og:image"', content: payload.product.image},
          {rel: 'property="og:url"', name: 'property="og:url"', content: route},
          {rel: 'property="og:locale"', name: 'property="og:locale"', content: 'en_US'},
          {rel: 'property="og:type"', name: 'property="og:type"', content: 'website'},
        ],
        model_id: payload.product.id,
        model_type: payload.type,
      })
      .catch((error) => ResponseHandler.ErrorHandler(error))
      .finally(() => this.setLoading(false));
    if (response && response.data && ResponseHandler.checkResponse(response))
      return response.data;
    return {};
  }
}
