<template>
    <v-btn @click="toggleLock" :disabled="isLocked && !lockedByMe" elevation="0" outlined color="grey darken-4"
           class="control-btns">

        <div v-if="isLocked && !lockedByMe" class="tw-flex tw-items-center tw-space-x-2">
            <v-icon small :color="page.locked_by === userId ? 'red' : 'black'">mdi-lock</v-icon>
            Locked by Admin
        </div>

        <div v-else class="tw-flex tw-items-center tw-space-x-2">
            <v-icon small :disabled="isLocked">mdi-lock-open</v-icon>
            <span :class="{'tw-text-gray-400' : isLocked}">Unlock</span>

            <v-switch :value="isLocked"/>

            <v-icon small :color="page.locked_by === userId ? 'red' : 'black'" :disabled="!isLocked">mdi-lock</v-icon>
            <span :class="{'tw-text-gray-400' : !isLocked}">Lock</span>

        </div>


    </v-btn>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {Api, AppStore} from "@/store";

@Component
export default class PageLock extends Vue {
    @VModel({
        type: Object, default: () => {
        }
    }) page!: any

    Api = Api;

    async toggleLock() {
        if (this.page.locked_by > 0) {
            await Api.Page.unlockPage(+this.page.id!)
            this.page.locked_by = 0;
        } else {
            await Api.Page.lockPage(+this.page.id!)
            this.page.locked_by = this.userId;
        }
    }

    get userId() {
        let profile = JSON.parse(localStorage.getItem('profile')!.toString());
        return profile ? profile.user_id : 0;
    }

    get isLocked() {
        return this.page.locked_by > 0;
    }

    get lockedByMe() {
        return this.page.locked_by > 0 && this.page.locked_by === this.userId;
    }
}
</script>
