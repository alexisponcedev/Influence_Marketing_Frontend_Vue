<template>
    <div>
        <img src="/blocks/MoreTVNewItemsBox.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockMoreTVNewItemsBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        {title: "Light", value: this.Theme.light},
                        {title: "Dark", value: this.Theme.dark},
                    ],
                },
                title: {id: 1, type: StructureType.String, title: "Top Title", value: "All New U Series"},
                list: {
                    id: 2,
                    type: StructureType.List,
                    title: "Items",
                    newItem: {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                            alt: "MoreTv Box item",
                        },
                        model: {
                            id: 1,
                            type: StructureType.String,
                            title: "Model",
                            value: "U6HF",
                        },
                        title: {
                            id: 1,
                            type: StructureType.String,
                            title: "Title",
                            value: "Great for Entertainment",
                        },
                        description: {
                            id: 3,
                            type: StructureType.Text,
                            title: "Description",
                            value: "Amazon Fire TV\n" +
                                "50\"\n" +
                                "Quantum Dot Color\n" +
                                "Dolby Vision HDR and HDR10\n" +
                                "Full Array backlight\n" +
                                "600 nits peak brightness\n" +
                                "Dolby Atmos Audio\n" +
                                "Game Mode Plus (60Hz)\n" +
                                "Voice remote",
                        },
                        helperNote: {id: 4, type: StructureType.String, title: 'Helper Note', value: ''},
                        redNotice: {id: 5, type: StructureType.String, title: 'Red Notice', value: ''},
                        link: {
                            id: 6,
                            type: StructureType.Url,
                            title: "Learn More",
                            value: "/",
                        },
                        buyNow: {
                            id: 7,
                            type: StructureType.String,
                            title: "Buy Now",
                            value: "/",
                        },
                    },
                    value: [
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "MoreTv Box item",
                            },
                            model: {
                                id: 1,
                                type: StructureType.String,
                                title: "Model",
                                value: "U6HF",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: "Great for Entertainment",
                            },
                            description: {
                                id: 3,
                                type: StructureType.Text,
                                title: "Description",
                                value: "Amazon Fire TV\n" +
                                    "50\"\n" +
                                    "Quantum Dot Color\n" +
                                    "Dolby Vision HDR and HDR10\n" +
                                    "Full Array backlight\n" +
                                    "600 nits peak brightness\n" +
                                    "Dolby Atmos Audio\n" +
                                    "Game Mode Plus (60Hz)\n" +
                                    "Voice remote",
                            },
                            helperNote: {id: 4, type: StructureType.String, title: 'Helper Note', value: ''},
                            redNotice: {id: 5, type: StructureType.String, title: 'Red Notice', value: ''},
                            link: {
                                id: 6,
                                type: StructureType.Url,
                                title: "Learn More",
                                value: "/",
                            },
                            buyNow: {
                                id: 7,
                                type: StructureType.String,
                                title: "Buy Now",
                                value: "/",
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "MoreTv Box item",
                            },
                            model: {
                                id: 1,
                                type: StructureType.String,
                                title: "Model",
                                value: "U6H",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: "Great for Everyone",
                            },
                            description: {
                                id: 3,
                                type: StructureType.Text,
                                title: "Description",
                                value: "Google TV\n" +
                                    "50\" | 55\" | 65\" | 75\"\n" +
                                    "Quantum Dot Color\n" +
                                    "Dolby Vision HDR and HDR10\n" +
                                    "Full Array backlight\n" +
                                    "600 nits peak brightness\n" +
                                    "Dolby Atmos Audio\n" +
                                    "Game Mode Plus (60Hz)\n" +
                                    "Voice remote",
                            },
                            helperNote: {id: 4, type: StructureType.String, title: 'Helper Note', value: ''},
                            redNotice: {id: 5, type: StructureType.String, title: 'Red Notice', value: ''},
                            link: {
                                id: 6,
                                type: StructureType.Url,
                                title: "Learn More",
                                value: "/",
                            },
                            buyNow: {
                                id: 7,
                                type: StructureType.String,
                                title: "Buy Now",
                                value: "/",
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "MoreTv Box item",
                            },
                            model: {
                                id: 1,
                                type: StructureType.String,
                                title: "Model",
                                value: "U7H",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: "Great for Gamers",
                            },
                            description: {
                                id: 3,
                                type: StructureType.Text,
                                title: "Description",
                                value: "Google TV\n" +
                                    "55\" | 65\" | 75\" | 85\"\n" +
                                    "Quantum Dot Color\n" +
                                    "Dolby Vision HDR and HDR10\n" +
                                    "Full Array backlight\n" +
                                    "1,000 nits peak brightness\n" +
                                    "Dolby Atmos Audio\n" +
                                    "Game Mode Pro (120Hz)\n" +
                                    "Voice remote",
                            },
                            helperNote: {id: 4, type: StructureType.String, title: 'Helper Note', value: ''},
                            redNotice: {
                                id: 5,
                                type: StructureType.String,
                                title: 'Red Notice',
                                value: 'Coming Late July'
                            },
                            link: {
                                id: 6,
                                type: StructureType.Url,
                                title: "Learn More",
                                value: "/",
                            },
                            buyNow: {
                                id: 7,
                                type: StructureType.String,
                                title: "Buy Now",
                                value: "/",
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "MoreTv Box item",
                            },
                            model: {
                                id: 1,
                                type: StructureType.String,
                                title: "Model",
                                value: "U8H",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: "Great for Everything",
                            },
                            description: {
                                id: 3,
                                type: StructureType.Text,
                                title: "Description",
                                value: "Google TV\n" +
                                    "55\" | 65\" | 75\"\n" +
                                    "Quantum Dot Color\n" +
                                    "Dolby Vision HDR and HDR10\n" +
                                    "Mini-LED backlight\n" +
                                    "1,500 nits peak brightness\n" +
                                    "Dolby Atmos Audio\n" +
                                    "Game Mode Pro (120Hz)\n" +
                                    "Voice remote\n" +
                                    "Wifi 6e* \n"
                            },
                            helperNote: {
                                id: 4,
                                type: StructureType.String,
                                title: 'Helper Note',
                                value: '*WiFi 6e compatible router required'
                            },
                            redNotice: {
                                id: 5,
                                type: StructureType.String,
                                title: 'Red Notice',
                                value: 'Coming Late July'
                            },
                            link: {
                                id: 6,
                                type: StructureType.Url,
                                title: "Learn More",
                                value: "/",
                            },
                            buyNow: {
                                id: 7,
                                type: StructureType.String,
                                title: "Buy Now",
                                value: "/",
                            },
                        },
                    ],
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
        // this.loadProduct();
    }

    loadProduct() {
        // this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/' + this.product_id )
        this.$axios
            .$get("https://impim.dev-api.hisenseportal.com/api/cms/getProduct/781")
            .then((res) => {
                this.product = res.data;
            })
            .finally(() => {
                this.loadingProduct = false;
            });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch('isEmpty')
    onValueChanged() {

        if (this.isEmpty) this.reset();
    }
}
</script>

<style type="text/css">

</style>
