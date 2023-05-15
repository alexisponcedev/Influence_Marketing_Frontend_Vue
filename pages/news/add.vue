<template>
    <v-container fluid>

        <div v-if="editMode" class="d-flex justify-space-between align-center">
            <breadcrumbs :locations="locations"/>
            <div class="tw-flex tw-items-center tw-space-x-2">
                <v-btn elevation="0" outlined class="btn" @click="gotoLiveWebsite">
                    Live Website
                </v-btn>
                <v-btn elevation="0" color="grey darken-4 white--text" class="btn" @click="goToPostBuilder">
                    Go to Post Builder
                </v-btn>
            </div>
        </div>

        <v-row>
            <v-col>
                <v-tabs show-arrows v-model="tab" background-color="transparent">
                    <v-tab href="#Details">Post Details</v-tab>
                    <v-tab href="#Metas">Post Metas</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-form ref="form" @submit.prevent="submit">
            <v-tabs-items v-model="tab" style="background-color: transparent !important;">
                <v-tab-item value="Details">
                    <v-card>
                        <v-card-text>
                            <v-row>
                                <form-field-text :field="formFields[0]" v-model="Post.page.title"
                                                 @input="postTitleChanged"/>
<!--                                <form-field-select-autocomplete :field="formFields[1]" v-model="Post.category_id"/>-->
                            </v-row>
                            <v-row>
                                <form-field-select-page-route :field="formFields[2]" v-model="Post.page.route"
                                                              :pageId="Post.page.id"/>
                            </v-row>
                            <v-row>
                                <form-field-tags :field="formFields[3]" v-model="Post.tags"/>
                            </v-row>

                        </v-card-text>
                    </v-card>
                    <button class="tw-my-3 tw-w-full tw-py-3 tw-bg-white
                        tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
                            @click.prevent="submit">Save
                    </button>
                </v-tab-item>

                <v-tab-item value="Metas">
                    <form-field-meta :field="formFields[4]" v-model="Post.page"/>
                    <button
                        class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
                        @click.prevent="submit">Save
                    </button>
                </v-tab-item>

            </v-tabs-items>
        </v-form>

        <loading-overlay :show="Api.Post.loading"/>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import Validation from "@/utils/validation";
import {PageResource, Post} from "@/repositories";
import {FormField} from "@/models";
import {Api} from "@/store";
import HoverButton from "~/components/base/HoverButton.vue";
import {UrlTypeEnum} from "~/interfaces/UrlTypeEnum";
import {SettingEnum} from "~/interfaces/SettingEnum";

@Component({
    components: {HoverButton},
    layout: "panel"
})
export default class PostForm extends Vue {
    @Prop(Boolean) readonly editMode!: Boolean;

    Api = Api;

    tab = "";

    route: string = '';

    meta: Array<{ rel: string, name: string, content: string }> = [];
    oldRoute = '';

    Post: any = {
        id: 0,
        category_id: 0,
        tags: [],
        type : 'news',
        page: {
            title: '',
            route: '',
            meta: [],
            widgets: [],
            draft: [],
            model_type: 'post',
            model_id: 0,
            status_id: 1
        },
        status: 0,
    };

    locations: Array<{ title: string; to: string }> = [];

    formFields: Array<FormField> = [];

    mounted() {
        this.init();
    }

    async init() {
        await this.initCategories();
        await this.initPostsTab();
        this.updateLocations();
        this.initMetaTags();
    }

    async initCategories() {
        await Api.Category.getAll();
    }

    initMetaTags() {
        if (this.Post.page!.meta?.length === 0) {
            this.Post.page!.meta = [
                {rel: 'blank', name: 'title', content: ''},
                {rel: 'blank', name: 'description', content: 'Hisense USA'},

                {rel: 'property="og:site_name"', name: 'property="og:site_name"', content: 'Hisense USA'},
                {rel: 'property="og:title"', name: 'property="og:title"', content: ''},
                {rel: 'property="og:description"', name: 'property="og:description"', content: 'Hisense USA'},
                {rel: 'property="og:image"', name: 'property="og:image"', content: ''},
                {rel: 'property="og:url"', name: 'property="og:url"', content: ''},
                {rel: 'property="og:type"', name: 'property="og:type"', content: 'website'},
                {rel: 'property="og:locale"', name: 'property="og:locale"', content: 'en_US'},
            ];
        }
    }

