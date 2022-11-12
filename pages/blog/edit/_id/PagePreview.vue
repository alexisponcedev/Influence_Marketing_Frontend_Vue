<template>
  <div>
    <page-preview :show-title="false" :value="Page.draft ?? Page.widgets" class="tw-bg-white" />
    <loading-overlay :show="Api.Page.loading"/>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {Api} from "@/store";
import {Page} from "~/repositories";
import {BlockInterface} from "~/interfaces/BlockInterface";

@Component
export default class PagePreviewSection extends Vue {
  Api = Api;

  tab = "";

  Page: Page = {};

  async mounted() {
    this.Page = (await Api.Page.get(+this.$route.params.id)) as Page;
  }
}
</script>
