<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" background-color="transparent">
                    <v-tab href="#general"> General </v-tab>
                    <v-tab href="#dam"> DAM </v-tab>
                    <v-tab href="#logs"> Logs </v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-tabs-items v-model="tab" background-color="transparent">
            <v-tab-item value="general">
                <v-card-text>
                    <div
                        class="tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between"
                    >
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <span class="tw-whitespace-normal">
                                {{ compareRoute.title }}
                            </span>
                        </div>
                        <input
                            type="text"
                            class="x-input"
                            placeholder="please enter the value"
                            v-model="compareRoute.value"
                        />
                    </div>

                    <div
                        class="tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between"
                    >
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <span class="tw-whitespace-normal">
                                {{ siteName.title }}
                            </span>
                        </div>
                        <input
                            type="text"
                            class="x-input"
                            placeholder="please enter the value"
                            v-model="siteName.value"
                        />
                    </div>

                    <div
                        class="tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between"
                    >
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <span class="tw-whitespace-normal">
                                {{ deployUrl.title }}
                            </span>
                        </div>
                        <input
                            type="text"
                            class="x-input"
                            placeholder="please enter the value"
                            v-model="deployUrl.value"
                        />
                    </div>

                    <div
                        class="tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between"
                    >
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <span class="tw-whitespace-normal">
                                {{ prodDeployUrl.title }}
                            </span>
                        </div>
                        <input
                            type="text"
                            class="x-input"
                            placeholder="please enter the value"
                            v-model="prodDeployUrl.value"
                        />
                    </div>
                </v-card-text>
            </v-tab-item>

            <v-tab-item value="dam">
                <v-card-text> Dam Section will be here </v-card-text>
            </v-tab-item>

            <v-tab-item value="logs" background-color="tw-bg-gray-100">
                <v-card-text>
                    <div
                        class="tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between"
                    >
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <v-switch :value="true" />
                            <span> Pages </span>
                        </div>
                    </div>

                    <div
                        class="tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between"
                    >
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <v-switch :value="true" />
                            <span> Blog Posts </span>
                        </div>
                    </div>

                    <div
                        class="tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between"
                    >
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <v-switch :value="true" />
                            <span> Products </span>
                        </div>
                    </div>

                    <div
                        class="tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between"
                    >
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <v-switch :value="true" />
                            <span> Menu </span>
                        </div>
                    </div>

                    <div
                        class="tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between"
                    >
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <v-switch :value="true" />
                            <span> Templates </span>
                        </div>
                    </div>
                </v-card-text>
            </v-tab-item>
        </v-tabs-items>

        <button
            class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
            @click.prevent="submitSettings"
        >
            Save Settings
        </button>

        <loading-overlay :show="Api.Setting.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import getActiveBrand from "@/utils/getActiveBrand";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class AllSettings extends Vue {
    Api = Api;

    tab = "";

    settings: any[] = [];

    mounted() {
        this.getSettings();
    }

    async getSettings() {
        this.settings = (await Api.Setting.getAll()) as any[];
    }

    async submitSettings() {
        await Api.Setting.addSetting(this.settings);
    }

    get compareRoute() {
        let item = this.settings.find((k: any) => k.key === "compareRoute");
        return !item
            ? this.settings[
                  this.settings.push({
                      title: "Compare Route",
                      key: "compareRoute",
                      value: "/compare",
                      brand_id: getActiveBrand(),
                  }) - 1
              ]
            : item;
    }

    get siteName() {
        let item = this.settings.find((k: any) => k.key === "siteName");
        return !item
            ? this.settings[
                  this.settings.push({
                      title: "Site Name",
                      key: "siteName",
                      value: "",
                      brand_id: getActiveBrand(),
                  }) - 1
              ]
            : item;
    }

    get deployUrl() {
        let item = this.settings.find((k: any) => k.key === "deploy_url");
        return !item
            ? this.settings[
                  this.settings.push({
                      title: "Public Site Deploy URL",
                      key: "deploy_url",
                      value: "",
                      brand_id: getActiveBrand(),
                  }) - 1
              ]
            : item;
    }

    get prodDeployUrl() {
        let item = this.settings.find((k: any) => k.key === "prod_deploy_url");
        return !item
            ? this.settings[
                  this.settings.push({
                      title: "Prod Public Site Deploy URL",
                      key: "prod_deploy_url",
                      value: "",
                      brand_id: getActiveBrand(),
                  }) - 1
              ]
            : item;
    }
}
</script>

<style scoped>
.x-input {
    border: 1px solid #cdcdcd;
    border-radius: 3px;
    padding: 10px 16px;
    width: 100%;
    max-width: 792px;
    background: white;
}
</style>
