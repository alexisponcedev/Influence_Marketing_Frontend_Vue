<template>
    <v-container fluid>


        <v-row>
            <v-col>
                <v-tabs v-model="tab" background-color="transparent">
                    <v-tab :href="`#${PageType.all}`">All Pages</v-tab>
                    <v-tab :href="`#${PageType.landing}`">Landing Pages</v-tab>
                    <v-tab :href="`#${PageType.static}`">Static Pages</v-tab>
                    <v-tab :href="`#${PageType.product}`">PDP</v-tab>
                    <v-tab :href="`#${PageType.support}`">Support</v-tab>
                    <v-tab :href="`#${PageType.blog}`">Blog</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-card>
            <table-standard :config="config" class="row-pointer" :items="pagesList" :loading="Api.Page.loading"
                            @click:row="(Page) => $router.push('/page/edit/' + Page.id)">

                <template #item.title="{ item }">
                    {{ item.title }}
                    <v-icon small :color="item.locked_by === userId ? 'red' : ''" v-if="item.locked_by > 0">
                        mdi-lock
                    </v-icon>
                </template>

            </table-standard>
        </v-card>

    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {PageResource} from "@/repositories";
import {Api, AppStore} from "@/store";
import {PageTypeEnum} from "~/interfaces/PageTypeEnum";

@Component({layout: "panel"})
export default class AllPages extends Vue {
    Api = Api;

    tab = PageTypeEnum.all;

    PageType = PageTypeEnum;

    config = {
        headers: [
            {text: "Title", value: "title"},
            {text: "Route", value: "route"},
            {text: "Status", value: "status.name"},
            {text: "Created At", value: "created_at"},
            {text: "", value: "actions", sortable: false, width: "0"},
        ],
        actions: [
            {
                type: "duplicate",
                icon: "mdi-content-duplicate",
                onClick: (Page: PageResource) => {
                    AppStore.showConfirmationModal({
                        title: 'Duplicate Page',
                        text: `Are you sure, you want to duplicate page ${Page.title || ""} ?`,
                        agreeButton: {
                            callback: () => {
                                this.duplicatePage(Page)
                            }
                        },
                    });
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
                        agreeButton: {callback: this.deletePage},
                    });
                },
            },
        ],
        globalActions: [
            {
                text: "Add Page",
                class: 'btn',
                color: "primary",
                icon: "mdi-plus",
                to: "/page/add",
            },
        ],
    };

    mounted() {
        this.updatePages();
    }

    async updatePages() {
        await Api.Page.getAll();
    }

    deletePage(Page: PageResource) {
        Api.Page.delete(Page.id!).then(this.updatePages).then(Api.Page.doDeploy);
    }

    duplicatePage(Page: PageResource) {
        Api.Page.duplicatePage(Page.id!)
            .then(this.updatePages)
            .then(Api.Page.doDeploy);
    }


    get pagesList() {
        let pages: Array<any> = [];
        console.log(this.tab);
        switch (this.tab) {
            case PageTypeEnum.all:
                pages = Api.Page.all;
                break;
            case PageTypeEnum.landing:
                pages = Api.Page.all.filter(page => page.model_type == null && (page.route?.match(/\//g) || []).length === 1);
                break;
            case PageTypeEnum.static:
                pages = Api.Page.all.filter(page => page.model_type == null && (page.route?.match(/\//g) || []).length > 1);
                break;
            case PageTypeEnum.product:
                pages = Api.Page.all.filter(page => page.model_type === 'product');
                break;
            case PageTypeEnum.support:
                pages = Api.Page.all.filter(page => page.model_type === 'support');
                break;
            case PageTypeEnum.blog:
                pages = Api.Page.all.filter(page => page.model_type === 'post');
                break;
        }
        return pages;
    }

    get userId() {
        let profile = JSON.parse(localStorage.getItem('profile')!.toString());
        return profile ? profile.user_id : 0;
    }
}
</script>
