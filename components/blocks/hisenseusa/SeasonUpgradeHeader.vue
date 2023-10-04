<template>
    <div>
        <img src="/blocks/SeasonUpgradeHeader.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class SeasonUpgradeHeader extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "image", {
            id: 0,
            type: StructureType.Image,
            title: "image",
            src: "",
            alt: "",
        });
        blockAddItem(this.model, "imageLink", {
            id: 1,
            type: StructureType.Url,
            title: "image Link",
            value: "",
        });
        blockAddItem(this.model, "title", {
            id: 2,
            type: StructureType.String,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 4,
            type: StructureType.List,
            title: "Links List",
            newItem: {
                link: {
                    id: 1,
                    type: StructureType.Url,
                    title: "link",
                    target: "_self",
                    value: "/",
                },
            },
            value: [
                {
                    link: {
                        id: 1,
                        type: StructureType.Url,
                        title: "link",
                        target: "_self",
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

<style type="text/css"></style>
