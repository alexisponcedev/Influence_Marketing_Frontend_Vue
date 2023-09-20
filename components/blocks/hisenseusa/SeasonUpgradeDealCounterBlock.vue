<template>
    <div>
        <img src="/blocks/SeasonUpgradeDealCounterBlock.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class SeasonUpgradeDealCounterBlock extends Vue {
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "Week List",
            newItem: {
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Title",
                    value: "",
                },
                end: {
                    id: 2,
                    type: StructureType.Datetime,
                    title: "End Time",
                    value: "",
                },
                product_title: {
                    id: 3,
                    type: StructureType.SimpleText,
                    title: "Product title",
                    value: "",
                },
                product_sale: {
                    id: 4,
                    type: StructureType.SimpleText,
                    title: "Product sale",
                    value: "",
                },
                price: {
                    id: 5,
                    type: StructureType.SimpleText,
                    title: "Price",
                    value: "",
                },
                old_price: {
                    id: 6,
                    type: StructureType.SimpleText,
                    title: "Old price",
                    value: "",
                },
                product_specs: {
                    id: 7,
                    type: StructureType.List,
                    title: "Product specs",
                    value: [
                        {
                            text: {
                                id: 0,
                                type: StructureType.SimpleText,
                                title: "Spec",
                                value: "",
                            },
                        },
                    ],
                    newItem: {
                        text: {
                            id: 0,
                            type: StructureType.SimpleText,
                            title: "Spec",
                            value: "",
                        },
                    },
                },
                button: {
                    id: 8,
                    type: StructureType.Url,
                    title: "Button",
                    value: "",
                },
                blackbox_text: {
                    id: 9,
                    type: StructureType.SimpleText,
                    title: "Black box text",
                    value: "",
                },
                product_image: {
                    id: 10,
                    type: StructureType.Image,
                    title: "Product Image",
                    alt: "",
                    src: "",
                },
                product_image_responsive: {
                    id: 11,
                    type: StructureType.Image,
                    title: "Product image responsive",
                    alt: "",
                    src: "",
                },
            },
            value: [
                {
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "Week 1",
                    },
                    end: {
                        id: 2,
                        type: StructureType.Datetime,
                        title: "End Time",
                        value: "",
                    },
                    product_title: {
                        id: 3,
                        type: StructureType.SimpleText,
                        title: "Product title",
                        value: "",
                    },
                    product_sale: {
                        id: 4,
                        type: StructureType.SimpleText,
                        title: "Product sale",
                        value: "",
                    },
                    price: {
                        id: 5,
                        type: StructureType.SimpleText,
                        title: "Price",
                        value: "",
                    },
                    old_price: {
                        id: 6,
                        type: StructureType.SimpleText,
                        title: "Old price",
                        value: "",
                    },
                    product_specs: {
                        id: 7,
                        type: StructureType.List,
                        title: "Product specs",
                        value: [
                            {
                                text: {
                                    id: 0,
                                    type: StructureType.SimpleText,
                                    title: "Spec",
                                    value: "",
                                },
                            },
                        ],
                        newItem: {
                            text: {
                                id: 0,
                                type: StructureType.SimpleText,
                                title: "Spec",
                                value: "",
                            },
                        },
                    },
                    button: {
                        id: 8,
                        type: StructureType.Url,
                        title: "Button",
                        value: "",
                    },
                    blackbox_text: {
                        id: 9,
                        type: StructureType.SimpleText,
                        title: "Black box text",
                        value: "",
                    },
                    product_image: {
                        id: 10,
                        type: StructureType.Image,
                        title: "Product Image",
                        alt: "",
                        src: "",
                    },
                    product_image_responsive: {
                        id: 11,
                        type: StructureType.Image,
                        title: "Product image responsive",
                        alt: "",
                        src: "",
                    },
                },
            ],
        });

        blockAddItem(this.model, "active", {
            id: 2,
            type: StructureType.Select,
            title: "Active Week",
            value: "",
            items: () =>
                this.model.list.value.map((item: any) => item.title.value),
        });

        this.model = { ...this.model };
    }
}
</script>
