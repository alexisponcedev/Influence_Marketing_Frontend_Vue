<template>
    <v-btn @click="toggleLock" elevation="0" outlined color="grey darken-4" class="control-btns">
        <v-switch v-model="page.locked_by" value="1"/>
        <v-icon>mdi-lock-open</v-icon>
        Unlock
    </v-btn>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {Api, AppStore} from "@/store";

@Component
export default class PageLock extends Vue {
    @VModel({type: Object}) page!: any

    Api = Api;

    locked = !this.page.locked_by;

    toggleLock() {
        if (this.locked)
            this.lockPage();
        else this.unlockPage();
    }

    async lockPage() {
        await Api.Page.lockPage(+this.page.id!)
    }

    async unlockPage() {
        await Api.Page.unlockPage(+this.page.id!)
    }

}
</script>
