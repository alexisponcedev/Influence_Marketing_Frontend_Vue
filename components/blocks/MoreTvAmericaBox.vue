<template>
    <div>
        <img src="/blocks/MoreTvAmericaBox.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

enum ChartType {
    Pie = 'pie',
    Donut = 'donut',
    People = 'people'
}

@Component
export default class BlockMoreTvAmericaBox extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

    Theme = Theme;

    ChartType = ChartType;

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
                    title: 'Theme',
                    value: Theme.light,
                    items: [
                        {title: 'Light', value: this.Theme.light},
                        {title: 'Dark', value: this.Theme.dark},
                    ]
                },
                title: {
                    id: 2, type: StructureType.String, title: 'Title', value: 'Lets get real'
                },
                subtitle: {
                    id: 3,
                    type: StructureType.String,
                    title: 'little Title',
                    value: 'America wants less talk and more TV'
                },
                image: {
                    id: 4,
                    type: StructureType.Image,
                    title: "Main Image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                    alt: "Some note about this image",
                },
                list: {
                    id: 5,
                    type: StructureType.List,
                    title: 'Chart Items',
                    newItem: {
                        chart: {
                            id: 0,
                            title: 'Chart Type',
                            type: StructureType.Select,
                            value: ChartType.Donut,
                            items: [
                                {title: 'Pie', value: this.ChartType.Pie},
                                {title: 'Donut', value: this.ChartType.Donut},
                                {title: 'People', value: this.ChartType.People},
                            ]
                        },
                        percentage: {id: 1, type: StructureType.String, title: 'Percentage', value: "60"},
                        title: {id: 2, type: StructureType.String, title: 'Title', value: '60%'},
                        note: {
                            id: 3,
                            type: StructureType.String,
                            title: 'Note',
                            value: 'Think most advertising these days is nonsense'
                        },
                    },
                    value: [
                        {
                            chart: {
                                id: 0,
                                title: 'Chart Type',
                                type: StructureType.Select,
                                value: ChartType.Donut,
                                items: [
                                    {title: 'Pie', value: this.ChartType.Pie},
                                    {title: 'Donut', value: this.ChartType.Donut},
                                    {title: 'People', value: this.ChartType.People},
                                ]
                            },
                            percentage: {id: 1, type: StructureType.String, title: 'Percentage', value: "60"},
                            title: {id: 2, type: StructureType.String, title: 'Title', value: '60%'},
                            note: {
                                id: 3,
                                type: StructureType.String,
                                title: 'Note',
                                value: 'Think most advertising these days is nonsense'
                            },
                        },
                        {
                            chart: {
                                id: 0,
                                title: 'Chart Type',
                                type: StructureType.Select,
                                value: ChartType.Pie,
                                items: [
                                    {title: 'Pie', value: this.ChartType.Pie},
                                    {title: 'Donut', value: this.ChartType.Donut},
                                    {title: 'People', value: this.ChartType.People},
                                ]
                            },
                            percentage: {id: 1, type: StructureType.String, title: 'Percentage', value: "80"},
                            title: {id: 2, type: StructureType.String, title: 'Title', value: '8/10'},
                            note: {
                                id: 3,
                                type: StructureType.String,
                                title: 'Note',
                                value: 'Believe a brand should invest in products not pretentious artsy advertisement'
                            },
                        },
                        {
                            chart: {
                                id: 0,
                                title: 'Chart Type',
                                type: StructureType.Select,
                                value: ChartType.Pie,
                                items: [
                                    {title: 'Pie', value: this.ChartType.Pie},
                                    {title: 'Donut', value: this.ChartType.Donut},
                                    {title: 'People', value: this.ChartType.People},
                                ]
                            },
                            percentage: {id: 1, type: StructureType.String, title: 'Percentage', value: "4"},
                            title: {id: 2, type: StructureType.String, title: 'Title', value: '61% v 4%'},
                            note: {
                                id: 3,
                                type: StructureType.String,
                                title: 'Note',
                                value: 'People look for great value over a brand\'s "purpose" when purchasing a new TV'
                            },
                        },
                        {
                            chart: {
                                id: 0,
                                title: 'Chart Type',
                                type: StructureType.Select,
                                value: ChartType.People,
                                items: [
                                    {title: 'Pie', value: this.ChartType.Pie},
                                    {title: 'Donut', value: this.ChartType.Donut},
                                    {title: 'People', value: this.ChartType.People},
                                ]
                            },
                            percentage: {id: 1, type: StructureType.String, title: 'Percentage', value: "80"},
                            title: {id: 2, type: StructureType.String, title: 'Title', value: '80%'},
                            note: {
                                id: 3,
                                type: StructureType.String,
                                title: 'Note',
                                value: 'Think there\'s way too much advertising these days (sorry about that!)'
                            },
                        }
                    ]
                }

            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
        // this.loadProduct();
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
