<template>
    <v-container fluid style="background-color: #F2F3F8;height: 100vh">

        <v-card color="#FCFCFC" elevation="0" class="mb-4 px-7 page-builder-header">
            <v-row align="center">

                <v-col cols="12" md="5">
                    <div class="tw-flex tw-space-x-2 tw-items-center">
                        <button @click="discard">
                            <v-icon color="black" large>mdi-close</v-icon>
                        </button>
                        <div>
                            <h1 class="text-h6 font-weight-bold mb-1">Post builder</h1>
                            <span class="text-subtitle-2 grey--text text--darken-2">{{ Post.title }}</span>
                        </div>
                    </div>

                </v-col>
                <v-col cols="12" md="7" class="text-right">
                    <v-btn @click="gotoLiveWebsite" elevation="0" outlined color="grey darken-4" class="control-btns">
                        <v-icon>mdi-play-circle</v-icon>
                        Preview
                    </v-btn>

                    <v-btn @click="savePost" elevation="0" color="grey darken-4 white--text" class="control-btns">
                        Save Post
                    </v-btn>

                    <v-menu bottom :offset-x="-10" :offset-y="12">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon elevation="0" v-on="on" v-bind="attrs">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <!--              <v-list-item>-->
                            <!--                <v-list-item-title>-->
                            <!--                  <button class="tw-block tw-p-1.5" @click="saveTemplate">Save as template</button>-->
                            <!--                </v-list-item-title>-->
                            <!--              </v-list-item>-->

                            <!--              <v-divider></v-divider>-->

                            <v-list-item>
                                <v-list-item-title>
                                    <button class="tw-block tw-px-2 tw-py-1.5" @click="discard">Discard</button>
                                </v-list-item-title>
                            </v-list-item>


                        </v-list>
                    </v-menu>

                </v-col>
            </v-row>
        </v-card>

        <page-builder v-model="blocksList" blocks-type="blog"/>

        <template-selector ref="templateManager"/>

        <loading-overlay :show="Api.Post.loading"/>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {Api} from "@/store";
import {Post, Widgets} from "~/repositories";
import {BlockInterface} from "~/interfaces/BlockInterface";
import {SettingEnum} from "~/interfaces/SettingEnum";

@Component
export default class PostBuilderSection extends Vue {
    Api = Api;

    tab = "";

    blocksList: BlockInterface[] = [];

    Post: Post = {};

    async mounted() {
        this.Post = (await Api.Post.get(+this.$route.params.id)) as Post;
        this.blocksList = this.Post.widgets as Array<BlockInterface>;
    }

    discard() {
        this.$router.push('/posts/edit/' + this.Post.id);
    }

    async savePost() {
        await Api.Post.update({id: +this.Post.id!, Post: this.Post});
    }

    get liveWebsite() {
        return process.env.LIVE_WEBSITE + (this.Post.route || '')
    }

    gotoLiveWebsite() {
        window.open(this.liveWebsite, '_blank');
    }
}
</script>
