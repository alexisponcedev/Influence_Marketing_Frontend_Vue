<template>
    <v-dialog v-model="showSynced" max-width="800px">
        <v-card>
            <v-card-title>
                <strong> Serious Warning </strong>
                <v-spacer />
                <v-btn icon @click="showSynced = false">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div class="text-danger">
                    This is a warning to inform you that {{ locked_by_name }} is
                    currently in the process of updating the page you are
                    attempting to access. If you proceed with your access, there
                    is a possibility that the changes made by
                    {{ locked_by_name }} may be lost.
                    <br />
                    Before proceeding any further, please ensure you coordinate
                    with {{ locked_by_name }} regarding the ongoing update. This
                    step is crucial to prevent any unintended conflicts and data
                    loss.
                </div>
            </v-card-text>
            <v-card-actions class="pb-4">
                <v-btn color="primary" @click="unlockPage">
                    Unlock and Go to Page Builder
                </v-btn>

                <v-btn text @click="showSynced = false"> Cancel </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop, Watch } from "vue-property-decorator";
import { Api } from "@/store";

@Component
export default class UnlockPageModal extends Vue {
    @PropSync("show", { type: Boolean }) showSynced!: Boolean;
    @Prop(Number) readonly pageId!: number;

    locked_by_name: String = "another Admin";

    @Watch("pageId")
    async pageIdChanged() {
        const { locked_by_name } = await Api.Page.getLockStatus(this.pageId);
        if (locked_by_name) this.locked_by_name = locked_by_name;
    }

    @Watch("show")
    showed() {
        this.pageIdChanged();
    }

    async unlockPage() {
        const response = await Api.Page.unlockPage(this.pageId);
        if (response)
            this.$router.push(`/page/edit/${this.pageId}/page-builder`);
    }
}
</script>
