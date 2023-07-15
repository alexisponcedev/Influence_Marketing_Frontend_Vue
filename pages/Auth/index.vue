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
        localStorage.setItem("active_brand", `influencemarketing`);
        localStorage.setItem(
            "access_token",
            `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzU4MWZlMDkxMGJmMmQ2MGQ3ZGVhNjY3MDliMjIwMWJhNTdkMzQ1NjVjMjEyZDE0YzEzY2E2MGY5NDE1NTdlOGYzMjBhNjNkZDQ4ZWUwYzEiLCJpYXQiOjE2ODYwMzQ5OTUuNTkyNDM4LCJuYmYiOjE2ODYwMzQ5OTUuNTkyNDQsImV4cCI6MTcxNzY1NzM5NS41ODcxMzksInN1YiI6IjEwIiwic2NvcGVzIjpbXX0.vlgCA59chLW1IYBcSg6LTZgRRc7Mk1TJVnYpnU10Iln34nf2Cjz1jgvRB7hCWK0BHX4y8EoUH_BDA5Gd8fyxoNZVVjkHBOacT6j2ZiGnFfYqdsGlKOkNBM6S1xhtqZqVmgwCkeghOTXiWwOU1G3D2WrGfO9wgzCRESE-pwpFDIID5morRzbTNg9iDNSa5aqru-Z8jpGrWgn9PqwQQKwc1n471kZzsjskcpbeIWlrPyHs5aH5nVy2ySetXHmz71mvCPOkx2-YIFT1bEMelY5R9MvwC67JXJvw_a0v8NklkTPqlYogKAjC0HDXZ-xQxN9g1SOne7cHLAEJxOG0N_54I1RJyr0F7zzccMs62DMezbV8afX7GKSRMBqHiJFK-a3td2pGdKEq-6x18pEDEkv8mWuGwAFSWBeDO3JnIofUbobBEVJrAgZyfmfXj7dq7okC5JOClONY9XhrOGArFUGxyXI6n-veMkWKFZDU1fA5DzMFv_KIUarI7cgVhPqk0gTt9yOwTtmTou31YDndk6h9KMiIQg3ziKsoYjtXHdR96aJ_IqziW5ZAsEm5AqV3kliMtj1ZJ3YKDpjbFKbl-bWmIoJF-6iE6Ezn2tvWxCOBCMvxYNxbW4FSnOIbhG5zUjhXZ70paigYBk3uxiJwLqf1Q4r4c-coQzNq-TLy0yPTH-0`
        );
        localStorage.setItem(
            "profile",
            `{"access":true,"user_id":10,"user_name":"Reza Farhang","first_name":"Reza","last_name":"Farhang","level":"Admin","applications":[{"app_id":2,"name":"IM CXM","app_url":"/auth/getAppInfo/2","image":null,"brands":[{"brand":{"id":1,"name":"Influence Marketing","logo":null},"role":{"id":1,"name":"Admin"}},{"brand":{"id":3,"name":"IM Digital","logo":null},"role":{"id":1,"name":"Admin"}}],"permission":[]},{"app_id":5,"name":"IM Event","app_url":"/auth/getAppInfo/5","image":null,"brands":[{"brand":{"id":3,"name":"IM Digital","logo":null},"role":{"id":1,"name":"Admin"}},{"brand":{"id":5,"name":"AAFC","logo":null},"role":{"id":1,"name":"Admin"}}],"permission":[]}]}`
        );
        localStorage.setItem("active_brand_id", `1`);
        this.goToApp();
        // if (this.$route.query.token)
        //     await Api.Auth.inquery("" + this.$route.query.token);
        // if (localStorage.getItem("access_token")) {
        //     await Api.Auth.getUser();
        //     const activeBrandId = this.getActiveBrandId();
        //     if (activeBrandId) {
        //         localStorage.setItem(
        //             "active_brand_id",
        //             activeBrandId.toString()
        //         );
        //         this.goToApp();
        //     } else
        //         AppStore.showSnackBar({
        //             message: "ERROR: Brand Not Detected",
        //             color: "error",
        //         });
        // } else if (process.env.PORTAL_URL)
        //     window.location.href =
        //         process.env.PORTAL_URL +
        //         (process.env.APP_NAME
        //             ? "?application=" + encodeURIComponent(process.env.APP_NAME)
        //             : "");
        // else
        //     AppStore.showSnackBar({
        //         message: "Portal URL Not Resolved!",
        //         color: "error",
        //     });
    }

    async goToApp() {
        this.$router.push("/page");
    }

    getActiveBrandId() {
        let brand_id: number | null = null;
        const applications = getProfile().applications;
        if (applications && applications.length) {
            const finded = applications.filter(
                (app: any) =>
                    app.name.replace(/ /g, "").toLowerCase() ==
                    process.env.APP_NAME
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
