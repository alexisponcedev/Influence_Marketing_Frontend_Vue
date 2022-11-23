<template>
    <v-container fluid>

        <div v-if="editMode" class="d-flex justify-space-between align-center">
            <breadcrumbs :locations="locations"/>
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

                        <div class="tw-flex tw-items-center tw-justify-between">
                            <div class="tw-text-center tw-flex-1">
                                <h5>{{ fromObj.title }}</h5>
                                <structure-editor-url
                                    :showTitle="false"
                                    :options="options"
                                    :rebuild="fromObj"
                                    v-model="fromObj"/>
                            </div>

                            <div class="tw-w-20 tw-flex tw-justify-center">
                                <v-icon>mdi-arrow-right</v-icon>
                            </div>

                            <div class="tw-text-center tw-flex-1">
                                <h5>{{ toObj.title }}</h5>
                                <structure-editor-url
                                    :showTitle="false"
                                    :hasBackground="true"
                                    :options="options"
                                    :rebuild="toObj"
                                    v-model="toObj"/>
                            </div>
                        </div>

                        <form-field-select :field="redirectionCodeField" v-model="Notification.redirect_code"/>

                    </v-card-text>

                </v-tab-item>

            </v-tabs-items>

        </v-form>

        <button
            class="tw-my-3 tw-w-full tw-py-3 tw-bg-white tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-ext-center tw-shadow"
            @click="submit">Save
        </button>

        <loading-overlay :show="Api.Notification.loading"/>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import Validation from "@/utils/validation";
import {Page} from "@/repositories";
import {FormField} from "@/models";
import {Api} from "@/store";
import HoverButton from "~/components/base/HoverButton.vue";
import {UrlTypeEnum} from "~/interfaces/UrlTypeEnum";
import {StructureType} from "~/models/StructureType";

@Component({
    components: {HoverButton},
    layout: "panel"
})
export default class EntityForm extends Vue {
    @Prop(Boolean) readonly editMode!: Boolean;

    Api = Api;

    tab = "";

    fromObj: any = {id: -1, title: 'Source URL', value: ''};
    toObj: any = {id: -1, title: 'Destination URL', value: ''};

    options = [
        {title: 'Page URLs', value: UrlTypeEnum.Internal},
        {title: 'Custom URL', value: UrlTypeEnum.Custom},
    ]

    Notification: any = {
        id: 0,
        data: {
            title: {id: 0, type: StructureType.String, title: 'Notification Title', value: 'Notification Text'},
            link: {id: 1, type: StructureType.Url, title: 'Notification URL', value: 'Notification URL'},
            backgroundColor: {id: 2, type: StructureType.Color, title: 'Background Color', value: ''},
            textColor: {id: 3, type: StructureType.Color, title: 'text Color', value: '#fff'},
        },
    };

    locations: Array<{ title: string; to: string }> = [];

    formFields: Array<FormField> = [];

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
                to: "/notification",
            },
            {
                title: 'Notification id:' + this.Notification.id || "",
                to: "/notification/edit/" + this.Notification.id!,
            },
        ];
    }

    async initNotificationsTab() {
        await this.getEntity();
        this.updateNotificationFormFields();
    }

    async getEntity() {
        if (this.editMode) {
            this.Notification = (await Api.Notification.get(+this.$route.params.id)) as Notification;
            this.fromObj.value = this.Notification.source_url;
            this.toObj.value = this.Notification.redirect_url;
        }
    }

    updateNotificationFormFields() {
        this.formFields = [
            {
                type: "form-field-text",
                label: "Name",
                modelKey: "name",
                placeholder: 'enter the redirect name',
                rules: [Validation.required],
                colAttrs: {cols: 12},
            },
        ];
    }

    async submit() {
        if (this.formValidate()) {

            this.Notification.source_url = this.fromObj.value;
            this.Notification.redirect_url = this.toObj.value;

            // if (this.editMode)
            //     await Api.Notification.update({
            //         id: +this.Notification.id!,
            //         Notification: this.Notification,
            //     });
            // else await Api.Notification.create(this.Notification);
            if (!this.editMode) this.$router.push("/notification");
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
