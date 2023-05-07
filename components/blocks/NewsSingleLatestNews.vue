<template>
    <div>
        <img src="/blocks/NewsSingleLatestNews.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";

@Component
export default class NewsSingleLatestNews extends Vue {
    @VModel({ type: Object }) model!: any;
}
</script>
