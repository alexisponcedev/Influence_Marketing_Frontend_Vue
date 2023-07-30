<template>
    <div>
        <img src="/blocks/ProductsGridV2.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import getActiveBrand from "@/utils/getActiveBrand";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class ProductsGridV2 extends Vue {
    @VModel({ type: Object }) model!: any;

    categories: Array<any> = [];

    mounted() {
        this.getCategories();

        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.Text,
            title: "Title",
            value: "<h2>All Televisions</h2>",
        });

        blockAddItem(this.model, "category", {
            id: 0,
            type: StructureType.Select,
            title: "Select Category",
            value: this.categories.length > 0 ? this.categories[0].id : 0,
            itemText: "name",
            itemValue: "id",
            items: this.categories,
            onChanged: this.categoryChanged,
        });

        blockAddItem(this.model, "subcategory", {
            id: 1,
            type: StructureType.Select,
            title: "Select SubCategory",
            value: 0,
            itemText: "name",
            itemValue: "id",
            items: this.getSubCategories,
        });

        blockAddItem(this.model, "availabilityNumber", {
            id: 2,
            type: StructureType.Select,
            title: "Show availability number",
            value: false,
            items: [
                { title: "Show", value: true },
                { title: "Hide", value: false },
            ],
        });
    }

    getSubCategories() {
        return (
            [
                {
                    value: 0,
                    id: 0,
                    brand_id: 3,
                    name: "None",
                    parent_id: 0,
                    slug: "None",
                },
                ...this.selectedCategory?.subcategories,
            ] || [
                {
                    value: 0,
                    id: 0,
                    brand_id: 3,
                    name: "None",
                    parent_id: 0,
                    slug: "None",
                },
            ]
        );
    }

    async getCategories() {
        this.categories = (
            await this.$axios.$get(
                process.env.PIM_API_URL +
                    "/cms/getCategories?brand_id=" +
                    getActiveBrand()
            )
        ).data;
        this.model.category.items = this.categories;
    }

    get selectedCategory() {
        this.forceUpdateIndex;
        this.model.subcategory?.value;
        const finded = this.categories.filter(
            (category) => category.id == this.model.category.value
        );
        if (finded && finded.length) return finded[0];
    }

    forceUpdateIndex: number = 0;

    categoryChanged() {
        alert("be");
        this.forceUpdateIndex++;
        if (
            !this.selectedCategory?.subcategories
                .map((category: any) => category.id)
                .includes(this.model.subcategory.value)
        )
            this.model.subcategory.value = "";
        this.model.subcategory.items = this.selectedCategory?.subcategories;
        this.model.subcategory.forceUpdateIndex++;
    }
    @Watch("model.category", { deep: true })
    resetSubCategories() {
        this.model.subcategory.value = 0;
    }
}
</script>
