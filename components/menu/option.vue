<template>
    <div
        class="tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-p-3"
    >
        <div v-if="!isArray">
            <v-row v-if="enableEdit" align="start">
                <v-col cols="12">
                    <structure-editor-url
                        :inline="true"
                        v-model="editingItem"
                    />
                </v-col>
                <v-col cols="12">
                    <div
                        class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-2"
                        style="margin-top: 27px"
                    >
                        <button
                            class="tw-bg-green-500 tw-bg-opacity-20 tw-text-green-500 tw-rounded-lg tw-px-2 tw-py-3.5 tw-w-full"
                            @click="confirmEdit"
                        >
                            Confirm
                        </button>
                        <button
                            class="tw-bg-red-500 tw-bg-opacity-20 tw-text-red-500 tw-rounded-lg tw-px-2 tw-py-3.5 tw-w-full"
                            @click="cancelEdit"
                        >
                            Cancel
                        </button>
                    </div>
                </v-col>
                <pre>{{ editingItem }}</pre>
                <pre>{{ model }}</pre>
            </v-row>

            <div
                v-else
                class="tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-w-full tw-p-3 tw-bg-green-50 tw-rounded-xl"
            >
                <div class="tw-text-lg tw-font-bold">{{ model.name }}</div>
                <div>{{ model.url }}</div>
                <div class="tw-flex tw-items-center tw-space-x-4">
                    <button @click="model.static = !model.static">
                        <span v-if="model.static">Hide Submenu</span>
                        <span v-else>Show Submenu</span>
                    </button>

                    <button @click="editTitle">
                        <v-icon small class="gray--text">mdi-pencil</v-icon>
                    </button>

                    <button @click="confirmDeleteOption">
                        <v-icon small class="red--text">mdi-delete</v-icon>
                    </button>
                </div>
            </div>
        </div>

        <ul class="tw-list-none" v-if="!model.static">
            <draggable v-model="model.columns" group="options">
                <li
                    class="optionBox"
                    v-for="(column, index) in model.columns"
                    :key="`option_${index}`"
                >
                    <div class="tw-flex tw-items-center tw-space-x-3 tw-p-2">
                        <div class="tw-text-blue-400">
                            <span>Column</span>
                            <span>{{ index + 1 }}</span>
                        </div>
                        <button @click="remove(index)">
                            <v-icon small class="red--text">mdi-delete</v-icon>
                        </button>
                    </div>
                    <menu-items v-model="model.columns[index]" />
                </li>
            </draggable>
            <li class="tw-mt-2">
                <button
                    @click="addNewColumn"
                    class="tw-border tw-border-dashed tw-bg-blue-50 hover:tw-bg-blue-200 tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3"
                >
                    Add New Column
                </button>
            </li>
        </ul>

        <div
            class="tw-pl-6 tw-mt-4"
            v-if="!model.static && model.hasOwnProperty('products')"
        >
            <div class="tw-flex tw-items-center tw-space-x-3 tw-p-2">
                <div class="tw-text-blue-400">
                    <span>Products</span>
                </div>
            </div>
            <menu-products
                :value="model.products"
                @input="(v) => (model.products = v)"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { Api, AppStore } from "~/utils/store-accessor";
import { Page } from "~/repositories";

@Component
export default class MenuOptionEditor extends Vue {
    @VModel({ type: Object }) model!: any;
    Api = Api;

    enableEdit: boolean = false;

    editingItem: any = { id: -1, title: "", value: "", target: "_self" };

    mounted() {}

    editTitle() {
        this.editingItem = {
            id: 0,
            title: this.model.name,
            target: this.model.target,
            value: this.model.url,
        };
        console.log(this.model , this.editingItem)
        this.enableEdit = true;
    }

    confirmEdit() {
        this.model.name = this.editingItem.title;
        this.model.url = this.editingItem.value;
        this.model.target = this.editingItem.target;
        this.enableEdit = false;
    }

    cancelEdit() {
        this.enableEdit = false;
    }

    addNewColumn() {
        this.model.columns.push([{ id: 0, name: "Sample Item", url: "/" }]);
    }

    remove(index: number) {
        this.model.columns.splice(index, 1);
    }

    confirmDeleteOption() {
        AppStore.showDeleteConfirmationModal({
            deleteItemTitle: this.model.name + " option",
            deleteItem: this.model,
            agreeButton: { callback: this.deleteOption },
        });
    }

    deleteOption() {
        this.$emit("deleteOption", this.model);
    }

    get isArray() {
        return Array.isArray(this.model);
    }
}
</script>

<style scoped>
.optionBox {
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 13px;
}
</style>
