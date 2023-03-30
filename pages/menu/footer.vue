<template>
    <v-container fluid>

        <v-tabs show-arrows v-model="tab" background-color="transparent">
            <v-tab href="#Columns">Footer Columns</v-tab>
            <v-tab href="#Socials">Footer Socials</v-tab>
            <v-tab href="#Links">Footer Links</v-tab>
        </v-tabs>

        <v-card>
            <v-tabs-items v-model="tab">
                <v-tab-item value="Columns">
                    <v-card-text>
                        <h6>Footer Columns</h6>

                        <ul class="tw-list-none">
                            <li class="optionBox" v-for="(column, index) in Menu.widgets.columns"
                                :key="`option_${index}`">
                                <div class="tw-flex tw-items-center tw-space-x-3 tw-p-2">
                                    <div class="tw-text-blue-400">
                                        <span>Column</span>
                                        <span>{{ index + 1 }}</span>
                                    </div>
                                    <button @click="deleteColumn(index)">
                                        <v-icon small class="red--text">mdi-delete</v-icon>
                                    </button>
                                </div>
                                <menu-items v-model="Menu.widgets.columns[index]"/>
                            </li>
                            <li class="tw-mt-2">
                                <button @click="addNewColumn"
                                        class="tw-border tw-border-dashed tw-bg-blue-50 hover:tw-bg-blue-200 tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3">
                                    Add New Column
                                </button>
                            </li>
                        </ul>

                    </v-card-text>
                </v-tab-item>
                <v-tab-item value="Socials">
                    <v-card-text>
                        <h6>Footer Social Media</h6>
                        <menu-socials v-model="Menu.widgets.socials"/>

                    </v-card-text>
                </v-tab-item>

                <v-tab-item value="Links">
                    <v-card-text>
                        <h6>Footer Links</h6>
                        <menu-items v-model="Menu.widgets.links"/>
                    </v-card-text>
                </v-tab-item>
            </v-tabs-items>

        </v-card>

        <v-card class="mt-5">
            <v-card-text align="end">
                <v-btn color="success" @click="submit">Save Changes</v-btn>
            </v-card-text>
        </v-card>

        <loading-overlay :show="Api.Menu.loading"/>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {Api} from "@/store";
import {Menu} from "~/repositories";


@Component({
    layout: "panel"
})
export default class Menus extends Vue {
    Api = Api;

    tab = "";

    Menu: any = {
        id: 2,
        title: 'footer',
        widgets: {
            links: [
                {name: 'Legal Disclaimer', url: '/'},
                {name: 'Privacy Policy', url: '/'},
                {name: 'Recycling Information', url: '/'},
                {name: 'Sitemap', url: '/'},
                {name: 'California Consumer Privacy Act Portal', url: '/'},
            ],
            columns: [
                [
                    {name: 'COMPANY', url: '/'},
                    {name: 'SPONSORSHIPS', url: '/'},
                    {name: 'AUTHORIZED RETAILERS', url: '/'},
                    {name: 'CAREERS', url: '/'},
                    {name: 'COMPLIANCE', url: '/'},
                    {name: 'DO NOT SELL', url: '/'},
                ],
                [
                    {name: 'TV + AUDIO', url: '/'},
                    {name: 'HOME APPLIANCES', url: '/'},
                    {name: 'AIR PRODUCTS', url: '/'},
                    {name: 'COMMERCIAL DISPLAYS', url: '/'},
                    {name: 'COMMERCIAL REFRIGERATORS', url: '/'},
                ],
                [
                    {name: 'SUPPORT', url: '/'},
                    {name: 'FAQ', url: '/'},
                    {name: 'RECALL INFORMATION', url: '/'},
                    {name: 'CONTACT', url: '/'},
                    {name: 'REGISTER', url: '/'},
                ]
            ],
            socials: [
                {
                    name: 'facebook',
                    url: 'https://www.facebook.com/hisenseusa/',
                },
                {
                    name: 'twitter',
                    url: 'https://twitter.com/hisense_usa',
                },
                {
                    name: 'instagram',
                    url: 'https://www.instagram.com/hisense_usa/',
                },
                {
                    name: 'youtube',
                    url: 'https://www.youtube.com/user/HisenseUSA',
                },
            ]
        }
    };

    async mounted() {
        // this.getFooter();
    }

    getFooter() {
        Api.Menu.getFooter().then((res: any) => {
            this.Menu.widgets = res.widtets;
        })

    }

    addNewColumn() {
        this.Menu.widgets.columns.push([{name: 'Sample Item', 'url': '/'},])
    }

    deleteColumn(index: number) {
        this.Menu.widgets.columns.splice(index, 1);
    }

    async submit() {
        await Api.Menu.update({id: Number(this.Menu.id), Menu: this.Menu})
    }

}
</script>
<style scoped>
.optionBox {
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 13px;
}
</style>
