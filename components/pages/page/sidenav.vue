<template>
    <v-card
        elevation="0"
        class="tw-max-h-[650px] tw-col-span-3 tw-overflow-y-auto py-5 px-4"
    >
        <v-card-title class="pa-0 mb-4 tw-font-bold"> Pages </v-card-title>
        <v-text-field
            outlined
            single-line
            hide-details
            label="Search"
            class="mb-1"
            append-icon="mdi-magnify"
            v-model="searchTerm"
        />
        <!-- <form-field-text :field="searchBoxFiled" v-model="searchTerm" /> -->
        <v-list>
            <v-list-item v-for="item in pagesList" :key="item.id" class="px-0">
                <button
                    class="tw-text-left tw-py-3 tw-w-full tw-border-0 tw-border-b tw-border-b-neutral-400 tw-border-solid"
                    @click="() => $router.push('/page/edit/' + item.id)"
                >
                    <div
                        class="tw-font-semibold tw-text-sm tw-text-[#212121] tw-opacity-80 tw-block tw-text-ellipsis tw-max-w-[180px] tw-whitespace-nowrap tw-overflow-hidden"
                    >
                        {{ item.title }}
                    </div>
                    <div
                        class="tw-font-semibold tw-text-[10px] tw-text-[#212121] tw-opacity-80 tw-block mt-1 tw-text-ellipsis tw-max-w-[180px] tw-whitespace-nowrap tw-overflow-hidden"
                    >
                        {{ domain }}{{ item.route }}
                    </div>
                </button>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue, Watch } from "vue-property-decorator";
import { Api } from "@/store";

@Component
export default class PageSideNav extends Vue {
    // @VModel({type: String})  searchTerm !: string;
    searchTerm = "";
    pages: Array<any> = [];
    searchBoxFiled = {
        placeholder: "search pages",
        type: "text",
        rules: [],
    };

    @Watch("searchTerm")
    onSearchTermChange() {
        this.pages = Api.Page.all.filter((item: any) =>
            item.title.includes(this.searchTerm)
        );
    }

    mounted() {
        this.updatePages();
        this.pages = Api.Page.all;
    }

    get domain() {
        return process.env.LIVE_WEBSITE;
    }

    get pagesList() {
        this.pages = Api.Page.all.filter((item: any) =>
            item.title.includes(this.searchTerm)
        );
        return this.pages;
    }

    async updatePages() {
        await Api.Page.getAll();
    }
}
</script>
