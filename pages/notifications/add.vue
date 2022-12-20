<template>
    <v-container fluid>
        <div v-if="editMode" class="d-flex justify-space-between align-center">
            <breadcrumbs :locations="locations" />
        </div>
        <v-row>
            <v-col>
                <v-tabs show-arrows v-model="tab" background-color="transparent">
                    <v-tab href="#Notifications">Notification Details</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        <v-form ref="form" @submit.prevent="submit">

            <v-tabs-items v-model="tab">
                <v-tab-item value="Notifications">
                    <v-card-text>
                        <h6>Preview</h6>
                        <div class="tw-flex tw-items-center tw-justify-between tw-px-2 tw-py-1.5 tw-rounded"
                            :style="{ 'background-color': Notification.background_color, 'color': Notification.text_color }">
                            <div>{{ Notification.text }}</div>
                            <div class="tw-flex tw-space-x-2 tw-items-center tw-text-white">
                                <span>Dismiss</span>
                                <v-icon color="white">mdi-close-circle</v-icon>
                            </div>

                        </div>

                    </v-card-text>
                    <v-card-text>

                        <form-field-text :field="textField" v-model="Notification.text" />

                        <structure-editor-url :has-background="false" :inline="true" :showTitle="false"
                            :options="options" :rebuild="routeObj" v-model="routeObj" />

                        <v-row>
                            <v-col>
                                <structure-editor-color v-model="backgroundColor" />
                            </v-col>

                            <v-col>
                                <structure-editor-color v-model="textColor" />
                            </v-col>
                        </v-row>


                        <form-field-select-page-multiple-selector :data="Notification.pages"
                            v-model="Notification.page_Ids" />

                    </v-card-text>

                </v-tab-item>

            </v-tabs-items>

        </v-form>
        <button
            class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
            @click="submit">Save
        </button>
        <loading-overlay :show="Api.Notification.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Validation from "@/utils/validation";
import { FormField } from "@/models";
import { Api } from "@/store";
import HoverButton from "~/components/base/HoverButton.vue";
import { UrlTypeEnum } from "~/interfaces/UrlTypeEnum";
import { Notification, NotificationResource } from "~/repositories";

@Component({
    components: { HoverButton },
    layout: "panel"
})
export default class EntityForm extends Vue {
    @Prop(Boolean) readonly editMode!: Boolean;

    Api = Api;

    tab = "";

    Notification: any = {
        id: 0,
        text: 'Please enter notification text here',
        link: '/',
        background_color: '#383838',
        text_color: '#8C8F8F',
        page_Ids: [],
    };

    routeObj: any = { id: -1, title: 'Link', value: '' };
    backgroundColor = { id: -1, title: 'Background Title', value: '#383838' }
    textColor = { id: -1, title: 'Text Title', value: '#8C8F8F' }

    options = [
        { title: 'Page URLs', value: UrlTypeEnum.Internal },
        { title: 'Custom URL', value: UrlTypeEnum.Custom },
    ]

    locations: Array<{ title: string; to: string }> = [];

    formFields: Array<FormField> = [];

    textField = {
        type: "form-field-text",
        label: "Text",
        modelKey: "text",
        placeholder: 'Enter the text',
        rules: [Validation.required],
        colAttrs: { cols: 12 },
    };

    mounted() {
        this.init();
    }

    async init() {
        await this.initNotificationsTab();
        this.updateLocations();
    }

    updateLocations() {
        this.locations = [
            {
                title: "Notifications",
                to: "/notifications",
            },
            {
                title: 'Notification id:' + this.Notification.id || "",
                to: "/notifications/edit/" + this.Notification.id!,
            },
        ];
    }

    async initNotificationsTab() {
        await this.getEntity();
        this.updateNotificationFormFields();
    }

    async getEntity() {
        if (this.editMode) {
            this.Notification = (await Api.Notification.get(+this.$route.params.id)) as NotificationResource;
            this.routeObj.value = this.Notification.link;
            this.backgroundColor.value = this.Notification.background_color || '';
            this.textColor.value = this.Notification.text_color || '';
        }
    }

    updateNotificationFormFields() {
        this.formFields = [];
    }

    async submit() {
        if (this.formValidate()) {

            this.Notification.link = this.routeObj.value;
            this.Notification.background_color = this.backgroundColor.value;
            this.Notification.text_color = this.textColor.value;

            if (this.editMode)
                await Api.Notification.update({
                    id: +this.Notification.id!,
                    Notification: this.Notification,
                });
            else await Api.Notification.create(this.Notification)
            if (!this.editMode) this.$router.push("/notifications");
        }
    }

    formValidate() {
        return (this.$refs.form as any).validate();
    }

    @Watch("tab")
    tabChanged(newTab: string, _: string) {
        switch (newTab) {
            case "Notifications":
                this.initNotificationsTab();
                break;
        }
    }

}
</script>
