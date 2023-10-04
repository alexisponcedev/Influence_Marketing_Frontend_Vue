<template>
    <v-btn
        v-if="isLocked && !lockedByMe"
        :disabled="true"
        @click="() => {}"
        elevation="0"
        outlined
        color="grey darken-4"
        class="control-btns"
    >
        <div class="tw-flex tw-items-center tw-space-x-2">
            <v-icon small>mdi-lock</v-icon>
            Locked by {{ lockedByName }}
        </div>
    </v-btn>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop, Watch } from "vue-property-decorator";
import { Api } from "@/store";

@Component
export default class PageLock extends Vue {
    @VModel({
        type: Object,
        default: () => {},
    })
    page!: any;

    @Prop() readonly returnId!: any;

    lockedByName: string = "Admin";
    lockedById: number = 0;

    Api = Api;

    get userId() {
        let profile = JSON.parse(localStorage.getItem("profile")!.toString());
        return Number(profile ? profile.user_id : 0);
    }

    get isLocked() {
        return !!this.lockedById;
    }

    get lockedByMe() {
        return !!this.lockedById && this.lockedById === this.userId;
    }

    @Watch("page")
    pageChanged() {
        this.getLockStatus();
    }

    _timerId: any = null;

    async getLockStatus() {
        if (this.page?.id) {
            const response = await Api.Page.getLockStatus(this.page.id);
            this.lockedByName = response.locked_by_name || "Admin";
            this.lockedById = response.locked_by || 0;
        }
    }
}
</script>
