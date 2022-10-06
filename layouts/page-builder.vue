<template>
    <default-layout>
        <PageBuilderControl />
        <PageBuilderContents />
    </default-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import defaultLayout from "./default.vue";
import PageBuilderControl from "./page-builder-control/index.vue";
import PageBuilderContents from "./page-builder-contents/index.vue";

@Component({
    components: {
        defaultLayout,
        PageBuilderControl,
        PageBuilderContents
    },
    middleware: ["auth"],
})
export default class PageBuilderLayout extends Vue { }
</script>
