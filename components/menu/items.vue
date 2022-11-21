<template>
    <div class="tw-space-y-2">

        <draggable v-model="model" group="menu-items" class="tw-space-y-3">
            <div v-for="(item , index) in model" :key="index">
                <v-row v-if="editingIndex === index" align="start">
                    <v-col cols="11">
                        <structure-editor-url :inline="true" v-model="editingItem"/>
                    </v-col>
                    <v-col>
                        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2"
                             style="margin-top:27px">
                            <button
                                class="tw-bg-green-500 tw-bg-opacity-20 tw-text-green-500 tw-rounded-lg tw-px-2 tw-py-3.5 tw-w-full"
                                @click="confirm"> Confirm
                            </button>
                            <button
                                class="tw-bg-red-500 tw-bg-opacity-20 tw-text-red-500 tw-rounded-lg tw-px-2 tw-py-3.5 tw-w-full"
                                @click="cancel"> Cancel
                            </button>
                        </div>
                    </v-col>
                </v-row>
                <div v-else class="tw-flex tw-items-center tw-justify-between tw-bg-gray-50 tw-rounded-xl tw-p-4">
                    <div class="tw-text-base  tw-flex-1">{{ item.name }}</div>
                    <div class="tw-flex-1">{{ item.url }}</div>
                    <div class="tw-flex tw-items-center tw-space-x-4">
                        <button @click="edit(index)">
                            <v-icon small class="gray--text">mdi-pencil</v-icon>
                        </button>
                        <button @click="remove(index)">
                            <v-icon small class="red--text">mdi-delete</v-icon>
                        </button>
                    </div>
                </div>
            </div>
        </draggable>

        <button
            @click="addNew"
            class="tw-border tw-border-dashed tw-bg-gray-50  tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3 hover:tw-bg-gray-200">
            Add New Item
        </button>

    </div>
</template>
<script lang="ts">
import {Vue, Component, VModel, Watch} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";
import {Page} from "~/repositories";
import {UrlTypeEnum} from "~/interfaces/UrlTypeEnum";

@Component
export default class MenuItemEditor extends Vue {
    @VModel({type: Array}) model!: any
    Api = Api;

    type = UrlTypeEnum.Internal;

    pages: Array<any> = [];

    list = [];

    mounted() {
        this.list = this.model;
    }

    editingIndex: number = -1;
    editingItem: any = {id: -1, title: '', value: ''};

    edit(index: number) {
        this.editingItem = {id: this.model[index].id, title: this.model[index].name, value: this.model[index].url};
        this.editingIndex = index;
    }

    remove(index: number) {
        this.model.splice(index, 1);
    }

    addNew() {
        this.model.push({id: this.model.length + 1, name: 'New Title', url: '/'})
        this.edit(this.model.length - 1)
    }

    confirm() {
        this.model[this.editingIndex].name = this.editingItem.title;
        this.model[this.editingIndex].url = this.editingItem.value;
        this.editingIndex = -1;
    }

    cancel() {
        this.editingIndex = -1;
    }

    @Watch('list', {deep: true, immediate: true})
    onListChanged() {
        this.model = this.list;
    }
}
</script>

