<template>
    <v-container fluid>

        <v-tabs show-arrows v-model="tab" background-color="transparent">
            <v-tab href="#centerOptions">Center Options</v-tab>
            <v-tab href="#rightOptions">Right Options</v-tab>
            <v-tab href="#hamburger">Hamburger Menu</v-tab>

        </v-tabs>

        <v-card>
            <v-tabs-items v-model="tab">
                <v-tab-item value="hamburger">
                    <v-card-text>
                        <h6>Hamburger Menu Items</h6>
                        <menu-items v-model="Menu.widgets.hamburger"/>
                    </v-card-text>
                </v-tab-item>
                <v-tab-item value="centerOptions">
                    <v-card-text>
                        <h6>Center Options</h6>
                        <div class="tw-space-y-3">
                            <draggable v-model="Menu.widgets.centerOption" group="options" class="tw-space-y-3">
                                <menu-option v-for="(option, index) in Menu.widgets.centerOption"
                                             :key="`center_option_${index}`" :value="option" @input="v => option = v"
                                             @deleteOption="deleteOption(Menu.widgets.centerOption, index)"/>
                            </draggable>
                            <button @click="addNewOption(Menu.widgets.centerOption)"
                                    class="tw-border tw-border-dashed tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3 tw-bg-green-50 hover:tw-bg-green-200 tw-w-full">
                                Add New Option
                            </button>
                        </div>


                    </v-card-text>
                </v-tab-item>
                <v-tab-item value="rightOptions">
                    <v-card-text>
                        <h6>Right Options</h6>
                        <div class="tw-space-y-3">
                            <draggable v-model="Menu.widgets.rightOption" group="options" class="tw-space-y-3">
                                <menu-option v-for="(option, index) in Menu.widgets.rightOption"
                                             :key="`center_option_${index}`" :value="option" @input="v => option = v"
                                             @deleteOption="deleteOption(Menu.widgets.rightOption, index)"/>
                            </draggable>
                            <button @click="addNewOption(Menu.widgets.rightOption)"
                                    class="tw-border tw-border-dashed tw-border-gray-200 tw-rounded-xl tw-text-center tw-p-3 tw-bg-green-50 hover:tw-bg-green-200 tw-w-full">
                                Add New Option
                            </button>
                        </div>
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

    tab = "centerOptions";

    Menu: any = {
        id: 1,
        title: 'header',
        widgets: {
            hamburger: [
                {id: 0, name: 'Company', url: '/'},
                {id: 1, name: 'Commercial', url: '/'},
                {id: 2, name: 'Support', url: '/'},
                {id: 3, name: 'Register', url: '/'},
                {id: 4, name: 'Contact', url: '/'},
            ],
            centerOption: [
                {
                    name: 'TV + Audio',
                    url: '/',
                    static: false,
                    columns: [
                        [
                            {name: 'TELEVISIONS', url: '/'},
                            {name: 'LASER TV', url: '/'},
                            {name: '4K ULED', url: '/'},
                            {name: '4K UHD', url: '/'},
                            {name: 'SMART TV PLATFORMS', url: '/'},
                            {name: 'ALL TVs', url: '/'},
                        ],
                        [
                            {name: 'HOME AUDIO', url: '/'},
                            {name: '2.0 CH SOUNDBARS', url: '/'},
                            {name: '2.1 CH SOUNDBARS', url: '/'},
                            {name: '3.1 CH SOUNDBARS', url: '/'},
                            {name: 'ALL HOME AUDIO', url: '/'},
                        ]
                    ],
                    products: [
                        {
                            name: 'Product Name 1',
                            url: '/',
                            image: 'https://imdam.api.stage.imdigital.ca/api/v1/assets/GalleryImages/Product/436/ccc5d70642/u6h__ScaleMaxWidthWzY0MF0.png'
                        },
                        {
                            name: 'Product Name 2',
                            url: '/',
                            image: 'https://imdam.api.stage.imdigital.ca/api/v1/assets/GalleryImages/Product/448/f5c88a7895/u8h__ScaleMaxWidthWzY0MF0.png'
                        },
                    ]
                },
                {
                    name: 'APPLIANCES',
                    url: '/',
                    static: false,
                    columns: [
                        [
                            {name: 'EXPLORE HOME APPLIANCES', url: '/'},
                            {name: 'DISHWASHERS', url: '/'},
                            {name: 'BEVERAGE + WINE COOLERS', url: '/'},
                            {name: 'REFRIGERATORS', url: '/'},
                        ],
                    ],
                    products: [
                        {
                            name: 'Product Name 1',
                            url: '/',
                            image: 'https://imdam.api.stage.imdigital.ca/api/v1/assets/GalleryImages/Product/274/e4489e1ec0/Front-min__ScaleMaxWidthWzY0MF0.png'
                        },
                        {
                            name: 'Product Name 2',
                            url: '/',
                            image: 'https://imdam.api.stage.imdigital.ca/api/v1/assets/GalleryImages/Product/471/596d3db992/micro-closed_ScaleMaxHeightWzc1MF0__ScaleMaxWidthWzY0MF0.png'
                        },
                        {
                            name: 'Product Name 3',
                            url: '/',
                            image: 'https://imdam.api.stage.imdigital.ca/api/v1/assets/GalleryImages/Product/158/7051a421d1/Carousel-5-min__ScaleMaxWidthWzY0MF0.png'
                        },
                    ]
                },
                {
                    name: 'AIR PRODUCTS',
                    url: '/',
                    static: false,
                    columns: [
                        [
                            {name: 'EXPLORE AIR PRODUCTS', url: '/'},
                            {name: 'WINDOW AC', url: '/'},
                            {name: 'PORTABLE AC', url: '/'},
                            {name: 'DEHUMIDIFIERS', url: '/'},
                            {name: 'AIR PURIFIER', url: '/'},
                            {name: 'ALL AIR PRODUCTS', url: '/'},
                        ],
                    ],
                    products: [
                        {
                            name: 'Product Name 1',
                            url: '/',
                            image: 'https://imdam.api.stage.imdigital.ca/api/v1/assets/GalleryImages/Product/397/761648fb97/AW0822CW1W-front__ScaleMaxWidthWzY0MF0.png'
                        },
                        {
                            name: 'Product Name 2',
                            url: '/',
                            image: 'https://imdam.api.stage.imdigital.ca/api/v1/assets/GalleryImages/Product/400/386becd4f1/DH5022K1W-front__ScaleMaxWidthWzY0MF0.png'
                        },
                        {
                            name: 'Product Name 3',
                            url: '/',
                            image: 'https://imdam.api.stage.imdigital.ca/api/v1/assets/GalleryImages/Product/396/2d8dfdfe04/1-front-AP1022TW1GD-1__ScaleMaxWidthWzY0MF0.png'
                        },
                    ]
                },
            ],
            rightOption: [
                {
                    name: 'Commercial',
                    url: '/',
                    static: false,
                    columns: [
                        [
                            {name: 'Commercial Displays', url: '/'},
                            {name: 'Commercial Refrigerators', url: '/'},
                        ],
                    ],
                    products: [
                        {
                            name: 'Product Name 1',
                            url: '/',
                            image: 'https://imdam.api.stage.imdigital.ca/api/v1/assets/PageMenuImage/169/f982c6d16b/Hisense-Commercial-header-menu_-Recovered__ScaleMaxWidthWzY0MF0.png'
                        },
                    ]
                },
            ]
        }
    };

    async mounted() {
        // this.getHeader();
    }

    getHeader() {
        Api.Menu.getHeader()
            .then((res: any) => {
            this.Menu.widgets = res.widgets
        })

    }

    addNewOption(list: any) {
        list.push({
            name: 'New Option Title',
            url: '/',
            static: false,
            columns: [
                [
                    {name: 'Sample Item', url: '/'},
                ],
            ],
            products: [
                {
                    name: 'Product Name 1',
                    url: '/',
                    image: 'https://imdam.api.stage.imdigital.ca/api/v1/assets/GalleryImages/Product/436/ccc5d70642/u6h__ScaleMaxWidthWzY0MF0.png'
                },
            ]
        },)
    }

    deleteOption(list: any, index: number) {
        list.splice(index, 1);
    }

    async submit() {
        await Api.Menu.update({id: Number(this.Menu.id), Menu: this.Menu})
    }

}
</script>
