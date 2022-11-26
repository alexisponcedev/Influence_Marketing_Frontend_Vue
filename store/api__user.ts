import {VuexModule, Module, Mutation, Action} from "vuex-module-decorators";
import ResponseHandler from "@/utils/ResponseHandler";
import {
    User,
    Configuration,
    // UserResource,
    // UserApiFactory,
} from "@/repositories";

@Module({
    name: "api__user",
    stateFactory: true,
    namespaced: true,
})
export default class api__user extends VuexModule {
    loading: Boolean = false;

    // all: Array<UserResource> = [];

    @Mutation
    setLoading(status: Boolean) {
        this.loading = status;
    }

    // @Mutation
    // updateAll(all: Array<UserResource>) {
    //   this.all = all;
    // }

    // @Action({ commit: "updateAll" })
    // async getAll() {
    //   this.setLoading(true);
    //   const response = await UserApiFactory(
    //     new Configuration({
    //       accessToken: localStorage.getItem("access_token") || "",
    //     })
    //   )
    //     .userList()
    //     .catch((error : any) => ResponseHandler.ErrorHandler(error))
    //     .finally(() => this.setLoading(false));
    //   this.setLoading(false);
    //   if (response && response.data && ResponseHandler.checkResponse(response))
    //     return response.data.data;
    //   return [];
    // }

    // @Action
    // async get(id: number) {
    //   this.setLoading(true);
    //   const response = await UserApiFactory(
    //     new Configuration({
    //       accessToken: localStorage.getItem("access_token") || "",
    //     })
    //   )
    //     .getUser(id)
    //     .catch((error : any) => ResponseHandler.ErrorHandler(error))
    //     .finally(() => this.setLoading(false));
    //   this.setLoading(false);
    //   if (response && response.data && ResponseHandler.checkResponse(response))
    //     return response.data.data;
    //   return {};
    // }

    // @Action
    // async create(User: User) {
    //   this.setLoading(true);
    //   const response = await UserApiFactory(
    //     new Configuration({
    //       accessToken: localStorage.getItem("access_token") || "",
    //     })
    //   )
    //     .addUser(User)
    //     .catch((error : any) => ResponseHandler.ErrorHandler(error))
    //     .finally(() => this.setLoading(false));
    //   this.setLoading(false);
    //   if (response && response.data && ResponseHandler.checkResponse(response))
    //     return response.data;
    //   return {};
    // }

    // @Action
    // async update(payload: { id: number; User: User }) {
    //   this.setLoading(true);
    //   const response = await UserApiFactory(
    //     new Configuration({
    //       accessToken: localStorage.getItem("access_token") || "",
    //     })
    //   )
    //     .updateUser(payload.id, payload.User)
    //     .catch((error : any) => ResponseHandler.ErrorHandler(error))
    //     .finally(() => this.setLoading(false));
    //   this.setLoading(false);
    //   if (response && response.data && ResponseHandler.checkResponse(response))
    //     return response.data;
    //   return {};
    // }

    // @Action
    // async delete(id: number) {
    //   this.setLoading(true);
    //   const response = await UserApiFactory(
    //     new Configuration({
    //       accessToken: localStorage.getItem("access_token") || "",
    //     })
    //   )
    //     .deleteUser(id)
    //     .catch((error : any) => ResponseHandler.ErrorHandler(error))
    //     .finally(() => this.setLoading(false));
    //   this.setLoading(false);
    //   if (response && response.data && ResponseHandler.checkResponse(response))
    //     return response.data;
    //   return {};
    // }
}
