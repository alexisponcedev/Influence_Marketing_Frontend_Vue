<template>
    <v-container fluid style="background-color: #f2f3f8; height: 100vh">
        <v-card
            color="#FCFCFC"
            elevation="0"
            class="mb-4 px-7 page-builder-header"
        >
            <v-row align="center">
                <v-col cols="12" md="6">
                    <div class="tw-flex tw-space-x-2 tw-items-center">
                        <v-btn icon @click="discard">
                            <v-icon color="black" large>mdi-close</v-icon>
                        </v-btn>

                        <div>
                            <h1 class="text-h6 font-weight-bold mb-1">
                                Page builder
                            </h1>
                            <span
                                class="text-subtitle-2 grey--text text--darken-2 tw-line-clamp-1"
                            >
                                {{ Page.title }}
                            </span>
                        </div>
                    </div>
                </v-col>

                <v-col cols="12" md="6" class="text-right">
                    <page-lock v-model="Page" />

                    <v-btn
                        @click="openHistory"
                        elevation="0"
                        outlined
                        color="grey darken-4"
                        class="control-btns"
                    >
                        <v-icon>mdi-history</v-icon>
                        History
                    </v-btn>

                    <v-btn
                        @click="gotoLiveWebsite"
                        elevation="0"
                        outlined
                        color="grey darken-4"
                        class="control-btns"
                    >
                        <v-icon>mdi-play-circle</v-icon>
                        Preview
                    </v-btn>

                    <v-btn
                        v-if="shouldDeploy && false"
                        @click="saveAndDeploy"
                        elevation="0"
                        color="grey darken-4 white--text"
                        class="control-btns"
                    >
                        Save and Deploy
                    </v-btn>

                    <v-btn
                        v-else
                        :disabled="isLocked && !lockedByMe"
                        @click="savePage"
                        elevation="0"
                        color="grey darken-4 white--text"
                        class="control-btns"
                    >
                        Save Page
                    </v-btn>

                    <v-menu bottom offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon elevation="0" v-on="on" v-bind="attrs">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item>
                                <v-list-item-title>
                                    <button
                                        class="tw-block tw-p-1.5"
                                        @click="saveTemplate"
                                    >
                                        Save as template
                                    </button>
                                </v-list-item-title>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-title>
                                    <button
                                        class="tw-block tw-p-1.5"
                                        @click="saveDraft"
                                    >
                                        Save Draft
                                    </button>
                                </v-list-item-title>
                            </v-list-item>

                            <v-divider></v-divider>

                            <v-list-item>
                                <v-list-item-title>
                                    <button
                                        class="tw-block tw-px-2 tw-py-1.5"
                                        @click="discard"
                                    >
                                        Discard
                                    </button>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </v-card>

        <page-builder
            v-model="blocksList"
            @needDeploy="needDeploy"
            :page="Page"
        />

        <template-selector ref="templateManager" />

        <version-history
            ref="history"
            type="page"
            :value="Page"
            @input="setHistory"
        />

        <pages-page-discard-dialog
            v-model="dialog"
            :pageTitle="Page.title"
            :dialogSave="dialogSave"
            :checkLockAndExit="checkLockAndExit"
        />

        <loading-overlay :show="Api.Page.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { refactorWidgetsHelper } from "@/utils/refactorWidgets";
import { BlockInterface } from "@/interfaces/BlockInterface";
import getLiveWebisteURL from "@/utils/getLiveWebisteURL";
import { Page, Widgets } from "@/repositories";
import { Api, LockPageStore } from "@/store";

@Component
export default class PageBuilderSection extends Vue {
    Api = Api;

    Page: Page = {};
    blocksList: BlockInterface[] = [];

    shouldDeploy: Boolean = false;
    dialog: Boolean = false;

    mounted() {
        this.init();
    }

    async init() {
        await this.fetchPage();
        LockPageStore.setLockedPage(this.Page);
        LockPageStore.start();
    }

    async fetchPage() {
        this.Page = (await Api.Page.get(+this.$route.params.id)) as Page;
        this.blocksList = refactorWidgetsHelper(
            this.Page.draft && this.Page.draft.length
                ? this.Page.draft
                : this.Page.widgets || []
        );
    }

    async dialogSave() {
        this.dialog = false;
        await this.savePage();
        this.checkLockAndExit();
    }

    async checkLockAndExit() {
        this.dialog = false;
        // if (this.lockedByMe) await this.unlock();
        this.goBack();
    }

    discard() {
        this.dialog = true;
    }

    goBack() {
        if ((this.Page as any)?.post?.type == "blog")
            this.$router.push(
                "/posts/edit/" + (this.Page as any)?.post?.id ||
                    "/page/edit/" + this.Page.id
            );
        else if ((this.Page as any)?.post?.type == "news")
            this.$router.push(
                "/news/edit/" + (this.Page as any)?.post?.id ||
                    "/page/edit/" + this.Page.id
            );
        else this.$router.push("/page/edit/" + this.Page.id);
    }

    async savePage() {
        let widgets: Widgets = {
            page_id: +this.$route.params.id,
            widgets: this.blocksList,
        };
        await Api.Page.savePageWidgets(widgets);
    }

    async saveAndDeploy() {
        this.savePage()
            .then(Api.Page.doDeploy)
            .finally(() => {
                this.shouldDeploy = false;
            });
    }

    get liveWebsite() {
        return getLiveWebisteURL() + (this.Page.route || "");
    }

    gotoLiveWebsite() {
        if (this.Page.status_id === 2)
            window.open(
                getLiveWebisteURL() + "/preview/" + this.Page.id,
                "_blank"
            );
        else window.open(this.liveWebsite, "_blank");
    }

    saveTemplate() {
        (this.$refs.templateManager as any).open(true, this.blocksList);
    }

    async saveDraft() {
        await Api.Page.saveDraft({
            page_id: +this.$route.params.id,
            page_draft: this.blocksList,
        });
    }

    needDeploy() {
        this.shouldDeploy = true;
    }

    openHistory() {
        (this.$refs.history as any).open();
    }

    get userId() {
        let profile = JSON.parse(localStorage.getItem("profile")!.toString());
        return profile ? profile.user_id : 0;
    }

    get isLocked() {
        return this.Page.locked_by! > 0;
    }

    get lockedByMe() {
        return this.Page.locked_by! > 0 && this.Page.locked_by === this.userId;
    }

    // async unlock() {
    //     if (this.Page.locked_by == this.userId)
    //         return Api.Page.unlockPage(this.Page.id!).then(() => {
    //             this.Page.locked_by = 0;
    //         });
    // }

    setHistory(history: any[]) {
        this.blocksList = refactorWidgetsHelper(history);
    }
}
</script>
