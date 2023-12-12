<template>
    <v-container fluid>
        <v-card>
            <div class="tw-p-2 tw-space-y-2">
                <v-menu v-if="Api.Auth.languages.length" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-card
                            v-on="on"
                            v-bind="attrs"
                            elevation="0"
                            class="tw-block tw-h-20 tw-bg-gray-50 tw-text-center tw-py-5 tw-rounded-xl tw-flex tw-items-center tw-justify-center hover:tw-bg-gray-100 tw-border tw-border-dashed tw-border-gray-200"
                        >
                            Edit Footer Menu
                        </v-card>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="language in Api.Auth.languages"
                            :to="
                                getActiveBrandName().includes('hisense')
                                    ? '/menu/header-menu?lang=' + language.slug
                                    : '/menu/header?lang=' + language.slug
                            "
                        >
                            <v-list-item-title>
                                {{ language.title }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <nuxt-link
                    v-else
                    :to="
                        getActiveBrandName().includes('hisense')
                            ? '/menu/header-menu'
                            : '/menu/header'
                    "
                    class="tw-block tw-h-20 tw-bg-gray-50 tw-text-center tw-py-5 tw-rounded-xl tw-flex tw-items-center tw-justify-center hover:tw-bg-gray-100 tw-border tw-border-dashed tw-border-gray-200"
                >
                    Edit Header Menu
                </nuxt-link>

                <div
                    class="tw-text-center tw-border tw-border-dashed tw-border-gray-200 tw-rounded-xl tw-py-32"
                >
                    Page Content Is Here
                </div>

                <v-menu v-if="Api.Auth.languages.length" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-card
                            v-on="on"
                            v-bind="attrs"
                            elevation="0"
                            class="tw-block tw-h-20 tw-bg-gray-50 tw-text-center tw-py-20 tw-rounded-xl tw-flex tw-items-center tw-justify-center hover:tw-bg-gray-100 tw-border tw-border-dashed tw-border-gray-200"
                        >
                            Edit Footer Menu
                        </v-card>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="language in Api.Auth.languages"
                            :to="
                                getActiveBrandName().includes('hisense')
                                    ? '/menu/footer-menu?lang=' + language.slug
                                    : '/menu/footer?lang=' + language.slug
                            "
                        >
                            <v-list-item-title>
                                {{ language.title }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <nuxt-link
                    v-else
                    :to="
                        getActiveBrandName().includes('hisense')
                            ? '/menu/footer-menu'
                            : '/menu/footer'
                    "
                    class="tw-block tw-h-20 tw-bg-gray-50 tw-text-center tw-py-20 tw-rounded-xl tw-flex tw-items-center tw-justify-center hover:tw-bg-gray-100 tw-border tw-border-dashed tw-border-gray-200"
                >
                    Edit Footer Menu
                </nuxt-link>
            </div>
        </v-card>
        <loading-overlay :show="Api.Auth.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import getActiveBrandName from "@/utils/getActiveBrandName";
import { Api } from "@/store";

@Component({
    layout: "panel",
})
export default class Menus extends Vue {
    getActiveBrandName = getActiveBrandName;
    Api = Api;

    mounted() {
        this.getLanguages();
    }

    async getLanguages() {
        if (!Api.Auth.languages.length) await Api.Auth.getBrandLanguages();
        this.$forceUpdate();
    }
}
</script>
