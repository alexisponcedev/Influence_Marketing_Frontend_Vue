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
                <div v-for="i in 5" :key="i" class="tw-text-sm tw-transition tw-duration-300 tw-border tw-border-solid tw-border-white tw-bg-gray-50 tw-p-3 tw-rounded-lg tw-animate-pulse ">
                    <div class="tw-w-40 tw-h-4 tw-bg-gray-100 tw-rounded-lg" />
                    <div class="tw-w-64 tw-h-4 tw-bg-gray-100 tw-rounded-lg tw-mt-1" />
                </div>

            </div>



            <ul v-else class=" tw-list-none tw-pl-0 tw-space-y-2" style="padding-left : 0;">

                <li v-for="history in Api.History.all" :key="history.id"
                    :class="{'tw-bg-white tw-border-gray-600' : selected.id === history.id}"
                    class="tw-text-sm tw-transition tw-duration-300 tw-border tw-border-solid tw-border-white tw-bg-gray-50 tw-p-3 tw-rounded-lg tw-cursor-pointer">

                    <div class="tw-flex tw-items-center tw-space-x-2">

                        <div class="tw-flex-1" @click="select(history)">
                            <div class="tw-w-full tw-text-left">
                                <span v-if="history.title" class="tw-font-semibold">{{ history.title }}</span>
                                <span v-else class="tw-text-gray-500">Unnamed</span>
                            </div>
                            <datetime class="tw-mt-1 tw-text-gray-500" :value="history.created_at"/>
                        </div>

                        <div v-if="history.id === selected.id">
                            <button @click.self="preview(history)" class="">preview</button>
                        </div>
                    </div>

                </li>

            </ul>
        </div>


    </v-navigation-drawer>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";

@Component({
    components: {}
})
export default class VersionHistory extends Vue {
    @Prop({type: String, default: 'page'}) type!: string
    @VModel({type: Object}) model!: any

    Api = Api;

    drawer = false;

    selected: any = {};

    loading: boolean = false;

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
        this.$emit('input' , history.widgets);
        this.close();
    }

    async loadHistory() {
        await Api.History.getHistoryByModelNameModelId({model_id: +this.model.id!, model_name: this.type})
    }

}
</script>
