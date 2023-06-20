<template>
    <div>
        <img src="/blocks/CareersAccordion.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class CareersAccordion extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "List",
            newItem: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "Title of list",
                    value: "",
                },
                list: {
                    id: 1,
                    type: StructureType.List,
                    title: "sublist of list",
                    newItem: {
                        title: {
                            id: 0,
                            type: StructureType.String,
                            title: "Title of sublist",
                            value: "",
                        },
                        subtitle: {
                            id: 2,
                            type: StructureType.SimpleText,
                            title: "Description of sublist",
                            value: "",
                        },
                        link: {
                            id: 3,
                            type: StructureType.Url,
                            target: "_self",
                            title: "Link of sublist",
                            value: "",
                        },
                    },
                    value: [
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Title of sublist",
                                value: "",
                            },
                            subtitle: {
                                id: 2,
                                type: StructureType.SimpleText,
                                title: "Description of sublist",
                                value: "",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Link of sublist",
                                value: "",
                            },
                        },
                    ],
                },
            },
            value: [
                {
                    title: {
                        id: 0,
                        type: StructureType.String,
                        title: "Title of list",
                        value: "",
                    },
                    list: {
                        id: 1,
                        type: StructureType.List,
                        title: "sublist of list",
                        newItem: {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Title of sublist",
                                value: "",
                            },
                            subtitle: {
                                id: 2,
                                type: StructureType.SimpleText,
                                title: "Description of sublist",
                                value: "",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Link of sublist",
                                value: "",
                            },
                        },
                        value: [
                            {
                                title: {
                                    id: 0,
                                    type: StructureType.String,
                                    title: "Title of sublist",
                                    value: "",
                                },
                                subtitle: {
                                    id: 2,
                                    type: StructureType.SimpleText,
                                    title: "Description of sublist",
                                    value: "",
                                },
                                link: {
                                    id: 3,
                                    type: StructureType.Url,
                                    target: "_self",
                                    title: "Link of sublist",
                                    value: "",
                                },
                            },
                        ],
                    },
                },
            ],
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
