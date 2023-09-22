<template>
    <div>
        <img src="/blocks/SeasonUpgradeHeaderBanner.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class SeasonUpgradeHeaderBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "backgroundColor", {
            id: 2,
            type: StructureType.Color,
            title: "Background Color",
            value: "#000",
        });
        blockAddItem(this.model, "list", {
            id: 4,
            type: StructureType.List,
            title: "Image List",
            newItem: {
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "image",
                    src: "",
                    alt: "",
                },
            },
            value: [
                {
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "image",
                        src: "",
                        alt: "",
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
