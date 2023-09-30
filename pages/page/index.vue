<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" background-color="transparent">
                    <v-tab
                        v-for="(item, index) in pageFilters"
                        :key="index"
                        v-if="item.if"
                        :href="`#${item.id}`"
                        >{{ item.title }}</v-tab
                    >
                </v-tabs>
            </v-col>
        </v-row>

        <v-card>
            <table-standard
                :config="config"
                class="row-pointer"
                :items="pagesList"
                :loading="Api.Page.loading"
                @click:row="(Page) => $router.push('/page/edit/' + Page.id)"
            >
                <template #item.title="{ item }">
                    {{ item.title }}
                    <v-tooltip bottom v-if="item.locked_by > 0">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                small
                                v-on="on"
                                v-bind="attrs"
                                :color="item.locked_by === userId ? 'red' : ''"
                            >
                                mdi-lock
                            </v-icon>
                        </template>
                        <span>
                            Locked by
                            {{ item.locked_by_name || "another Admin" }}
                        </span>
                    </v-tooltip>
                </template>
            </table-standard>
        </v-card>

        <page-duplicate ref="pageDuplicate" @created="updatePages" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import getActiveBrandName from "@/utils/getActiveBrandName";
import { PageTypeEnum } from "@/interfaces/PageTypeEnum";
import { PageResource } from "@/repositories";
import { Api, AppStore } from "@/store";

@Component({ layout: "panel" })
export default class AllPages extends Vue {
    Api = Api;

    tab = PageTypeEnum.all;

    PageType = PageTypeEnum;

    config = {
        headers: [
            { text: "Title", value: "title" },
            { text: "Route", value: "route" },
            { text: "Status", value: "status.name" },
            { text: "Created At", value: "created_at" },
            { text: "", value: "actions", sortable: false, width: "0" },
        ],
        actions: [
            {
                type: "duplicate",
                icon: "mdi-content-duplicate",
                onClick: (Page: PageResource) => {
                    this.showDuplicateDialog(Page);
                },
            },
            {
                type: "edit",
                icon: "mdi-pencil",
                to: "/page/edit/[id]",
            },
            {
                type: "delete",
                icon: "mdi-delete",
                onClick: (Page: PageResource) => {
                    AppStore.showDeleteConfirmationModal({
                        deleteItemTitle: Page.title || "",
                        deleteItem: Page,
                        agreeButton: { callback: this.deletePage },
                    });
                },
            },
        ],
        globalActions: [
            {
                text: "Add Page",
                class: "btn",
                color: "primary",
                icon: "mdi-plus",
                to: "/page/add",
            },
        ],
    };

    pageFilters = [
        {
            id: this.PageType.all,
            title: "All Pages",
            if: true,
        },
        {
            id: this.PageType.landing,
            title: "Landing Pages",
            if: getActiveBrandName() === "hisenseusa",
        },
        {
            id: this.PageType.static,
            title: "Static Pages",
            if: getActiveBrandName() === "hisenseusa",
        },
        {
            id: this.PageType.product,
            title: "PDP",
            if: getActiveBrandName() === "hisenseusa",
        },
        {
            id: this.PageType.support,
            title: "Support",
            if: getActiveBrandName() === "hisenseusa",
        },
        {
            id: this.PageType.blog,
            title: "Blog",
            if: getActiveBrandName() === "hisenseusa",
        },
    ];

    mounted() {
        this.updatePages();
    }

    async updatePages() {
        await Api.Page.getAll();
    }

    deletePage(Page: PageResource) {
        Api.Page.delete(Page.id!)
            .then(this.updatePages)
            .then(Api.Page.doDeploy);
    }

    showDuplicateDialog(Page: PageResource) {
        // if(!Page.model_id)
        (this.$refs.pageDuplicate as any).open(Page);
    }

    get pagesList() {
        let pages: Array<any> = [];
        console.log(this.tab);
        switch (this.tab) {
            case PageTypeEnum.all:
                pages = Api.Page.all;
                break;
            case PageTypeEnum.landing:
                pages = Api.Page.all.filter(
                    (page) =>
                        page.model_type == null &&
                        (page.route?.match(/\//g) || []).length === 1
                );
                break;
            case PageTypeEnum.static:
                pages = Api.Page.all.filter(
                    (page) =>
                        page.model_type == null &&
                        (page.route?.match(/\//g) || []).length > 1
                );
                break;
            case PageTypeEnum.product:
                pages = Api.Page.all.filter(
                    (page) => page.model_type === "product"
                );
                break;
            case PageTypeEnum.support:
                pages = Api.Page.all.filter(
                    (page) => page.model_type === "support"
                );
                break;
            case PageTypeEnum.blog:
                pages = Api.Page.all.filter(
                    (page) => page.model_type === "post"
                );
                break;
        }
        return pages;
    }

    get userId() {
        let profile = JSON.parse(localStorage.getItem("profile")!.toString());
        return profile ? profile.user_id : 0;
    }
}
</script>
