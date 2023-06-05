<template>
    <loading-overlay show />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Index extends Vue {
    created() {
        if (this.$route.query.brand)
            localStorage.setItem("active_brand", "" + this.$route.query.brand);
        this.$router.push(
            "/auth" +
                (!this.$route.query.token
                    ? ""
                    : "?token=" + this.$route.query.token)
        );
    }
}
</script>
