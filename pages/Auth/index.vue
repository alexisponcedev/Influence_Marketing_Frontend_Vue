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
        localStorage.setItem("active_brand", `hisenseusa`);
        localStorage.setItem(
            "access_token",
            `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiOTU1ZDNjNjMxZGUyODc2MmEzY2IyZWJmYzQyYmIyMmRjMTY3NGY5OTA5Mjk0MmQ1ZjZkN2QxY2Q5OWRjMzBlNDgxN2RlYzNiZGU1Zjg3MzgiLCJpYXQiOjE2NzAzNTY5OTcuOTI2ODAzLCJuYmYiOjE2NzAzNTY5OTcuOTI2ODA1LCJleHAiOjE3MDE4OTI5OTcuOTE5MjI2LCJzdWIiOiIxNSIsInNjb3BlcyI6W119.itzq0Y--RenaIVor5MR2hRkDQDRdINdJfS7wq2Lv9vvZjp36ZZKrMkOv5tFG6kowOZR7hH86jc_SQNOmMOJH5gG3IT1V1EqI2C5L1z__m0cNkzYWVn-ebuYgrscGMOYrNBNGiK7VW2CZaGiXSn_h_kZpi0RTVnlPO5gxQC-XeNe7-dYZ41NDN4meTVVX52oGTd3l-M7_0XeUBwbtm9apePSI4jOf_pxiFToF7-MbJGylYCSysQZPAdTH4PHAOGf0zIk-cPV8hhke_osN0YA_aU9B2xBHEgdIEVEfhouQSpr8gfRijAzVff53JC6ZHU3KtmOHGPz4lLLDKSVycNj4Fkm4glqPuNlaCwL-i-2aqwUQIiG4EOphJVe-Z909MYK4OMwXsun6zYmTac3NIiXHZ-xsOlNoRyr4ULXgDtp19BRqGI61MvLjBYSNa5rDU_0ZWvxJ0EhxNsvTqaXviVPq2h0GwXnDqVne1Dm36RBll2SZ8yK7EiQ9o0YpgD6PeBWC33VHmilDsoO61KtlliT76eWxEyfDKrIKyO6pKFm7AAb1EMFrIsk8Qy_i-AglkIuef3DgD-ia66vlC1xCryH6odVHDNBJRLOSnV7ws9eemQEOw9aSbUIdjGbhkXDzS5ahOKU1UUu2XPyeMs4DACuEnm_Jo0yQllzk85hCh_6nng4`
        );
        localStorage.setItem(
            "profile",
            `{"access":true,"user_id":15,"user_name":"Reza Farhang","first_name":"Reza","last_name":"Farhang","level":"User","applications":[{"app_id":2,"name":"IM PIM","app_url":"https://importal.dev-api.hisenseportal.com/api/auth/getAppInfo/2","image":null,"brands":[{"brand":{"id":3,"name":"Hisense USA","logo":null},"role":{"id":1,"name":"Admin"}}],"permission":[]},{"app_id":3,"name":"IM CXM","app_url":"https://importal.dev-api.hisenseportal.com/api/auth/getAppInfo/3","image":null,"brands":[{"brand":{"id":3,"name":"Hisense USA","logo":null},"role":{"id":1,"name":"Admin"}}],"permission":[{"entity_id":1,"entity_name":"Page","actions":["Create","Read","Update","Delete"]},{"entity_id":2,"entity_name":"Post","actions":["Create","Read","Update","Delete"]},{"entity_id":3,"entity_name":"Template","actions":["Create","Read","Update","Delete"]},{"entity_id":4,"entity_name":"Notification","actions":["Create","Read","Update","Delete"]}]},{"app_id":5,"name":"IM CRM","app_url":"https://importal.dev-api.hisenseportal.com/api/auth/getAppInfo/5","image":null,"brands":[{"brand":{"id":3,"name":"Hisense USA","logo":null},"role":{"id":1,"name":"Admin"}}],"permission":[]},{"app_id":6,"name":"IM Events","app_url":"https://importal.dev-api.hisenseportal.com/api/auth/getAppInfo/6","image":null,"brands":[{"brand":{"id":3,"name":"Hisense USA","logo":null},"role":{"id":1,"name":"Admin"}}],"permission":[]},{"app_id":7,"name":"local","app_url":"https://importal.dev-api.hisenseportal.com/api/auth/getAppInfo/7","image":null,"brands":[{"brand":{"id":3,"name":"Hisense USA","logo":null},"role":{"id":1,"name":"Admin"}}],"permission":[]}]}`
        );
        localStorage.setItem("active_brand_id", `3`);
        localStorage.setItem("active_role", `Admin`);
        this.goToApp();

        // if (this.$route.query.token)
        //     await Api.Auth.inquery("" + this.$route.query.token);
        // if (localStorage.getItem("access_token")) {
        //     await Api.Auth.getUser();
        //     const activeBrandId = this.getActiveBrandId();

        //     const activeRole = this.getActiveRole();
        //     if (activeRole) {
        //         localStorage.setItem("active_role", activeRole);
        //     }

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

    getActiveRole() {
        let role: string | null = null;
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
                        role = brand.role.name;
                    }
                }
            }
        }
        return role;
    }
}
</script>
