<template>
    <v-container fluid>


        <v-row>
            <v-col>
                <v-tabs v-model="tab" background-color="transparent">
                    <v-tab href="all">All Deleted Pages</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-card>
            <table-standard :config="config" class="row-pointer" :items="Api.Page.all" :loading="Api.Page.loading"
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
import { Vue, Component } from "vue-property-decorator";
import { PageResource } from "@/repositories";
import { Api, AppStore } from "@/store";
import { PageTypeEnum } from "~/interfaces/PageTypeEnum";

@Component({ layout: "panel" })
export default class AllPages extends Vue {
    Api = Api;

    tab = PageTypeEnum.all;

    PageType = PageTypeEnum;

    config = {
        headers: [
            { text: "Title", value: "title" },
            { text: "Route", value: "route" },
            { text: "", value: "actions", sortable: false, width: "0" },
        ],
        actions: [
            {
                type: "delete",
                icon: "mdi-backup-restore",
                onClick: (Page: PageResource) => {
                    AppStore.showDeleteConfirmationModal({
                        deleteItemTitle: Page.title || "",
                        deleteItem: Page,
                        agreeButton: { callback: this.restorePage },
                    });
                },
            }, {
                type: "delete",
                icon: "mdi-delete-forever",
                onClick: (Page: PageResource) => {
                    AppStore.showDeleteConfirmationModal({
                        deleteItemTitle: Page.title || "",
                        deleteItem: Page,
                        agreeButton: { callback: this.deletePage },
                    });
                },
            },
        ]
    };

    mounted() {
        this.updatePages();
    }

    async updatePages() {
        await Api.Page.getDeletedPages();
    }

    restorePage(Page: PageResource) {
        Api.Page.restorePage(Page.id!)
            .then(this.updatePages);
    }

    deletePage(Page: PageResource) {
        Api.Page.forceDelete(Page.id!)
            .then(this.updatePages);
    }

    get userId() {
        let profile = JSON.parse(localStorage.getItem('profile')!.toString());
        return profile ? profile.user_id : 0;
    }
}
</script>
