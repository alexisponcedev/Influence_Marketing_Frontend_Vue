<template>
    <v-container fluid>


        <v-row>
            <v-col>
                <v-tabs v-model="tab" background-color="transparent">
                    <v-tab href="#general">General</v-tab>
                    <v-tab href="#dam">DAM</v-tab>
                    <v-tab href="#logs">Logs</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-tabs-items v-model="tab" background-color="transparent">

            <v-tab-item value="general">

                <div class="tw-space-y-2 tw-bg-gray-100">

                    <div class="tw-bg-gray-50 tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between">
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <span class="tw-whitespace-normal">Compare Route</span>
                        </div>
                        <input type="text" class="x-input" placeholder="please enter the value"/>
                    </div>

                    <div class="tw-bg-gray-50 tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between">
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <span class="tw-whitespace-normal">Google Tag Domain</span>
                        </div>
                        <input type="text" class="x-input" placeholder="please enter the value"/>
                    </div>

                    <div class="tw-bg-gray-50 tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between">
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <span class="tw-whitespace-normal">Google Tag Code</span>
                        </div>
                        <input type="text" class="x-input" placeholder="please enter the value"/>
                    </div>

                </div>
            </v-tab-item>

            <v-tab-item value="dam">
                <div class="tw-bg-gray-100">
                    Dam Section will be here
                </div>
            </v-tab-item>

            <v-tab-item value="logs" background-color="tw-bg-gray-100">
                <div class="tw-space-y-2 tw-bg-gray-100">
                    <div class="tw-bg-gray-50 tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between">
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <v-switch :value="true"/>
                            <span>Pages</span>
                        </div>
                    </div>
                    <div class="tw-bg-gray-50 tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between">
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <v-switch :value="true"/>
                            <span>Blog Posts</span>
                        </div>
                    </div>
                    <div class="tw-bg-gray-50 tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between">
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <v-switch :value="true"/>
                            <span>Products</span>
                        </div>
                    </div>
                    <div class="tw-bg-gray-50 tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between">
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <v-switch :value="true"/>
                            <span>Menu</span>
                        </div>
                    </div>
                    <div class="tw-bg-gray-50 tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-between">
                        <div class="tw-flex tw-space-x-2 tw-items-center">
                            <v-switch :value="true"/>
                            <span>Templates</span>
                        </div>
                    </div>
                </div>

            </v-tab-item>

        </v-tabs-items>

    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {SettingResource} from "@/repositories";
import {Api, AppStore} from "@/store";

@Component({layout: "panel"})
export default class AllSettings extends Vue {
    Api = Api;

    tab = '';

    config = {
        headers: [
            {text: "Title", value: "title"},
            {text: "Key", value: "key"},
            {text: "Value", value: "value"},
            {text: "", value: "actions", sortable: false, width: "0"},
        ],
        actions: [
            {
                type: "edit",
                icon: "mdi-pencil",
                to: "/settings/edit/[id]",
            },
            {
                type: "delete",
                icon: "mdi-delete",
                onClick: (Setting: SettingResource) => {
                    AppStore.showDeleteConfirmationModal({
                        deleteItemTitle: Setting.title || "",
                        deleteItem: Setting,
                        agreeButton: {callback: this.deleteSetting},
                    });
                },
            },
        ],
        globalActions: [
            {
                text: "Add Setting",
                class: 'btn',
                color: "primary",
                icon: "mdi-plus",
                to: "/settings/add",
            },
        ],
    };

    mounted() {
        this.updateSettings();
    }

    async updateSettings() {
        await Api.Setting.getAll();
    }

    deleteSetting(Setting: SettingResource) {
        Api.Setting.delete(Setting.id!).then(this.updateSettings);
    }

    // get logPagesIndex() {
    //     return Api.Setting.all.findIndex(i => i.key === 'log-pages')
    // }
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
