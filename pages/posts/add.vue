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
              <form-field-text :field="formFields[0]" v-model="Post.title" @input="postTitleChanged"/>

              <form-field-select-page-route :field="formFields[1]" v-model="Post.route" :pageId="Post.id"/>

              <form-field-tags :field="formFields[2]" v-model="Post.tags"/>

            </v-card-text>
          </v-card>
          <button
            class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
            @click.prevent="submit">Save
          </button>
        </v-tab-item>

        <v-tab-item value="Metas">
          <form-field-meta :field="formFields[2]" v-model="Post"/>
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
import {Post} from "@/repositories";
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

  UrlTypeEnum = UrlTypeEnum;

  Api = Api;

  tab = "";

  route: string = '';

  meta: Array<{ rel: string, name: string, content: string }> = [];

  Post: Post = {
    id: 0,
    title: '',
    route: '',
    tags: [],
    meta: [],
    widgets: [],
  };

  livePreviewUrl = '';

  locations: Array<{ title: string; to: string }> = [];

  formFields: Array<FormField> = [];

  mounted() {
    this.init();

    Api.Setting.getValue(SettingEnum.livePreview).then(value => {
      this.livePreviewUrl = value ? value : '';
    })
  }

  async init() {
    await this.initPostsTab();
    this.updateLocations();
    this.initMetaTags();
  }

  initMetaTags() {
    if (this.Post.meta?.length === 0) {
      this.Post.meta = [
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
        to: "/posts",
      },
      {
        title: this.Post.title || "",
        to: "/posts/edit/" + this.Post.id!,
      },
    ];
  }

  async initPostsTab() {
    await this.getEntity();
    this.updatePostFormFields();
  }

  async getEntity() {
    if (this.editMode) {
      this.Post = (await Api.Post.get(+this.$route.params.id)) as Post;
    }
  }

  updatePostFormFields() {
    this.formFields = [
      {
        type: "form-field-text",
        label: "Title",
        modelKey: "title",
        placeholder: 'please enter post title',
        rules: [Validation.required],
        colAttrs: {cols: 12},
      },
      {
        type: "form-field-select-page-route",
        label: "Post URL",
        modelKey: "route",
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
        modelKey: "meta",
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
        });
      else {
        await Api.Post.create(this.Post).then(post => {
          this.$router.push("/posts/edit/" + post.id);
        }).catch(err => {
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
    return this.livePreviewUrl + this.Post.route
  }

  openPostBuilder() {
    this.$router.push(`/posts/edit/${this.Post.id}/PostBuilder`);
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
    if (this.Post.route && this.Post.route !== '') {
      let lastIndexOf = this.Post.route!.lastIndexOf('/') + 1;
      parentRoute = this.Post.route!.substring(0, lastIndexOf === 0 ? lastIndexOf + 1 : lastIndexOf);
    }
    this.Post.route = parentRoute + this.Post.title
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
