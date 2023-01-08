<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-tabs show-arrows v-model="tab" background-color="transparent">
                    <v-tab>Deploy Changes</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-text>


                        <div class="tw-h-96 tw-flex tw-flex-col tw-space-y-3 tw-items-center tw-justify-center">
                            <button class="tw-bg-green-500 tw-text-white tw-px-8 tw-py-4 tw-rounded-lg"
                                    @click="startDeploy">Deploy Changes
                            </button>
                            <p>deploy database from stage to production</p>

                        </div>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <loading-overlay :show="Api.Page.loading"/>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {Api} from "@/store";

@Component({layout: "panel"})
export default class Deploys extends Vue {
    Api = Api;

    tab = "";

    async startDeploy() {
        await Api.Page.deployStageDbToProd();
    }
}
</script>
