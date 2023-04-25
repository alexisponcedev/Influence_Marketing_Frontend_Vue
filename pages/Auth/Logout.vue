<template>
    <loading-overlay show />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Logout extends Vue {
    mounted() {
        localStorage.removeItem("profile");
        localStorage.removeItem("access_token");
        localStorage.removeItem("access_token_expires_at");
        localStorage.removeItem("active_brand");
        localStorage.removeItem("active_brand_id");
        if (process.env.PORTAL_URL)
            window.location.href = process.env.PORTAL_URL + "?logout";
        else this.$router.push("/auth");
    }
}
</script>
