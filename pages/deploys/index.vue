<template>
    <v-container fluid>
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
                        @startDeploy="startDeploy"
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
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class Deploys extends Vue {
    Api = Api;

    loading: boolean = false;
    deployOutputModalShow: boolean = false;

    selectedDeployOutput: string = "";

    deployHistories: Array<any> = [];

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
        globalActions: [
            {
                text: "Deploy Now",
                class: "btn",
                color: "primary",
                icon: "mdi-cloud-upload-outline",
                action: "startDeploy",
            },
        ],
    };

    mounted() {
        this.getHistories();
    }

    async getHistories() {
        this.deployHistories = await Api.Forge.publicSiteDeployHistories();
    }

    async showOutputLogs(deploy: any) {
        this.deployOutputModalShow = true;
        this.selectedDeployOutput =
            (await Api.Forge.publicSiteDeployOutput(deploy.id)) || "";
    }

    async startDeploy() {
        this.loading = true;
        await Api.Page.deployStageDbToProd();
        setTimeout(() => {
            this.loading = false;
            this.getHistories();
        }, 1000);
    }
}
</script>
