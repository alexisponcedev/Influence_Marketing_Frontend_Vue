<template>
    <v-container fluid>
        <v-tabs show-arrows v-model="tab" background-color="transparent">
            <v-tab href="#Columns">Footer Columns</v-tab>
            <v-tab href="#Socials">Footer Socials</v-tab>
            <v-tab href="#Links">Footer Links</v-tab>
            <v-tab v-if="getActiveBrandName().includes('hisense')" href="#Texts"
                >Texts</v-tab
            >
        </v-tabs>

        <v-card>
            <v-tabs-items v-model="tab">
                <v-tab-item value="Columns">
                    <v-card-text>
                        <h6>Footer Columns</h6>

                        <ul v-if="false" class="tw-list-none">
                            <li
                                class="optionBox"
                                v-for="(column, index) in Menu.widgets.columns"
                                :key="`option_${index}`"
                            >
                                <div
                                    class="tw-flex tw-items-center tw-space-x-3 tw-p-2"
                                >
                                    <div class="tw-text-blue-400">
                                        <span>Column</span>
                                        <span>{{ index + 1 }}</span>
                                    </div>
                                    <button @click="deleteColumn(index)">
                                        <v-icon small class="red--text"
                                            >mdi-delete</v-icon
                                        >
                                    </button>
                                </div>
                                <menu-items
                                    v-if="getActiveBrandName().includes('hisense')"
                                    v-model="Menu.widgets.columns[index]"
                                />
                            </li>
                            <li class="tw-mt-2">
                                <button
                                    @click="addNewColumn"
                                    class="tw-border tw-border-dashed tw-bg-blue-50 hover:tw-bg-blue-200 tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3"
                                >
                                    Add New Column
                                </button>
                            </li>
                        </ul>

                        <v-row>
                            <v-col cols="10">
                                <v-tabs
                                    class="tw-flex-1"
                                    show-arrows
                                    v-model="selectedColumn"
                                    background-color="transparent"
                                >
                                    <v-tab
                                        v-for="(column, index) in Menu.widgets
                                            .columns"
                                        :key="`column_${index}`"
                                        :href="`#Column${index + 1}`"
                                    >
                                        Column {{ index + 1 }}
                                        <v-btn
                                            icon
                                            @click="
                                                deleteColumn(
                                                    Menu.widgets.columns,
                                                    index
                                                )
                                            "
                                        >
                                            <v-icon small class="red--text"
                                                >mdi-delete</v-icon
                                            >
                                        </v-btn>
                                    </v-tab>
                                </v-tabs>
                            </v-col>
                            <v-col cols="2">
                                <v-btn
                                    color="primary"
                                    outlined
                                    @click="addNewColumn(Menu.widgets.columns)"
                                    >Add Column
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-tabs-items v-model="selectedColumn">
                            <v-tab-item
                                v-for="(column, i) in Menu.widgets.columns"
                                :key="`column_${index}`"
                                :value="`Column${i + 1}`"
                            >
                                <ul class="tw-list-none">
                                    <li
                                        class="optionBox"
                                        v-for="(row, j) in column"
                                        :key="`option_${j}`"
                                    >
                                        <v-row align="start">
                                            <v-col cols="11">
                                                <structure-editor-url
                                                    :has-background="false"
                                                    :inline="true"
                                                    v-model="row.header"
                                                />
                                            </v-col>
                                            <v-col cols="1" class="pt-16">
                                                <v-btn
                                                    block
                                                    outlined
                                                    @click="
                                                        deleteColumn(column, j)
                                                    "
                                                >
                                                    <v-icon
                                                        small
                                                        class="red--text"
                                                        >mdi-delete</v-icon
                                                    >
                                                </v-btn>
                                            </v-col>
                                        </v-row>

                                        <menu-items v-model="row.columns" />
                                    </li>
                                    <li class="tw-mt-2">
                                        <button
                                            @click="addNewRowColumn(column)"
                                            class="tw-border tw-border-dashed tw-bg-blue-50 hover:tw-bg-blue-200 tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3"
                                        >
                                            Add New Column
                                        </button>
                                    </li>
                                </ul>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card-text>
                </v-tab-item>
                <v-tab-item value="Socials">
                    <v-card-text>
                        <h6>Social Title</h6>

                        <v-row>
                            <v-col>
                                <form-field-textarea
                                    :field="{
                                        label: '',
                                        rules: [],
                                        colAttrs: { cols: 12 },
                                    }"
                                    v-model="Menu.widgets.social_title"
                                />
                            </v-col>
                        </v-row>

                        <h6>Footer Social Media</h6>
                        <menu-socials v-model="Menu.widgets.socials" />
                    </v-card-text>
                </v-tab-item>
                <v-tab-item value="Links">
                    <v-card-text>
                        <h6>CopyRight</h6>
                        <v-row>
                            <v-col>
                                <form-field-textarea
                                    :field="{
                                        label: '',
                                        rules: [],
                                        colAttrs: { cols: 12 },
                                    }"
                                    v-model="Menu.widgets.copyright"
                                />
                            </v-col>
                        </v-row>

                        <h6>Footer Links</h6>
                        <menu-items v-model="Menu.widgets.links" />
                    </v-card-text>
                </v-tab-item>
                <v-tab-item
                    v-if="getActiveBrandName().includes('hisense')"
                    value="Texts"
                >
                    <v-card-text>
                        <h6>Texts</h6>

                        <v-row>
                            <v-col cols="12">
                                <form-field-textarea
                                    :field="{
                                        label: 'Social Title',
                                        rules: [],
                                        colAttrs: { cols: 12 },
                                    }"
                                    v-model="Menu.widgets.social_title"
                                />
                            </v-col>
                            <v-col cols="12">
                                <form-field-textarea
                                    :field="{
                                        label: 'Copy Right',
                                        rules: [],
                                        colAttrs: { cols: 12 },
                                    }"
                                    v-model="Menu.widgets.copyright"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-tab-item>
            </v-tabs-items>
        </v-card>

        <v-card class="mt-5">
            <v-card-text align="end">
                <v-btn color="success" @click="submit">Save Changes</v-btn>
            </v-card-text>
        </v-card>

        <loading-overlay :show="Api.Menu.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/store";
