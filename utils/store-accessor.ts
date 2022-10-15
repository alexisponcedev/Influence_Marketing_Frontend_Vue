import { getModule } from "vuex-module-decorators";
import themeConfig from "@/store/themeConfig";
import appStore from "@/store/appStore";
import { Store } from "vuex";

import api__auth from "@/store/api__auth";
import api__user from "@/store/api__user";
import api__site from "@/store/api__site";
import api__rule from "@/store/api__rule";
import api__page from "@/store/api__page";
import api__region from "@/store/api__region";
import api__constant from "@/store/api__constant";
import api__adventure from "@/store/api__adventure";
import api__component from "@/store/api__component";
import api__category from "@/store/api__category";
import api__block from "@/store/api__block";
import api__asset from "@/store/api__asset";
import api__template from "@/store/api__template";
import api__menu from "~/store/api__menu";

let AppStore: appStore;
let ThemeConfig = themeConfig;

class Api {
  static Auth: api__auth;
  static Asset: api__asset;
  static User: api__user;
  static Site: api__site;
  static Rule: api__rule;
  static Region: api__region;
  static Constant: api__constant;
  static Adventure: api__adventure;
  static Page: api__page;
  static Menu: api__menu;
  static Template: api__template;
  // static Component: api__component;
  static Category: api__category;
  static Block: api__block;
}

function initialiseStores(store: Store<any>): void {
  AppStore = getModule(appStore, store);
  Api.Auth = getModule(api__auth, store);
  Api.User = getModule(api__user, store);
  Api.Site = getModule(api__site, store);
  Api.Rule = getModule(api__rule, store);
  Api.Page = getModule(api__page, store);
  Api.Menu = getModule(api__menu, store);
  Api.Template = getModule(api__template, store);
  Api.Asset = getModule(api__asset, store);
  // Api.Component = getModule(api__component, store);
  Api.Category = getModule(api__category, store);
  Api.Region = getModule(api__region, store);
  Api.Constant = getModule(api__constant, store);
  Api.Adventure = getModule(api__adventure, store);
}

export { initialiseStores, AppStore, Api, ThemeConfig };
