<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-tabs v-model="tab" background-color="transparent">
                    <v-tab href="#general"> General </v-tab>
                    <v-tab href="#dam"> DAM </v-tab>
                    <!-- <v-tab href="#logs"> Logs </v-tab> -->
                </v-tabs>
            </v-col>
        </v-row>

        <v-tabs-items v-model="tab" background-color="transparent">
            <v-tab-item value="general">
                <v-card-text>
                    <div
                        v-for="setting in generalSettings"
                        class="tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between"
                    >
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <span class="tw-whitespace-normal">
                                {{ setting.title }}
                            </span>
                        </div>
                        <input
                            type="text"
                            class="x-input"
                            placeholder="please enter the value"
                            v-model="setting.value"
                        />
                    </div>
                </v-card-text>
            </v-tab-item>

            <v-tab-item value="dam">
                <v-card-text>
                    <div
                        v-for="setting in damSettings"
                        class="tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between"
                    >
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <span class="tw-whitespace-normal">
                                {{ setting.title }}
                            </span>
                        </div>
                        <input
                            type="text"
                            class="x-input"
                            placeholder="please enter the value"
                            v-model="setting.value"
                        />
                    </div>
                </v-card-text>
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

    get generalSettings() {
        return [
            this.compareRoute,
            this.siteName,
            this.deployUrl,
            this.prodDeployUrl,
            this.serverId,
            this.siteId,
        ];
    }

    get damSettings() {
        return [
            this.DAM_ImagesToken,
            this.DAM_VideosToken,
            this.DAM_FilesToken,
        ];
    }

    get compareRoute() {
        let item = this.settings.find((k: any) => k.key === "compareRoute");
        if (item) item.title = "Compare Route";
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
        if (item) item.title = "Site Name";
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
        if (item) item.title = "Public Site Forge Deploy URL";
        return !item
            ? this.settings[
                  this.settings.push({
                      title: "Public Site Forge Deploy URL",
                      key: "deploy_url",
                      value: "",
                      brand_id: getActiveBrand(),
                  }) - 1
              ]
            : item;
    }

    get prodDeployUrl() {
        let item = this.settings.find((k: any) => k.key === "prod_deploy_url");
        if (item) item.title = "Prod Public Site Forge Deploy URL";
        return !item
            ? this.settings[
                  this.settings.push({
                      title: "Prod Public Site Forge Deploy URL",
                      key: "prod_deploy_url",
                      value: "",
                      brand_id: getActiveBrand(),
                  }) - 1
              ]
            : item;
    }

    get serverId() {
        let item = this.settings.find((k: any) => k.key === "public_server_id");
        if (item) item.title = "Public Site Forge Server Id";
        return !item
            ? this.settings[
                  this.settings.push({
                      title: "Public Site Forge Server Id",
                      key: "public_server_id",
                      value: "",
                      brand_id: getActiveBrand(),
                  }) - 1
              ]
            : item;
    }

    get siteId() {
        let item = this.settings.find((k: any) => k.key === "public_site_id");
        if (item) item.title = "Public Site Forge Site Id";
        return !item
            ? this.settings[
                  this.settings.push({
                      title: "Public Site Forge Site Id",
                      key: "public_site_id",
                      value: "",
                      brand_id: getActiveBrand(),
                  }) - 1
              ]
            : item;
    }

    get DAM_ImagesToken() {
        let item = this.settings.find((k: any) => k.key === "dam_images_token");
        if (item) item.title = "Images Token";
        return !item
            ? this.settings[
                  this.settings.push({
                      title: "Images Token",
                      key: "dam_images_token",
                      value: "",
                      brand_id: getActiveBrand(),
                  }) - 1
              ]
            : item;
    }

    get DAM_VideosToken() {
        let item = this.settings.find((k: any) => k.key === "dam_videos_token");
        if (item) item.title = "Videos Token";
        return !item
            ? this.settings[
                  this.settings.push({
                      title: "Videos Token",
                      key: "dam_videos_token",
                      value: "",
                      brand_id: getActiveBrand(),
                  }) - 1
              ]
            : item;
    }

    get DAM_FilesToken() {
        let item = this.settings.find((k: any) => k.key === "dam_files_token");
        if (item) item.title = "Files Token";
        return !item
            ? this.settings[
                  this.settings.push({
                      title: "Files Token",
                      key: "dam_files_token",
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
