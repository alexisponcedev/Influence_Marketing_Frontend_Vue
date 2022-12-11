import { getModule } from "vuex-module-decorators";
import themeConfig from "@/store/themeConfig";
import appStore from "@/store/appStore";
import { Store } from "vuex";

import api__auth from "@/store/api__auth";
import api__page from "@/store/api__page";
import api__post from "@/store/api__post";
import api__menu from "@/store/api__menu";
import api__block from "@/store/api__block";
import api__asset from "@/store/api__asset";
import api__history from "@/store/api__history";
import api__setting from "@/store/api__setting";
// import api__constant from "@/store/api__constant";
import api__redirect from "@/store/api__redirect";
import api__category from "@/store/api__category";
import api__template from "@/store/api__template";
import api__notification from "@/store/api__notification";
import api__error from "~/store/api__error";

let AppStore: appStore;
let ThemeConfig = themeConfig;

class Api {
    static Auth: api__auth;
    static Page: api__page;
    static Asset: api__asset;
    static Error: api__error;
    static Block: api__block;
    static Post: api__post;
    static Menu: api__menu;
    static History: api__history;
    static Setting: api__setting;
    static Template: api__template;
    static Redirect: api__redirect;
    static Category: api__category;
    // static Constant: api__constant;
    static Notification: api__notification;
}

function initialiseStores(store: Store<any>): void {
    AppStore = getModule(appStore, store);
    Api.Auth = getModule(api__auth, store);
    Api.Page = getModule(api__page, store);
    Api.Post = getModule(api__post, store);
    Api.Menu = getModule(api__menu, store);
    Api.Asset = getModule(api__asset, store);
    Api.Error = getModule(api__error, store);
    Api.History = getModule(api__history, store);
    Api.Setting = getModule(api__setting, store);
    Api.Template = getModule(api__template, store);
    Api.Category = getModule(api__category, store);
    Api.Redirect = getModule(api__redirect, store);
    // Api.Constant = getModule(api__constant, store);
    Api.Notification = getModule(api__notification, store);
}

export { initialiseStores, AppStore, Api, ThemeConfig };
