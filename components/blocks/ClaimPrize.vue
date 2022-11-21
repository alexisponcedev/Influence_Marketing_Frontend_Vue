<template>
    <div>
        <img src="/blocks/ClaimPrize.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockClaimPrize extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: Object;

    Theme = Theme;

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
                title: {id: 1, type: StructureType.String, title: 'Title', value: 'HOW IT WORKS'},
                list: {
                    id: 2,
                    type: StructureType.List,
                    title: 'Items',
                    newItem: {
                        title: {
                            id: 0,
                            type: StructureType.String,
                            title: 'Title',
                            value: 'Buy an elgible 65-inch or larger Hisense Google TV'
                        },
                        linkTitle: {id: 1, type: StructureType.String, title: 'Link Title', value: ''},
                        linkUrl: {id: 2, type: StructureType.Url, title: 'Link URL', value: ''},
                    },
                    value: [
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Title',
                                value: 'Buy an elgible 65-inch or larger Hisense Google TV'
                            },
                            linkTitle: {id: 1, type: StructureType.String, title: 'Link Title', value: ''},
                            linkUrl: {id: 2, type: StructureType.Url, title: 'Link URL', value: ''},
                        },
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Title',
                                value: 'Register your TV within 14 days of purchase*'
                            },
                            linkTitle: {id: 1, type: StructureType.String, title: 'Link Title', value: 'Register Here'},
                            linkUrl: {id: 2, type: StructureType.Url, title: 'Link URL', value: '/'},
                        },
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Title',
                                value: 'Enjoy your TV risk-free for 100 days'
                            },
                            linkTitle: {id: 1, type: StructureType.String, title: 'Link Title', value: ''},
                            linkUrl: {id: 2, type: StructureType.Url, title: 'Link URL', value: ''},
                        },
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Title',
                                value: 'Claim your $100 giftcard within 100 days'
                            },
                            linkTitle: {id: 1, type: StructureType.String, title: 'Link Title', value: 'Claim Here'},
                            linkUrl: {id: 2, type: StructureType.Url, title: 'Link URL', value: '/'},
                        },

                    ]
                },
                text: {
                    id: 3,
                    type: StructureType.Text,
                    title: 'Footer Text',
                    value: '*Must register to be eligible for the 100 Day No Regrets Guarantee and $100 Lovin’ Hisense Reward. For full program details, visit: http://hisense-promos.com/noregrets'
                }
            }
            ;
    }

    mounted() {
        if (this.isEmpty) this.reset();
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
