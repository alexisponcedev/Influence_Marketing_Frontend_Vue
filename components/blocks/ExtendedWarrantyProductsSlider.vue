<template>
    <div>
        <img src="/blocks/ExtendedWarrantyProductsSlider.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import getActiveBrand from "~/utils/getActiveBrand";

@Component
export default class ExtendedWarrantyProductsSlider extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    categories: Array<any> = [];

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue,
                ...{
                    backgroundColor: {
                        id: 7,
                        type: StructureType.Color,
                        title: "Background color",
                        value: "#fff",
                    },
                },
            };
        } else
            this.model = {
                link: {
                    id: 1,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Link",
                    value: "",
                },
                list: {
                    id: 0,
                    type: StructureType.List,
                    title: "List",
                    newItem: {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                            alt: "Image Alt",
                        },
                        category: {
                            id: 3,
                            type: StructureType.Select,
                            title: "Select Category",
                            value:
                                this.categories.length > 0
                                    ? this.categories[0].id
                                    : 0,
                            itemText: "name",
                            itemValue: "id",
                            items: this.categories,
                        },
                    },
                    value: [
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Image",
                                src: "",
                                alt: "Image Alt",
                            },
                            category: {
                                id: 3,
                                type: StructureType.Select,
                                title: "Select Category",
                                value:
                                    this.categories.length > 0
                                        ? this.categories[0].id
                                        : 0,
                                itemText: "name",
                                itemValue: "id",
                                items: this.categories,
                            },
                        },
                    ],
                },
            };
    }

    async mounted() {
        this.categories = (
            await this.$axios.$get(
                process.env.PIM_API_URL +
                    "/cms/getCategories?brand_id=" +
                    getActiveBrand()
            )
        ).data;
        if (this.isEmpty) this.reset();
        else {
            this.model.list.value.forEach((item: any) => {
                if (item.category) item.category.items = this.categories;
            });
            if (this.model.list.newItem.category)
                this.model.list.newItem.category.items = this.categories;
        }
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    addItem(name: string, item: any) {
        if (!this.model.hasOwnProperty(name)) this.model[name] = item;
        this.model[name].id = item.id;

        if (this.model[name].type !== item.type)
            this.model[name].type = item.type;
        if (item.type === StructureType.Image) {
            this.model[name].src = "";
            this.model[name].alt = "Image Alt";
        }
        if (item.type === StructureType.List) {
            this.model[name].newItem = item.newItem;
        }
        if (item.type === StructureType.Select) {
            this.model[name].items = item.items;
        }
    }
}
</script>
