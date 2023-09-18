<template>
    <div>
        <img src="/blocks/CareersAccordion.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class CareersAccordion extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        this.init();
    }

    init() {
        blockAddItem(this.model, "singleItem", {
            id: 0,
            type: StructureType.Select,
            title: "single sub-list item?",
            value: true,
            items: [
                { title: "Yes", value: true },
                { title: "No", value: false },
            ],
            onChanged: this.init,
        });

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
                    maxLength: !this.model.subList.value ? 1 : undefined,
                    newItem: {
                        title: {
                            id: 0,
                            type: StructureType.String,
                            title: "Title",
                            value: "",
                        },
                        subtitle: {
                            id: 2,
                            type: StructureType.SimpleText,
                            title: "Description",
                            value: "",
                        },
                        link: {
                            id: 3,
                            type: StructureType.Url,
                            target: "_self",
                            title: "Link",
                            value: "",
                        },
                    },
                    value: [],
                },
            },
            value: [],
        });
    }
}
</script>
