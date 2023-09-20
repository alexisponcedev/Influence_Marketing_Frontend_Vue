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
                status: {
                    id: 3,
                    type: StructureType.Select,
                    title: "Status",
                    value: "deactive",
                    items: [
                        { title: "Deactive", value: "deactive" },
                        { title: "Active", value: "active" },
                    ],
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
                    status: {
                        id: 3,
                        type: StructureType.Select,
                        title: "Status",
                        value: "active",
                        items: [
                            { title: "Deactive", value: "deactive" },
                            { title: "Active", value: "active" },
                        ],
                    },
                },
            ],
        });

        this.model = { ...this.model };
    }
}
</script>
