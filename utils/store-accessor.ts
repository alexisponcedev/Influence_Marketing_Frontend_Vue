import { getModule } from "vuex-module-decorators";
import themeConfig from "@/store/themeConfig";
import appStore from "@/store/appStore";
import { Store } from "vuex";

import api__auth from "@/store/api__auth";
import api__user from "@/store/api__user";
import api__region from "@/store/api__region";
import api__adventure from "@/store/api__adventure";

let AppStore: appStore;
let ThemeConfig = themeConfig;

class Api {
  static Auth: api__auth;
  static User: api__user;
  static Region: api__region;
  static Adventure: api__adventure;
}

function initialiseStores(store: Store<any>): void {
  AppStore = getModule(appStore, store);
  Api.Auth = getModule(api__auth, store);
  Api.User = getModule(api__user, store);
  Api.Region = getModule(api__region, store);
  Api.Adventure = getModule(api__adventure, store);
}

export { initialiseStores, AppStore, Api, ThemeConfig };
