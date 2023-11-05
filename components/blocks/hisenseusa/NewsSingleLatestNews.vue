<template>
    <div>
        <img src="/blocks/NewsSingleLatestNews.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Api } from "@/store";

@Component
export default class NewsSingleLatestNews extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Api = Api;

    async mounted() {
        blockAddItem(this.model, "count", {
            id: 1,
            type: StructureType.String,
            title: "Count",
            value: 0,
        });

        blockAddItem(this.model, "selectby", {
            id: 2,
            type: StructureType.Select,
            title: "Select By",
            value: "rel",
            items: [
                { value: "rel", title: "Tag Related" },
                { value: "new", title: "Newest" },
            ],
        });

        blockAddItem(this.model, "title", {
            id: 3,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "link", {
            id: 4,
            type: StructureType.Url,
            target: "_self",
            title: "Link",
            value: "",
        });

        blockAddItem(this.model, "list", {
            hidden: true,
            id: 5,
            type: StructureType.List,
            title: "List",
            newItem: {},
            value: [],
        });

        this.model = { ...this.model };
    }
}
</script>
 
