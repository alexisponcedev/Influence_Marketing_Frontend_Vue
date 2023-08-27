<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-tabs background-color="transparent">
                    <v-tab>All Logs</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-row class="pa-0 ma-0">
                        <v-col class="pa-0 ma-0">
                            <div class="float-right">
                                <v-checkbox
                                    v-model="filteredType"
                                    value="page"
                                    label="Page"
                                    class="pr-4"
                                    hide-details
                                    color="primary"
                                />
                                <v-checkbox
                                    v-model="filteredType"
                                    value="post"
                                    label="Post"
                                    class="pr-4"
                                    hide-details
                                    color="primary"
                                />
                            </div>
                        </v-col>
                    </v-row>
                    <table-standard
                        show-expand
                        :items="logs"
                        :config="config"
                        class="row-pointer"
                        :total="totalCounter"
                        :options.sync="tableOptions"
                        :itemsPerPageOptions="[10, 50, 100]"
                        :loading="Api.History.loading"
                    >
                        <template v-slot:expanded-item="{ headers, item }">
                            <td
                                :colspan="headers.length"
                                class="pt-3 pb-2 pl-10"
                            >
                                <v-container fluid>
                                    <v-row v-if="item.action == 'update'">
                                        <v-col
                                            cols="6"
                                            v-if="item.data.original"
                                        >
                                            <v-card outlined>
                                                <v-card-text>
                                                    <v-row
                                                        v-for="key in Object.keys(
                                                            item.data.original
                                                        )"
                                                    >
                                                        <v-col
                                                            class="py-0"
                                                            cols="4"
                                                        >
                                                            <strong>
                                                                {{ key }}:
                                                            </strong>
                                                        </v-col>
                                                        <v-col
                                                            :class="`py-0 ${
                                                                item.data
                                                                    .updated &&
                                                                item.data
                                                                    .original[
                                                                    key
                                                                ] !=
                                                                    item.data
                                                                        .updated[
                                                                        key
                                                                    ]
                                                                    ? 'red lighten-3'
                                                                    : ''
                                                            }`"
                                                        >
                                                            {{
                                                                item.data
                                                                    .original[
                                                                    key
                                                                ]
                                                            }}
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                        <v-col
                                            cols="6"
                                            v-if="item.data.updated"
                                        >
                                            <v-card outlined>
                                                <v-card-text>
                                                    <v-row
                                                        v-for="key in Object.keys(
                                                            item.data.updated
                                                        )"
                                                    >
                                                        <v-col
                                                            class="py-0"
                                                            cols="4"
                                                        >
                                                            <strong>
                                                                {{ key }}:
                                                            </strong>
                                                        </v-col>
                                                        <v-col
                                                            :class="`py-0 ${
                                                                item.data
                                                                    .original &&
                                                                item.data
                                                                    .original[
                                                                    key
                                                                ] !=
                                                                    item.data
                                                                        .updated[
                                                                        key
                                                                    ]
                                                                    ? 'green lighten-3'
                                                                    : ''
                                                            }`"
                                                        >
                                                            {{
                                                                item.data
                                                                    .updated[
                                                                    key
                                                                ]
                                                            }}
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                    <v-row v-else-if="item.data">
                                        <v-col>
                                            <v-card outlined>
                                                <v-card-text>
                                                    <v-row
                                                        v-for="key in Object.keys(
                                                            item.data
                                                        )"
                                                    >
                                                        <v-col
                                                            class="py-0"
                                                            cols="4"
                                                        >
                                                            <strong>
                                                                {{ key }}:
                                                            </strong>
                                                        </v-col>
                                                        <v-col class="py-0">
                                                            {{ item.data[key] }}
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </td>
                        </template>
                    </table-standard>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import formatDate from "@/utils/format/date";
import { Api } from "@/store";

@Component({ layout: "panel" })
export default class PageChangesHistory extends Vue {
    Api = Api;

    logs: Array<any> = [];
    totalCounter: number = 0;
    filteredType: Array<"post" | "page"> = ["page", "post"];
    tableOptions: {
        page?: number;
        itemsPerPage?: number;
    } = {};

    config = {
        headers: [
            { text: "Title", value: "historyable.title" },
            { text: "Type", value: "historyable_type" },
            { text: "User", value: "user.user_name" },
            { text: "Action", value: "action" },
            {
                text: "Date",
                value: "user.created_at",
                valueFunc: (item: any) =>
                    formatDate(item.created_at, "YYYY/MM/DD HH:mm:ss"),
            },
            { text: "", value: "data-table-expand" },
        ],
    };

    mounted() {
        this.getHistoryLogs();
    }

    @Watch("filteredType")
    statusFilterChanged(newValue: Array<string>, oldValue: Array<string>) {
        if (newValue.length == 0)
            this.filteredType = [oldValue.includes("post") ? "page" : "post"];
        this.getHistoryLogs();
    }

    @Watch("tableOptions")
    async getHistoryLogs() {
        const { data, total } = await Api.History.getHistoryLogs({
            type:
                this.filteredType.length == 2
                    ? undefined
                    : this.filteredType[0],
            page: this.tableOptions.page,
            perPage: this.tableOptions.itemsPerPage,
        });
        this.logs = data;
        this.totalCounter = total;
    }
}
</script>
