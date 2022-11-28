<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-tabs background-color="transparent">
                    <v-tab>All Notifications</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <table-standard
                        :config="config"
                        class="row-pointer"
                        :items="Api.Notification.all"
                        :loading="Api.Notification.loading"
                        @click:row="(Notification) => $router.push('/notifications/edit/' + Notification.id)"
                    />
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {PageResource} from "@/repositories";
import {Api, AppStore} from "@/store";

@Component({layout: "panel"})
export default class AllNotifications extends Vue {
    Api = Api;

    config = {
        headers: [
            {text: "Text", value: "text"},
            {text: "Link", value: "link"},
            {text: "", value: "actions", sortable: false, width: "0"},
        ],
        actions: [
            {
                type: "edit",
                icon: "mdi-pencil",
                to: "/notifications/edit/[id]",
            },
            {
                type: "delete",
                icon: "mdi-delete",
                onClick: (Notification: PageResource) => {
                    AppStore.showDeleteConfirmationModal({
                        deleteItemTitle: Notification.title || "",
                        deleteItem: Notification,
                        agreeButton: {callback: this.deleteNotification},
                    });
                },
            },
        ],
        globalActions: [
            {
                text: "Add Notification",
                class: 'btn',
                color: "primary",
                icon: "mdi-plus",
                to: "/notifications/add",
            },
        ],
    };

    mounted() {
        this.updateNotifications();
    }

    async updateNotifications() {
        await Api.Notification.getAll();
    }

    deleteNotification(Notification: PageResource) {
        Api.Notification.delete(Notification.id!);
    }
}
</script>
