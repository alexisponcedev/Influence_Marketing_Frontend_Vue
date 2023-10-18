<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-tabs background-color="transparent">
                    <v-tab>Publish Changes</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card elevation="0" color="#F2F3F8">
                    <v-card-text>
                        <div class="tw-w-full tw-grid tw-grid-cols-2 tw-gap-2">
                            <pages-deploy-card-select
                                v-for="(deployItem, index) in deploy"
                                :label="deployItem.title"
                                :table="deployItem.table"
                                :key="index"
                                v-model="tables"
                            />

                            <div
                                class="tw-col-span-2 tw-justify-end tw-grid tw-py-4"
                            >
                                <v-btn
                                    color="#000"
                                    dark
                                    elevation="0"
                                    x-large
                                    @click="startDeploy"
                                    :loading="loading"
                                    class="tw-px-28 tw-rounded-[10px] tw-py-8"
                                >
                                    Publish
                                </v-btn>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-tabs background-color="transparent">
                    <v-tab> Deployment History </v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <table-standard
                        :config="config"
                        class="row-pointer"
                        :items="deployHistories"
                        @click:row="showOutputLogs"
                        :loading="Api.Forge.loading"
                    />
                </v-card>
            </v-col>
        </v-row>
        <deploy-output-modal
            :show.sync="deployOutputModalShow"
            :output="selectedDeployOutput"
        />
        <loading-overlay :show="Api.Page.loading || loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { capitalizeFirstLetter } from "@/utils/format/string";
import formatDate from "@/utils/format/date";
import { deploy } from "@/data/deploy";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class Deploys extends Vue {
    Api = Api;
    deploy = deploy;

    tables = [];
    loading: boolean = false;
    deployHistories: Array<any> = [];
    selectedDeployOutput: string = "";
    deployOutputModalShow: boolean = false;

    config = {
        headers: [
            {
                text: "Start Time",
                value: "started_at",
                valueFunc: (item: any) =>
                    formatDate(item.started_at, "YYYY/MM/DD HH:mm:ss"),
            },
            {
                text: "End Time",
                value: "ended_at",
                valueFunc: (item: any) =>
                    formatDate(item.ended_at, "YYYY/MM/DD HH:mm:ss"),
            },
            {
                text: "Status",
                value: "status",
                valueFunc: (item: any) => capitalizeFirstLetter(item.status),
            },
            {
                text: "Type",
                value: "displayable_type",
            },
            { text: "", value: "actions", sortable: false, width: "0" },
        ],
        actions: [
            {
                type: "show",
                icon: "mdi-eye",
                onClick: this.showOutputLogs,
            },
        ],
    };

    mounted() {
        this.getLogs();
    }

    async getLogs() {
        this.deployHistories = await Api.Forge.publicSiteDeployHistories();
    }

    async showOutputLogs(deploy: any) {
        this.deployOutputModalShow = true;
        this.selectedDeployOutput =
            (await Api.Forge.publicSiteDeployOutput(deploy.id)) || "";
    }

    async startDeploy() {
        this.loading = true;
        console.log(this.tables);
        await Api.Page.deployStageDbToProd(this.tables.join(","));
        setTimeout(() => {
            this.loading = false;
            this.getLogs();
        }, 1000);
    }
}
</script>
