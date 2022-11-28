<template>
    <v-col cols="12">
        <v-row>
            <form-field-select-page-name :field="selectField"
                                         @update:selected-page="p => page = p"
                                         :rules="selectField.rules"
                                         :placeholder="selectField.placeholder"/>

            <div class="tw-flex tw-items-center tw-justify-center tw-flex-1">
                <button @click.prevent="addPage(page)"
                        style="padding: 15px 13px;margin-top: -10px;"
                        class="tw-border tw-border-solid tw-border-gray-400 tw-rounded tw-w-full">Add
                </button>
            </div>
        </v-row>

        <div class="tw-grid tw-grid-cols-2 tw-gap-2">
            <div v-for="page in pages" :key="page.id"
                 class="tw-flex tw-space-x-2 tw-px-2 tw-py-3 tw-border tw-border-solid tw-border-gray-400 tw-rounded-lg"
                 :title="page.title">
                <div class="tw-flex-1 tw-line-clamp-1">{{ page.title }}</div>
                <button @click.prevent="deletePage(page)">
                    <v-icon>mdi-close</v-icon>
                </button>
            </div>
        </div>
    </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {FormField} from "~/models";
import {Api} from "~/utils/store-accessor";
import {Page, PageResource} from "~/repositories";

@Component
export default class AutoCompleteSelectPageRouteFormField extends Vue {
    @VModel({type: Array, default: () => []}) model!: Array<any>
    @Prop(Number) readonly pageId!: number
    @Prop(Object) readonly field!: FormField;
    @Prop(Array) readonly data!: Array<any>;


    Api = Api;

    page: PageResource = {};

    pages: Array<any> = [];

    selectField = {
        label: "Show On Pages",
        placeholder: 'Select Page',
        'item-text': 'title',
        'item-value': 'id',
        rules: [],
        colAttrs: {cols: 11},
    }

    mounted(){
        this.pages = this.data ?? [];
    }

    addPage(page: any) {
        this.model.push(page.id);
        this.pages.push({id: page.id, route: page.route, title: page.title});
    }

    deletePage(page: any) {
        this.model.splice(this.model.findIndex(i => i.id === page.id), 1);
    }

    @Watch('data')
    onDataChanged(value: Array<any>) {
        this.pages = value;
    }
}
</script>
