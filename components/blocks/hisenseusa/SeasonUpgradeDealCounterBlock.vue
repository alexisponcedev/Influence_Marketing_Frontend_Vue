<template>
    <div>
        <img src="/blocks/SeasonUpgradeDealCounterBlock.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class SeasonUpgradeDealCounterBlock extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "list", {
            id: 4,
            type: StructureType.List,
            title: "Week List",
            newItem: {
                object: {
                    id: 1,
                    type: StructureType.Object,
                    title: "Week Item",
                    value: {
                        title: {
                            id: 1,
                            type: StructureType.String,
                            title: "Title",
                            value: "",
                        },
                        status: {
                            id: 2,
                            type: StructureType.Select,
                            title: "Status",
                            value: "deactive",
                            items: [
                                { title: "Deactive", value: "deactive" },
                                { title: "Active", value: "active" },
                            ],
                        },
                    },
                },
            },
            value: [
                {
                    object: {
                        id: 1,
                        type: StructureType.Object,
                        title: "Week Item",
                        value: {
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: "",
                            },
                            status: {
                                id: 2,
                                type: StructureType.Select,
                                title: "Status",
                                value: "deactive",
                                items: [
                                    { title: "Deactive", value: "deactive" },
                                    { title: "Active", value: "active" },
                                ],
                            },
                        },
                    },
                },
            ],
        });

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
