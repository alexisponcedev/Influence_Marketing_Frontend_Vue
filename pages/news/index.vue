<template>
    <v-container fluid>
        <v-row justify="between">
            <v-col cols="10" class="tw-flex tw-items-center tw-justify-between">
                <v-tabs v-model="tab" background-color="transparent">
                    <v-tab :href="`#`">All Posts</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="2" align-self="center"> </v-col>
        </v-row>

        <v-card>
            <table-standard
                :config="config"
                class="row-pointer"
                :items="blogsList"
                :loading="Api.Post.loading"
                @click:row="(Post) => $router.push('/news/edit/' + Post.id)"
            >
                <template #item.page.title="{ item }">
                    {{ item.page.title }}
                    <v-tooltip bottom v-if="item.page.locked_by > 0">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                small
                                v-on="on"
                                v-bind="attrs"
                                :color="
                                    item.page.locked_by === userId ? 'red' : ''
                                "
                            >
                                mdi-lock
                            </v-icon>
                        </template>
                        <span>
                            Locked by
                            {{ item.page.locked_by_name || "another Admin" }}
                        </span>
                    </v-tooltip>
                </template>
            </table-standard>
        </v-card>

        <v-dialog v-model="showCategoryModal" max-width="500">
            <v-card>
                <v-card-title> Category Manager </v-card-title>
                <v-card-text>
                    <form-field-text
                        :field="categoryNameField"
                        v-model="category.name"
                        @keyup.enter="saveCategory"
                    />

                    <p class="tw-ml-2">
                        Please select a unique name for your category
                    </p>

                    <v-progress-linear
                        v-if="Api.Category.loading"
                        indeterminate
                        color="cyan"
                    />
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        :disabled="Api.Category.loading"
                        @click="saveCategory"
                        text
                        color="green"
                    >
                        Save</v-btn
                    >
                    <v-btn
                        :disabled="Api.Category.loading"
                        @click="showCategoryModal = false"
                        text
                        color="red"
                    >
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <loading-overlay :show="Api.Post.loading || Api.Category.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { PostResource } from "@/repositories";
import { Api, AppStore } from "@/store";

@Component({ layout: "panel" })
export default class AllPosts extends Vue {
    Api = Api;

    tab = "";

    showCategoryModal = false;

    category: any = { id: 0, name: "" };

    categoryNameField = {
        label: "Category Name",
        placeholder: "Enter category name",
        rules: [],
        colAttrs: { cols: 12 },
    };

    config = {
        headers: [
            { text: "Title", value: "page.title" },
            { text: "Route", value: "page.route" },
            { text: "", value: "actions", sortable: false, width: "0" },
        ],
        actions: [
            {
                type: "edit",
                icon: "mdi-pencil",
                to: "/news/edit/[id]",
            },
            {
                type: "delete",
                icon: "mdi-delete",
                onClick: (Post: PostResource) => {
                    AppStore.showDeleteConfirmationModal({
                        deleteItemTitle: Post.title || "",
                        deleteItem: Post,
                        agreeButton: { callback: this.deletePost },
                    });
                },
            },
        ],
        globalActions: [
            {
                text: "Add Post",
                class: "btn",
                color: "primary",
                icon: "mdi-plus",
                to: "/news/add",
            },
        ],
    };

    async mounted() {
        this.updatePosts();
        this.getCategories();
    }

    async updatePosts() {
        await Api.Post.getAllNews();
    }

    async getCategories() {
        await Api.Category.getAll("news");
    }

    get blogsList() {
        let tab = this.tab.replace("#", "");
        return Api.Post.allNews.filter(
            (post: PostResource) =>
                tab === "" || post.category_id?.toString() === tab
        );
    }

    openCategoryModal(category = null) {
        this.category = category
            ? JSON.parse(JSON.stringify(category))
            : { id: 0, name: "" };
        this.showCategoryModal = true;
    }

    saveCategory() {
        if (this.category && this.category.id > 0)
            Api.Category.update({
                id: +this.category.id!,
                category: this.category,
            });
        else Api.Category.create(this.category);
        this.showCategoryModal = false;
    }

    deletePost(Post: PostResource) {
        Api.Post.delete(Post.id!)
            .then(this.updatePosts)
            .then(Api.Page.doDeploy);
    }

    confirmDeleteCategory(category: any) {
        AppStore.showDeleteConfirmationModal({
            deleteItemTitle: category.name || "",
            deleteItem: category,
            agreeButton: { callback: this.deleteCategory },
        });
    }

    deleteCategory(category: any) {
        Api.Category.delete(category.id);
    }

    get userId() {
        let profile = JSON.parse(localStorage.getItem("profile")!.toString());
        return profile ? profile.user_id : 0;
    }
}
</script>
