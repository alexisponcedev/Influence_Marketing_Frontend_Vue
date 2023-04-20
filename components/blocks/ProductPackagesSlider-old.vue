<template>
    <div>
        <img src="/blocks/ProductPackagesSlider.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class ProductPackagesSlider extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    mounted() {
        blockAddItem(this.model, "theme", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: this.Theme.light },
                { title: "Dark", value: this.Theme.dark },
            ],
        });
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.String,
            title: "Title",
            value: "Kitchen Appliance Packages",
        });
        blockAddItem(this.model, "list", {
            id: 2,
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
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Title",
                    value: "",
                },
                link: {
                    id: 2,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Link",
                    value: "/",
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
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "",
                    },
                    link: {
                        id: 2,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Link",
                        value: "/",
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
