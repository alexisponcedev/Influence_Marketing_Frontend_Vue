<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-tabs
                    show-arrows
                    v-model="tab"
                    background-color="transparent"
                >
                    <v-tab>Deploy Changes</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card elevation="0" color="#F2F3F8">
                    <v-card-text>
                        <div class="tw-w-full tw-grid tw-grid-cols-2 tw-gap-2">
                            <card-select
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
                                    Deploy
                                </v-btn>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <loading-overlay :show="Api.Page.loading || loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/store";
import cardSelect from "~/components/pages/deploy/cardSelect.vue";
import { deploy } from "~/data/deploy";

@Component({ layout: "panel", components: { cardSelect } })
export default class Deploys extends Vue {
    Api = Api;

    tab = "";
    tables = [];
    loading: boolean = false;
    deploy = deploy;

    async startDeploy() {
        this.loading = true;
        const table = this.tables.join(",");

        await Api.Page.deployStageDbToProd(table).then((response) => {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        });
    }
}
</script>
