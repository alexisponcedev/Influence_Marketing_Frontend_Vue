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
                        <menu-items v-model="Menu.widgets.hamburger" />
                    </v-card-text>
                </v-tab-item>
                <v-tab-item value="centerOptions">
                    <v-card-text>
                        <h6>Center Options</h6>
                        <div class="tw-space-y-3">
                            <draggable v-model="Menu.widgets.centerOption" group="options" class="tw-space-y-3">
                                <menu-option v-for="(option, index) in Menu.widgets.centerOption"
                                    :key="`center_option_${index}`" :value="option" @input="v => option = v"
                                    @deleteOption="deleteOption(Menu.widgets.centerOption, index)" />
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
                                    @deleteOption="deleteOption(Menu.widgets.rightOption, index)" />
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

        <loading-overlay :show="Api.Menu.loading" />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Api } from "@/store";
import { Menu } from "~/repositories";


@Component({
    layout: "panel"
})
export default class Menus extends Vue {
    Api = Api;

    tab = "centerOptions";

    Menu: any = {
        "id": 1,
        "title": "header",
        "widgets": {
            "hamburger": [

            ],
            "rightOption": [
                {
                    "url": "/commercial-air",
                    "name": "Commercial",
                    "static": false,
                    "columns": [
                        [
                            {
                                "url": "http://www.hisense-b2b.com/",
                                "name": "Commercial Displays"
                            },
                            {
                                "url": "/commercial",
                                "name": "Commercial Refrigerators"
                            },
                            {
                                "id": 3,
                                "url": "/commercial-air",
                                "name": "Commercial HVAC"
                            }
                        ]
                    ],
                    "products": [
                        {
                            "url": "/",
                            "name": "Product Name 1",
                            "image": "https://assets.hisense-usa.com/assets/PageMenuImage/169/f982c6d16b/Hisense-Commercial-header-menu_-Recovered__ScaleMaxWidthWzY0MF0.png"
                        }
                    ]
                },
                {
                    "url": "/support",
                    "name": "Support",
                    "static": false,
                    "columns": [
                        [
                            {
                                "id": 0,
                                "url": "/support/register",
                                "name": "Register Product"
                            },
                            {
                                "id": 3,
                                "url": "/extended-service-plan",
                                "name": "Extended Warranty"
                            },
                            {
                                "id": 2,
                                "url": "/contact",
                                "name": "Contact Us"
                            },
                            {
                                "id": 4,
                                "url": "/support/firmware-download",
                                "name": "Firmware Download"
                            }
                        ]
                    ],
                    "products": [

                    ]
                },
                {
                    "url": "/company",
                    "name": "Company",
                    "static": false,
                    "columns": [
                        [
                            {
                                "url": "/authorized-retailers",
                                "name": "Authorized Retailers"
                            },
                            {
                                "id": 2,
                                "url": "/careers",
                                "name": "Careers"
                            },
                            {
                                "id": 3,
                                "url": "/compliance",
                                "name": "Compliance"
                            }
                        ]
                    ],
                    "products": [

                    ]
                }
            ],
            "centerOption": [
                {
                    "url": "/televisions",
                    "name": "TELEVISIONS",
                    "static": false,
                    "columns": [
                        [
                            {
                                "url": "/televisions",
                                "name": "TELEVISIONS"
                            },
                            {
                                "url": "/televisions/laser-tv",
                                "name": "LASER TV"
                            },
                            {
                                "url": "/televisions/4k-uled",
                                "name": "4K ULED"
                            },
                            {
                                "url": "/televisions/4k-uhd",
                                "name": "4K UHD"
                            },
                            {
                                "url": "/televisions/smart-tv-platforms",
                                "name": "SMART TV PLATFORMS"
                            },
                            {
                                "url": "/televisions/all-tvs",
                                "name": "ALL TVs"
                            }
                        ]
                    ],
                    "products": [
                        {
                            "url": "/televisions/55u6h-hisense-55-inch-u6h-series-quantum-uled-4k-smart-google-tv-2022",
                            "name": "Product Name 1",
                            "image": "https://assets.hisense-usa.com/assets/GalleryImages/Product/436/ccc5d70642/u6h__ScaleMaxWidthWzY0MF0.png"
                        },
                        {
                            "url": "/televisions/55u8h-hisense-55-mini-led-uled-4k-smart-google-tv-2022",
                            "name": "Product Name 2",
                            "image": "https://assets.hisense-usa.com/assets/GalleryImages/Product/448/f5c88a7895/u8h__ScaleMaxWidthWzY0MF0.png"
                        }
                    ]
                },
                {
                    "url": "/audio",
                    "name": "AUDIO",
                    "static": false,
                    "columns": [
                        [
                            {
                                "url": "/audio/home-audio",
                                "name": "HOME AUDIO"
                            },
                            {
                                "id": 2,
                                "url": "/audio/home-audio?filter=%255B%257B%2522id%2522%253A1033%252C%2522type%2522%253A%2522PROPERTY%2522%252C%2522values%2522%253A%255B%25222.0%2520CH%2522%255D%257D%255D",
                                "name": "2.0 CH SOUNDBARS"
                            },
                            {
                                "id": 3,
                                "url": "/audio/home-audio?filter=%255B%257B%2522id%2522%253A1033%252C%2522type%2522%253A%2522PROPERTY%2522%252C%2522values%2522%253A%255B%25222.1%2520CH%2522%255D%257D%255D",
                                "name": "2.1 CH SOUNDBARS"
                            },
                            {
                                "id": 4,
                                "url": "/audio/home-audio?filter=%255B%257B%2522id%2522%253A1033%252C%2522type%2522%253A%2522PROPERTY%2522%252C%2522values%2522%253A%255B%25223.1%2520CH%2522%255D%257D%255D",
                                "name": "3.1 CH SOUNDBARS"
                            },
                            {
                                "id": 6,
                                "url": "/audio/home-audio?filter=%255B%257B%2522id%2522%253A1033%252C%2522type%2522%253A%2522PROPERTY%2522%252C%2522values%2522%253A%255B%25225.1%2520CH%2522%255D%257D%255D",
                                "name": "5.1 CH SOUNDBARS"
                            },
                            {
                                "id": 7,
                                "url": "/audio/home-audio?filter=%255B%257B%2522id%2522%253A1033%252C%2522type%2522%253A%2522PROPERTY%2522%252C%2522values%2522%253A%255B%25227.1%2520CH%2522%255D%257D%255D",
                                "name": "7.1 CH SOUNDBARS"
                            },
                            {
                                "id": 5,
                                "url": "/audio/home-audio",
                                "name": "ALL HOME AUDIO"
                            }
                        ]
                    ],
                    "products": [
                        {
                            "url": "/audio/hs205-hisense-hs205-2-0-channel-soundbar",
                            "name": "Hisense HS205 2.0 Channel Soundbar",
                            "image": "https://assets.hisense-usa.com/assets/GalleryImages/Product/239/a580528d99/HS205-1-min__ScaleMaxHeightWzc1MF0.png"
                        },
                        {
                            "url": "/audio/hs312-hisense-hs312-3-1-ch-soundbar-with-wireless-subwoofer",
                            "name": "Hisense HS312 3.1 Ch Soundbar with wireless subwoofer",
                            "image": "https://assets.hisense-usa.com/assets/GalleryImages/Product/368/3367a12b32/HS312_Front__ScaleMaxHeightWzc1MF0.png"
                        }
                    ]
                },
                {
                    "url": "/home-appliance",
                    "name": "APPLIANCES",
                    "static": false,
                    "columns": [
                        [
                            {
                                "url": "/home-appliance",
                                "name": "EXPLORE HOME APPLIANCES"
                            },
                            {
                                "id": 7,
                                "url": "/home-appliance/kitchen-suites",
                                "name": "KITCHEN SUITE"
                            },
                            {
                                "url": "/home-appliance/refrigerators/all-refrigerators",
                                "name": "REFRIGERATORS"
                            },
                            {
                                "id": 6,
                                "url": "/home-appliance/electric-range",
                                "name": "RANGES"
                            },
                            {
                                "url": "/home-appliance/dishwashers/all-dishwashers",
                                "name": "DISHWASHERS"
                            },
                            {
                                "id": 5,
                                "url": "/home-appliance/microwave-ovens/all-microwave-ovens",
                                "name": "MICROWAVE OVENS"
                            }
                        ]
                    ],
                    "products": [
                        {
                            "url": "/home-appliance/refrigerators/hwd46029ss-46-bottle-freestanding-or-built-in-stainless-steel-wine-cooler",
                            "name": "Product Name 1",
                            "image": "https://assets.hisense-usa.com/assets/GalleryImages/Product/274/e4489e1ec0/Front-min__ScaleMaxWidthWzY0MF0.png"
                        },
                        {
                            "url": "/home-appliance/microwave-ovens/hmvz173ss-1-7-cu-ft-over-the-range-microwave",
                            "name": "Product Name 2",
                            "image": "https://assets.hisense-usa.com/assets/GalleryImages/Product/471/596d3db992/micro-closed_ScaleMaxHeightWzc1MF0__ScaleMaxWidthWzY0MF0.png"
                        },
                        {
                            "url": "/home-appliance/refrigerators/hrf254n6dse-hisense-25-4-cu-ft-french-door-refrigrator-with-dual-ice-maker-energy-star",
                            "name": "Product Name 3",
                            "image": "https://assets.hisense-usa.com/assets/GalleryImages/Product/158/7051a421d1/Carousel-5-min__ScaleMaxWidthWzY0MF0.png"
                        }
                    ]
                },
                {
                    "url": "/air-products",
                    "name": "AIR PRODUCTS",
                    "static": false,
                    "columns": [
                        [
                            {
                                "url": "/air-products",
                                "name": "EXPLORE AIR PRODUCTS"
                            },
                            {
                                "url": "/air-products/all-air-products?filter=%5B%7B%22id%22%3A15%2C%22type%22%3A%22CF%22%2C%22values%22%3A%5B%22Window%20Air%20Conditioner%22%5D%7D%5D",
                                "name": "WINDOW AC"
                            },
                            {
                                "url": "/air-products/all-air-products?filter=%5B%7B\"id\"%3A15%2C\"type\"%3A\"CF\"%2C\"values\"%3A%5B\"Portable%20Air%20Conditioner\"%5D%7D%5D",
                                "name": "PORTABLE AC"
                            },
                            {
                                "url": "/air-products/all-air-products?filter=%5B%7B%22id%22%3A15%2C%22type%22%3A%22CF%22%2C%22values%22%3A%5B%22Dehumidifier%22%5D%7D%5D",
                                "name": "DEHUMIDIFIERS"
                            },
                            {
                                "url": "/air-products/all-air-products",
                                "name": "ALL AIR PRODUCTS"
                            }
                        ]
                    ],
                    "products": [
                        {
                            "url": "/air-products/aw0822cw1w-hisense-8000-btu-window-ac-wifi",
                            "name": "Product Name 1",
                            "image": "https://assets.hisense-usa.com/assets/GalleryImages/Product/397/761648fb97/AW0822CW1W-front__ScaleMaxWidthWzY0MF0.png"
                        },
                        {
                            "url": "/air-products/dh5022k1w-hisense-35-pint-2-speed-dehumidifier-energy-star",
                            "name": "Product Name 2",
                            "image": "https://assets.hisense-usa.com/assets/GalleryImages/Product/400/386becd4f1/DH5022K1W-front__ScaleMaxWidthWzY0MF0.png"
                        },
                        {
                            "url": "/air-products/ap1022tw1gd-hisense-550-sf-dual-hose-inverter-portable-ac",
                            "name": "Product Name 3",
                            "image": "https://assets.hisense-usa.com/assets/GalleryImages/Product/396/2d8dfdfe04/1-front-AP1022TW1GD-1__ScaleMaxWidthWzY0MF0.png"
                        }
                    ]
                }
            ]
        },
        "brand_id": 3
    };

    mounted() {
        // this.fetchMenu();
    }

    async fetchMenu(){
        this.Menu.widgets = ((await Api.Menu.getHeader()) as Menu).widgets
    }

    addNewOption(list: any) {
        list.push({
            name: 'New Option Title',
            url: '/',
            static: false,
            columns: [
                [
                    { name: 'Sample Item', url: '/' },
                ],
            ],
            products: [
                {
                    name: 'Product Name 1',
                    url: '/',
                    image: 'https://assets.hisense-usa.com/assets/GalleryImages/Product/436/ccc5d70642/u6h__ScaleMaxWidthWzY0MF0.png'
                },
            ]
        },)
    }

    deleteOption(list: any, index: number) {
        list.splice(index, 1);
    }

    async submit() {
        await Api.Menu.update({ id: Number(this.Menu.id), Menu: this.Menu })
    }

}
</script>
