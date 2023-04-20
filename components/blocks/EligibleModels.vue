<template>
    <div>
        <img src="/blocks/EligibleModels.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class EligibleModels extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue,
                ...{
                    backgroundColor: {
                        id: 7,
                        type: StructureType.Color,
                        title: "Background color",
                        value: "#fff",
                    },
                },
            };
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: this.Theme.light },
                        { title: "Dark", value: this.Theme.dark },
                    ],
                },
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Title",
                    value: "ELIGIBLE MODELS",
                },
                linkTitle: {
                    id: 2,
                    type: StructureType.String,
                    title: "Link Title",
                    value: "Hisense's Award-Winning 2022 Google TV Lineup",
                },
                linkUrl: {
                    id: 3,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Link Url",
                    value: "/100-day-guarantee/tv-line-up",
                },
                list: {
                    id: 4,
                    type: StructureType.List,
                    title: "Items",
                    newItem: {
                        title: {
                            id: 0,
                            type: StructureType.String,
                            title: "Link Title",
                            value: "Great",
                        },
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/0f234615ad/U6H-Reward_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.png-7njis4.png-toi77y.png",
                            alt: "Image Data",
                        },
                        grayText: {
                            id: 2,
                            type: StructureType.String,
                            title: "gray text",
                            value: "65-inch or larger",
                        },
                        series: {
                            id: 3,
                            type: StructureType.String,
                            title: "Series",
                            value: "U6H Series",
                        },
                        specs: {
                            id: 4,
                            type: StructureType.Text,
                            title: "Specs",
                            value: "<ul><li>4K Quantum Dot ULED Google TV</li><li>Up to 600 nits Peak Brightness</li><li>Dolby Vision™ Dolby Atmos®</li><li>HDR10 / HDR10+ / HLG</li><li>Voice Remote</li></ul>",
                        },
                        shopNow: {
                            id: 5,
                            type: StructureType.Url,
                            target: "_self",
                            title: "Shop Now",
                            value: "/",
                        },
                        learnMore: {
                            id: 6,
                            type: StructureType.Url,
                            target: "_self",
                            title: "Learn More",
                            value: "/",
                        },
                    },
                    value: [
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Link Title",
                                value: "Great",
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/0f234615ad/U6H-Reward_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.png-7njis4.png-toi77y.png",
                                alt: "Image Data",
                            },
                            grayText: {
                                id: 2,
                                type: StructureType.String,
                                title: "gray text",
                                value: "65-inch or larger",
                            },
                            series: {
                                id: 3,
                                type: StructureType.String,
                                title: "Series",
                                value: "U6H Series",
                            },
                            specs: {
                                id: 4,
                                type: StructureType.Text,
                                title: "Specs",
                                value: "<ul><li>4K Quantum Dot ULED Google TV</li><li>Up to 600 nits Peak Brightness</li><li>Dolby Vision™ Dolby Atmos®</li><li>HDR10 / HDR10+ / HLG</li><li>Voice Remote</li></ul>",
                            },
                            shopNow: {
                                id: 5,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now",
                                value: "/",
                            },
                            learnMore: {
                                id: 6,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Learn More",
                                value: "/",
                            },
                        },
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Link Title",
                                value: "Better",
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/31f2a5ee24/U7H-Reward_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.png-1gxdne.png-h140zt.png",
                                alt: "Image Data",
                            },
                            grayText: {
                                id: 2,
                                type: StructureType.String,
                                title: "gray text",
                                value: "65-inch or larger",
                            },
                            series: {
                                id: 3,
                                type: StructureType.String,
                                title: "Series",
                                value: "U7H Series",
                            },
                            specs: {
                                id: 4,
                                type: StructureType.Text,
                                title: "Specs",
                                value: "<ul><li>4K Quantum Dot ULED Google TV</li><li>120Hz Native Refresh</li><li>Up to 1000 nits Peak Brightness</li><li>Dolby Vision™ Dolby Atmos®</li><li>IMAX Enchanced|Filmmaker Mode</li><li>Voice Remote</li></ul>",
                            },
                            shopNow: {
                                id: 5,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now",
                                value: "/",
                            },
                            learnMore: {
                                id: 6,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Learn More",
                                value: "/",
                            },
                        },
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Link Title",
                                value: "Best",
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/9e0768d5c1/U8H-Reward_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.png-hoxdq5.png-384ex.png",
                                alt: "Image Data",
                            },
                            grayText: {
                                id: 2,
                                type: StructureType.String,
                                title: "gray text",
                                value: "65-inch or larger",
                            },
                            series: {
                                id: 3,
                                type: StructureType.String,
                                title: "Series",
                                value: "U8H Series",
                            },
                            specs: {
                                id: 4,
                                type: StructureType.Text,
                                title: "Specs",
                                value: "<ul><li>MINI-LED</li><li>4K Quantum Dot Google TV</li><li>120Hz Native Refresh</li><li>Up to 1500 nits Peak Brightness</li><li>Dolby Vision™ Dolby Atmos®</li><li>IMAX Enchanced|Filmmaker Mode</li><li>Voice Remote</li></ul>",
                            },
                            shopNow: {
                                id: 5,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now",
                                value: "/",
                            },
                            learnMore: {
                                id: 6,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Learn More",
                                value: "/",
                            },
                        },
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Link Title",
                                value: "",
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/b187549d55/A6H-Reward_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.png-oum77p.png-2cyj4x.png",
                                alt: "Image Data",
                            },
                            grayText: {
                                id: 2,
                                type: StructureType.String,
                                title: "gray text",
                                value: "65-inch or larger",
                            },
                            series: {
                                id: 3,
                                type: StructureType.String,
                                title: "Series",
                                value: "A6H Series",
                            },
                            specs: {
                                id: 4,
                                type: StructureType.Text,
                                title: "Specs",
                                value: "<ul><li>4K Ultra HD</li><li>Google TV</li><li>60Hz Native Refresh</li><li>DTS VirtualX</li><li>Voice Remote</li></ul>",
                            },
                            shopNow: {
                                id: 5,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now",
                                value: "/",
                            },
                            learnMore: {
                                id: 6,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Learn More",
                                value: "/",
                            },
                        },
                    ],
                },
                link: {
                    id: 5,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Shop All Eligable Models",
                    value: "/",
                },
                text: {
                    id: 6,
                    type: StructureType.Text,
                    title: "Text",
                    value: '<p class="ql-align-center">Offer valid from September 1st - October 31st.</p><p class="ql-align-center"><span style="background-color: rgb(255, 255, 255); color: rgb(34, 2, 55);">For full program details, visit:&nbsp;</span><a href="https://public.hisenseportal.com/Day100#" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(136, 90, 164);">http://hisense-promos.com/noregrets</a></p>',
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch("isEmpty")
    onValueChanged() {
        if (this.isEmpty) this.reset();
    }
}
</script>
