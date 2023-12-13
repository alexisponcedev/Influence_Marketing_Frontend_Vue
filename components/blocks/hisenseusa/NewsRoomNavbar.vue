<template>
    <div>
        <img src="/blocks/NewsRoomNavbar.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class NewsRoomNavbar extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title_link", {
            id: 0,
            type: StructureType.Url,
            title: "Title",
            value: "/",
            target:"_self"
        });
        blockAddItem(this.model, "year_text", {
            id: 1,
            type: StructureType.String,
            title: "Year",
            value: "",
        });
        blockAddItem(this.model, "product_category", {
            id: 2,
            type: StructureType.String,
            title: "Product Category",
            value: "",
        });
        blockAddItem(this.model, "newsroom_search", {
            id: 3,
            type: StructureType.String,
            title: "Search Newsroom",
            value: "",
        });
        blockAddItem(this.model, "target_route", {
            id: 4,
            type: StructureType.Url,
            title: "",
            value: "/",
            target:"_self"
        });
        this.model = { ...this.model };
    }

}
</script>
