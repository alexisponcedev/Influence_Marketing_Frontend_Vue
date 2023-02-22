<template>
    <v-dialog v-model="dialog" width="600" scrollable content-class="dialog-box">
        <v-card class="ma-0 pa-5">
            <v-container>
                <p class="tw-text-base tw-text-[#212121]">
                    Want to duplicate current page <span class="tw-font-semibold">{{ page.title }} </span>?
                </p>

                <form-field-text :max="60" :field="formFields[0]" v-model="title"/>

                <form-field-select-page-route :field="formFields[1]" v-model="route"/>

                <v-btn
                    class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
                    color="" :loading="Api.Page.loading" @click.prevent="duplicatePage">Create Page
                </v-btn>

            </v-container>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {PageResource} from "~/repositories";
import {Api} from "~/store";

@Component
export default class PageDiscardDialog extends Vue {
    // @Prop(Object) readonly page!: any;

    dialog: boolean = false;
    page: PageResource = {};
    Api = Api;

    title: string = '';
    route: string = '';

    formFields: Array<any> = [
        {
            type: "form-field-text",
            label: "Page Title",
            modelKey: "title",
            placeholder: 'please enter page title',
            rules: [],
            colAttrs: {cols: 12},
        },
        {
            type: "form-field-select-page-route",
            label: "Page URL",
            modelKey: "route",
            rules: [],
            colAttrs: {cols: 12},
        },
    ]

    open(page: any) {
        this.page = page;
        this.title = page.title + '-duplicated'
        this.route = page.route + '-duplicated';
        this.dialog = true;
    }

    close() {
        this.dialog = false;
    }

    async duplicatePage(Page: PageResource) {
        let page = await Api.Page.duplicatePage({page_id: +this.page.id!, title: this.title, route: this.route})
        await Api.Page.doDeploy();
        this.$emit('created')
        this.close();
        this.$router.push('/page/edit/' + page.id)
    }
}
</script>
