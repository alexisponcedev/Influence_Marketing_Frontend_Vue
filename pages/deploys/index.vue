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
                        :items="items"
                        :config="config"
                        class="row-pointer"
                        @startDeploy="startDeploy"
                        @click:row="showOutputLogs"
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

    selectedDeployOutput: String = "";

    items: Array<any> = [
        {
            id: 71,
            server_id: 196,
            site_id: 110,
            type: 4,
            commit_hash: "1aa50f0e4c49fed3a2335e866b03d4178ab93c4e",
            commit_author: "Dries Vints",
            commit_message:
                "Merge branch '8.x'\n\n# Conflicts:\n#\tCHANGELOG.md",
            started_at: "2020-11-05 12:56:05",
            ended_at: "2020-11-05 12:56:11",
            status: "failed",
            displayable_type: "Deployment API",
        },
    ];

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

    getHistories() {
        console.log("getHistories");
    }

    showOutputLogs(deploy: any) {
        this.selectedDeployOutput =
            "Thu 05 Nov 2020 12:42:30 PM UTC\nFrom github.com:laravel\/laravel\n * branch              master     -> FETCH_HEAD\nAlready up to date.\nInstalling dependencies from lock file (including require-dev)\nVerifying lock file contents can be installed on current platform.\nNothing to install, update or remove\nGenerating optimized autoload files\n> Illuminate\\Foundation\\ComposerScripts::postAutoloadDump\n> @php artisan package:discover --ansi\nDiscovered Package: [32mfideloper\/proxy[39m\nDiscovered Package: [32mfruitcake\/laravel-cors[39m\nDiscovered Package: [32mlaravel\/tinker[39m\nDiscovered Package: [32mnesbot\/carbon[39m\nDiscovered Package: [32mnunomaduro\/collision[39m\n[32mPackage manifest generated successfully.[39m\n73 packages you are using are looking for funding.\nUse the `composer fund` command to find out more!\nRestarting FPM...\n\n   Illuminate\\Database\\QueryException \n\n  SQLSTATE[HY000] [1049] Unknown database 'laravel' (SQL: select * from information_schema.tables where table_schema = laravel and table_name = migrations and table_type = 'BASE TABLE')\n\n  at vendor\/laravel\/framework\/src\/Illuminate\/Database\/Connection.php:671\n    667▕         \/\/ If an exception occurs when attempting to run a query, we'll format the error\n    668▕         \/\/ message to include the bindings with SQL, which will make this exception a\n    669▕         \/\/ lot more helpful to the developer instead of just the database's errors.\n    670▕         catch (Exception $e) {\n  ➜ 671▕             throw new QueryException(\n    672▕                 $query, $this->prepareBindings($bindings), $e\n    673▕             );\n    674▕         }\n    675▕\n\n      [2m+33 vendor frames [22m\n  34  artisan:37\n      Illuminate\\Foundation\\Console\\Kernel::handle()\n";
        this.deployOutputModalShow = true;
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
