<template>
    <v-container fluid>


        <v-row>
            <v-col>
                <v-tabs background-color="transparent">
                    <v-tab>All Errors</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <table-standard :config="config" class="row-pointer" :items="Api.Error.all"
                        :loading="Api.Error.loading" @click:row="(Error) => $router.push('/template/edit/' + Error.id)">
                        <template #item.status="{ item }">
                            {{ item.title }}
                            <span v-if="item.status" class="tw-text-green-500">Yes</span>
                            <span v-else class="tw-text-red-500">No</span>
                        </template>
                    </table-standard>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ErrorResource } from "@/repositories";
import { Api, AppStore } from "@/store";

@Component({ layout: "panel" })
export default class AllErrors extends Vue {
    Api = Api;

    config = {
        headers: [
            { text: "Route", value: "route" },
            { text: "Message", value: "message" },
            { text: "Created At", value: "created_at" },
            {text: "Fixed", value: "status"},
            { text: "", value: "actions", sortable: false, width: "0" },
        ],
        actions: [
            {    
                type: "update",
                icon: "mdi-check-circle-outline",
                onClick: (Error: ErrorResource) => {

                    Api.Error.setAsDone(Error.id!);
                },
            },
            {
                type: "update",
                icon: "mdi-content-copy",
                onClick: (Error: ErrorResource) => {
                    try {
                        let text = `id : ${Error.id}\nPage : ${Error.route} \nmessage : ${Error.message}\ntime : ${Error.created_at}`;
                        navigator.clipboard.writeText(text)
                        AppStore.showSnackBar({
                            message: 'Item copied to Clipboard!'
                        })
                        console.log(text);
                    } catch (error) {
                        console.error(error);
                    }
                },
            },
        ],
        globalActions: [],
    };

    mounted() {
        this.updateErrors();
    }

    async updateErrors() {
        await Api.Error.getAll();
    }

    // deleteError(Error: ErrorResource) {
    //     Api.Error.delete(Error.id!).then(this.updateErrors);
    // }
}
</script>
