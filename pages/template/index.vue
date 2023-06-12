<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-tabs background-color="transparent">
                    <v-tab>All Templates</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <table-standard
                        :config="config"
                        class="row-pointer"
                        :items="Api.Template.all"
                        :loading="Api.Template.loading"
                        @changeTemplateStatus="templateStatus = true"
                        @click:row="
                            (Template) =>
                                $router.push('/template/edit/' + Template.id)
                        "
                    >
                        <template v-slot:[`item.status`]="{ item }">
                            <v-icon v-if="item.status !== null"
                                >mdi-check
                            </v-icon>
                        </template>
                    </table-standard>
                    <template-status-modal :show.sync="templateStatus" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TemplateResource } from "@/repositories";
import { Api, AppStore } from "@/store";

@Component({ layout: "panel" })
export default class AllTemplates extends Vue {
    Api = Api;

    templateStatus = false;

    config = {
        headers: [
            { text: "Name", value: "name" },
            { text: "Firmware", value: "status" },
            { text: "", value: "actions", sortable: false, width: "0" },
        ],
        actions: [
            {
                type: "edit",
                icon: "mdi-pencil",
                to: "/template/edit/[id]",
            },
            {
                type: "delete",
                icon: "mdi-delete",
                onClick: (Template: TemplateResource) => {
                    AppStore.showDeleteConfirmationModal({
                        deleteItemTitle: Template.name || "",
                        deleteItem: Template,
                        agreeButton: { callback: this.deleteTemplate },
                    });
                },
            },
        ],
        globalActions: [
            {
                text: "Template Firmware",
                class: "btn",
                color: "primary",
                action: "changeTemplateStatus",
            },
            {
                text: "Add Template",
                class: "btn",
                color: "primary",
                icon: "mdi-plus",
                to: "/template/add",
            },
        ],
    };

    mounted() {
        this.updateTemplates();
    }

    async updateTemplates() {
        await Api.Template.getAll();
    }

    deleteTemplate(Template: TemplateResource) {
        Api.Template.delete(Template.id!).then(this.updateTemplates);
    }
}
</script>
