<template>
    <div>
        <img src="/blocks/LaserFinedWithImage.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class BlockLaserFinedWithImage extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

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
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: this.Theme.light },
                        { title: "Dark", value: this.Theme.dark },
                    ],
                },

                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Title",
                    value: "Find Your",
                },
                coloredTitle: {
                    id: 1,
                    type: StructureType.String,
                    title: "Colored Title",
                    value: "Laser TV",
                },

                description: {
                    id: 2,
                    type: StructureType.String,
                    title: "description",
                    value: "Rethink how you watch your favorite shows with Laser TV, bringing a new type of cinema experience to your home.",
                },
                linkTitle: {
                    id: 3,
                    type: StructureType.String,
                    title: "Link Title",
                    value: "SHOP LASER TVs",
                },
                linkUrl: {
                    id: 3,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Link URL",
                    value: "/",
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch("isEmpty")
    onValueChanged() {
        if (this.isEmpty) this.reset();
    }
}
</script>

<style type="text/css"></style>