import { Menu } from "@/repositories";
import getActiveBrandName from "~/utils/getActiveBrandName";

@Component({
    layout: "panel",
})
export default class Menus extends Vue {
    Api = Api;

    tab = "";

    selectedColumn = "";

    getActiveBrandName = getActiveBrandName;

    Menu: any = {
        id: 2,
        // id: 4,
        title: "footer",
        widgets: {
            links: [
                {
                    url: "/legal-disclaimer",
                    name: "Legal Disclaimer",
                    target: "_self",
                },
                {
                    url: "/privacy-policy",
                    name: "Privacy Policy",
                    target: "_self",
                },
                {
                    url: "/recycling-information",
                    name: "Recycling Information",
                    target: "_self",
                },
                {
                    id: 5,
                    url: "https://app.cookiepro.com/app/#/webform/b861842b-f225-4fcc-afcc-2b5930c9c2a2",
                    name: "California Consumer Privacy Act Portal",
                    target: "_self",
                },
                {
                    id: 1,
                    url: "/",
                    name: "Terms Of Services",
                },
                {
                    id: 2,
                    url: "/",
                    name: "Privacy Policy",
                },
            ],
            columns: [
                [
                    {
                        url: null,
                        name: "Locate Us",
                    },
                    {
                        url: null,
                        name: "3 Birrel Avenue, Sabo. Yaba, Lagos State, Nigeria",
                    },
                ],
                [
                    {
                        url: null,
                        name: "Contact Us",
                    },
                ],
            ],
            // columns: [],
            socials: [
                {
                    url: "https://www.facebook.com/hisenseusa/",
                    name: "facebook",
                    target: "_self",
                },
                {
                    url: "https://twitter.com/hisense_usa",
                    name: "twitter",
                    target: "_self",
                },
                {
                    url: "https://www.instagram.com/hisense_usa/",
                    name: "instagram",
                    target: "_self",
                },
                {
                    url: "https://www.youtube.com/user/HisenseUSA",
                    name: "youtube",
                    target: "_self",
                },
                //  {   url: "https://www.facebook.com/test/",
                //     name: "facebook",
                // },
                // {
                //     url: "https://twitter.com/test",
                //     name: "twitter",
                // },
                // {
                //     url: "https://www.instagram.com/test/",
                //     name: "instagram",
                // },
                // {
                //     url: "https://www.youtube.com/user/test",
                //     name: "youtube",
                // },
                // ],
                // copyright: "Copyright © 2022 IMDigital, Inc.",
                // social_title:
                // "To follow our latest news, training\nwith the community,chat with us \nfind us on our networks!",
                // },
                // brand_id: 1,
                // };
            ],
        },
        brand_id: 3,
    };

    mounted() {
        this.fetchMenu();
    }

    // async mounted() {
    //     this.getFooter();
    // }

    // getFooter() {
    //     Api.Menu.getFooter().then((res: any) => {
    //         this.Menu.widgets = res.widgets;
    //     });
    // }

    async fetchMenu() {
        let widgets = ((await Api.Menu.getFooter()) as Menu).widgets as any;
        widgets.columns = widgets.columns.map((column: any) => {
            return column.find((i: any) => i.hasOwnProperty("header"))
                ? column.map((item: any) => {
                      return {
                          header: item.header.name
                              ? {
                                    title: item.header.name,
                                    value: item.header.url,
                                    target: item.header.target,
                                }
                              : item.header,
                          columns: item.columns,
                      };
                  })
                : [
                      {
                          header: {
                              name: "Header Title",
                              url: "/",
                              target: "_self",
                          },
                          columns: column,
                      },
                  ];
        });
        // this.Menu.widgets = widgets;
    }

    // addNewColumn() {
    //     this.Menu.widgets.columns.push([{ name: "Sample Item", url: "/" }]);
    // }

    addNewColumn(columns: any = null) {
        columns.push([
            {
                header: { name: "Header Title", url: "/", target: "_self" },
                columns: [],
            },
        ]);
    }

    addNewRowColumn(column: any = null) {
        column.push({
            header: { name: "Header Title", url: "/", target: "_self" },
            columns: [],
        });
    }

    deleteColumn(column: any, index: number) {
        column.splice(index, 1);
        // this.Menu.widgets.columns.splice(index, 1);
    }

    async submit() {
        await Api.Menu.update({ id: Number(this.Menu.id), Menu: this.Menu });
    }
}
</script>
<style scoped>
.optionBox {
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 13px;
}
</style>
