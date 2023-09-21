<template>
    <div>
        <img src="/blocks/CareersAccordion.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class CareersAccordion extends Vue {
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
            value: [],
        });

        this.model = { ...this.model };
    }
}
</script>
