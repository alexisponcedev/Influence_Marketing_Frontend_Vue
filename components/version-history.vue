<template>
    <v-navigation-drawer
        width="320"
        v-model="drawer"
        absolute
        temporary
        right
    >
        <div class="tw-p-3">
            <h6>Version Histories</h6>

            <div v-if="Api.History.loading" class="tw-grid tw-grid-cols-1 tw-gap-3">
                <div v-for="i in 5" :key="i"
                     class="tw-text-sm tw-transition tw-duration-300 tw-border tw-border-solid tw-border-white tw-bg-gray-50 tw-p-3 tw-rounded-lg tw-animate-pulse ">
                    <div class="tw-w-40 tw-h-4 tw-bg-gray-100 tw-rounded-lg"/>
                    <div class="tw-w-64 tw-h-4 tw-bg-gray-100 tw-rounded-lg tw-mt-1"/>
                </div>

            </div>

            <div v-else class="tw-space-y-2">
                <ul class=" tw-list-none tw-pl-0 tw-space-y-2" style="padding-left : 0;">
                    <li v-for="history in savedList" :key="history.id"
                        :class="{'tw-bg-white tw-border-gray-600' : selected.id === history.id}"
                        class="tw-text-sm tw-transition tw-duration-300 tw-border tw-border-solid tw-border-white tw-bg-gray-50 tw-p-3 tw-rounded-lg tw-cursor-pointer">
                        <div class="tw-flex tw-items-center tw-space-x-2">

                            <div class="tw-flex-1" @click.prevent="select(history)">
                                <div class="tw-w-full tw-text-left">
                                    <span v-if="history.title" class="tw-font-semibold">{{ history.title }}</span>
                                    <span v-else class="tw-text-gray-500">Unnamed</span>
                                </div>
                                <datetime class="tw-mt-1 tw-text-gray-500" :value="history.created_at"/>
                            </div>

                            <div v-if="history.id === selected.id"
                                 class="tw-flex tw-justify-center tw-items-center tw-space-x-1">
                                <button @click.prevent="preview(history)" class="hover:tw-text-blue-500" title="preview">
                                    <v-icon>mdi-projector</v-icon>
                                </button>
                                <button @click.prevent="openModal" class="hover:tw-text-blue-500" title="save">
                                    <v-icon>mdi-plus</v-icon>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
                <hr class="tw-bg-gray-100" style="" />

                <ul class=" tw-list-none tw-pl-0 tw-space-y-2" style="padding-left : 0;">

                    <li v-for="history in unsavedList" :key="history.id"
                        :class="{'tw-bg-white tw-border-gray-600' : selected.id === history.id}"
                        class="tw-text-sm tw-transition tw-duration-300 tw-border tw-border-solid tw-border-white tw-bg-gray-50 tw-p-3 tw-rounded-lg tw-cursor-pointer">
                        <div class="tw-flex tw-items-center tw-space-x-2">

                            <div class="tw-flex-1" @click.prevent="select(history)">
                                <div class="tw-w-full tw-text-left">
                                    <span v-if="history.title" class="tw-font-semibold">{{ history.title }}</span>
                                    <span v-else class="tw-text-gray-500">Unnamed</span>
                                </div>
                                <datetime class="tw-mt-1 tw-text-gray-500" :value="history.created_at"/>
                            </div>

                            <div v-if="history.id === selected.id"
                                 class="tw-flex tw-justify-center tw-items-center tw-space-x-1">
                                <button @click.prevent="preview(history)" class="hover:tw-text-blue-500" title="preview">
                                    <v-icon>mdi-projector</v-icon>
                                </button>
                                <button @click.prevent="openModal" class="hover:tw-text-blue-500" title="save">
                                    <v-icon>mdi-plus</v-icon>
                                </button>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>


        </div>


        <v-dialog v-model="showModal" max-width="500">
            <v-card>
                <v-card-title>
                    History Manager Manager
                </v-card-title>

                <v-card-text>
                    <form-field-text :field="titleField" v-model="selected.title"/>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="Api.History.loading" @click="save" text color="green">Save</v-btn>
                    <v-btn :disabled="Api.History.loading" @click="cancel" text color="red"> Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-navigation-drawer>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";
import {HistoryResource} from "~/repositories";

@Component({
    components: {}
})
export default class VersionHistory extends Vue {
    @Prop({type: String, default: 'page'}) type!: string
    @VModel({type: Object}) model!: any

    Api = Api;

    drawer = false;

    selected: HistoryResource = {id: 0, title: '', widgets: []};

    showModal: boolean = false;

    titleField = {
        label: 'History Name',
        placeholder: 'Enter history name',
        rules: [],
        colAttrs: {cols: 12}
    }

    open() {
        this.loadHistory();
        this.drawer = true;
    }

    close() {
        this.drawer = false;
    }

    select(history: any) {
        this.selected = history;
    }

    preview(history: any) {
        this.$emit('input', history.widgets);
    }

    async loadHistory() {
        await Api.History.getHistoryByModelNameModelId({model_id: +this.model.id!, model_name: this.type})
    }

    openModal() {
        console.log('trying to show modal');
        this.showModal = true;
    }

    async save() {
        this.cancel();
        await Api.History.updateTitle({title: this.selected.title, id: this.selected.id})
    }

    cancel() {
        this.showModal = false;
    }


    get savedList() {
        return Api.History.all.filter(i => i.title);
    }

    get unsavedList() {
        return Api.History.all.filter(i => !i.title);
    }

}
</script>

<style scoped>
hr{
    background: #d5d5d5;
    border: transparent;
    height: 1px;
}
.x-input {
    height: 39px;
    width: 100%;
    text-align: center;
}

.x-btn {
    @apply tw-w-full tw-py-1 tw-px-2 tw-bg-gray-50 tw-rounded-lg
}
</style>
