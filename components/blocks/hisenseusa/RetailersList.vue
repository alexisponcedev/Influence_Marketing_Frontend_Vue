<template>
    <div>
        <img src="/blocks/RetailersList.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class RetailersList extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });

        blockAddItem(this.model, "list", {
            id: 2,
            type: StructureType.List,
            title: "Country List",
            newItem: {
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Country Title",
                    value: "",
                },
                list: {
                    id: 2,
                    type: StructureType.List,
                    title: "Retailer List",
                    newItem: {
                        title: {
                            id: 1,
                            type: StructureType.String,
                            title: "Title",
                            value: "",
                        },
                        subtitle: {
                            id: 2,
                            type: StructureType.SimpleText,
                            title: "Sub Title",
                            value: "",
                        },
                    },
                    value: [],
                },
            },
            value: [],
        });

        this.model = { ...this.model };
    }
}
</script>
