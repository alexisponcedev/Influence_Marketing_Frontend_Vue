<template>
  <loading-overlay show />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import getProfile from "@/utils/getProfile";
import { Api, AppStore } from "@/store";

@Component
export default class Auth extends Vue {
  mounted() {
    this.init();
  }

  async init() {
    if (this.$route.query.token)
      await Api.Auth.inquery("" + this.$route.query.token);
    if (localStorage.getItem("access_token")) {
      await Api.Auth.getUser();
      const activeBrandId = this.getActiveBrandId();
      if (activeBrandId) {
        localStorage.setItem("active_brand_id", activeBrandId.toString());
        this.goToApp();
      } else
        AppStore.showSnackBar({
          message: "ERROR: Brand Not Detected",
          color: "error",
        });
    } else if (process.env.PORTAL_URL)
      window.location.href =
        process.env.PORTAL_URL +
        (process.env.APP_NAME
          ? "?application=" + encodeURIComponent(process.env.APP_NAME)
          : "");
    else
      AppStore.showSnackBar({
        message: "Portal URL Not Resolved!",
        color: "error",
      });
  }

  async goToApp() {
    if (!Api.Site.all.length) await Api.Site.getAll();
    this.$router.push("/page");
  }

  getActiveBrandId() {
    let brand_id: number | null = null;
    const applications = getProfile().applications;
    if (applications && applications.length) {
      const finded = applications.filter(
        (app: any) =>
          app.name.replace(/ /g, "").toLowerCase() == process.env.APP_NAME
      );
      if (finded && finded.length) {
        const brands = finded[0].brands;
        if (brands && brands.length) {
          const finded = brands.filter(
            (brand: any) =>
              brand.brand.name.replace(/ /g, "").toLowerCase() ==
              localStorage.getItem("active_brand")
          );
          if (finded && finded.length) {
            const brand = finded[0];
            brand_id = brand.brand.id;
          }
        }
      }
    }
    return brand_id;
  }
}
</script>