    updateLocations() {
        this.locations = [
            {
                title: "Posts",
                to: "/news",
            },
            {
                title: this.Post.page!.title || "",
                to: "/news/edit/" + this.Post.id!,
            },
        ];
    }

    async initPostsTab() {
        await this.getEntity();
        this.updatePostFormFields();
    }

    async getEntity() {
        if (this.editMode) {
            let Post = (await Api.Post.get(+this.$route.params.id)) as any;
            Post.page = (await Api.Page.getPageByModelTypeModelId({
                model_type: 'post',
                model_id: +this.$route.params.id
            })) as PageResource;
            this.oldRoute = Post.page?.route!;
            this.Post = Post;
        }
    }

    updatePostFormFields() {
        this.formFields = [
            {
                type: "form-field-text",
                label: "Title",
                modelKey: "page.title",
                placeholder: 'please enter post title',
                rules: [Validation.required],
                colAttrs: {cols: 12},
            },
            {
                type: "form-field-select-autocomplete",
                label: "Category",
                modelKey: "category_id",
                placeholder: 'please select category',
                'item-text': 'name',
                'item-value': 'id',
                items: Api.Category.all,
                rules: [Validation.required],
                colAttrs: {cols: 3},
            },
            {
                type: "form-field-select-page-route",
                label: "Post URL",
                modelKey: "page.route",
                rules: [],
                colAttrs: {cols: 12},
            },
            {
                type: "form-field-tags",
                label: "Tags",
                modelKey: "tag",
                rules: [],
                colAttrs: {cols: 12},
            },
            {
                type: "form-field-meta",
                label: "Meta",
                modelKey: "page.meta",
                rules: [],
                colAttrs: {cols: 12},
            },
        ];
    }

    async submit() {
        if (this.formValidate()) {
            if (this.editMode)
                await Api.Post.update({
                    id: +this.Post.id!,
                    Post: this.Post,
                }).then(() => {
                    Api.Page.get(this.Post.page!.id)
                        .then(() => {
                            Api.Page.update({Page: this.Post.page!, id: +this.Post.page!.id!})
                                .then(page => {
                                    if (this.Post.page?.route !== this.oldRoute)
                                        Api.Page.doDeploy();
                                })
                        })

                });
            else {
                await Api.Post.create(this.Post)
                    .then((post: any) => {
                        this.Post.page!.model_id = post.id;
                        this.Post.page!.model_type = 'post';
                        Api.Page.create(this.Post.page!)
                            .then(Api.Page.doDeploy);
                        return post;
                    })
                    .then((post: any) => {
                        if (post.hasOwnProperty('id') && post.id > 0)
                            this.$router.push("/news/edit/" + post.id);
                    })
            }
        }
    }

    formValidate() {
        return (this.$refs.form as any).validate();
    }

    gotoLiveWebsite() {
        window.open(this.liveWebsite, '_blank');
    }

    goToPostBuilder() {
        this.openPostBuilder();
    }

    get liveWebsite() {
        return process.env.LIVE_WEBSITE + (this.Post.page!.route || '')
    }

    openPostBuilder() {
        this.$router.push(`/page/edit/${this.Post.page!.id}/page-builder`);
    }

    @Watch("tab")
    tabChanged(newTab: string, _: string) {
        switch (newTab) {
            case "Details":
                this.updatePostFormFields();
                break;
            default:
                break;
        }
    }

    postTitleChanged() {
        let parentRoute = '/';
        if (this.Post.page!.route && this.Post.page!.route !== '') {
            let lastIndexOf = this.Post.page!.route!.lastIndexOf('/') + 1;
            parentRoute = this.Post.page!.route!.substring(0, lastIndexOf === 0 ? lastIndexOf + 1 : lastIndexOf);
        }
        this.Post.page!.route = parentRoute + this.Post.page!.title
    }
}
</script>

<style scoped>
a[role='anchor'] {
    color: #002bff;
    width: 100%;
    text-align: center;
    display: block;
    padding: 2px 0 8px;
}
</style>
