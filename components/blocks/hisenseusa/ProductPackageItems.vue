<template>
    <div>
        <img src="/blocks/EligibleModels.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class EligibleModels extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.String,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "list",
            newItem: {
                label: {
                    id: 0,
                    type: StructureType.String,
                    title: "Label",
                    value: "",
                },
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "",
                },
                title: {
                    id: 2,
                    type: StructureType.String,
                    title: "Title",
                    value: "Test Title",
                },
                greyText: {
                    id: 3,
                    type: StructureType.String,
                    title: "Grey Text",
                    value: "",
                },
                specs: {
                    id: 4,
                    type: StructureType.Text,
                    title: "Specs",
                    value: "<ul><li>4K Ultra HD</li><li>Google TV</li><li>60Hz Native Refresh</li><li>DTS VirtualX</li><li>Voice Remote</li></ul>",
                },
                link: {
                    id: 5,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Link",
                    value: "",
                },
            },
            value: [
                {
                    label: {
                        id: 0,
                        type: StructureType.String,
                        title: "Label",
                        value: "",
                    },
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: "Image",
                        src: "",
                        alt: "",
                    },
                    title: {
                        id: 2,
                        type: StructureType.String,
                        title: "Title",
                        value: "Test Title",
                    },
                    greyText: {
                        id: 3,
                        type: StructureType.String,
                        title: "Grey Text",
                        value: "",
                    },
                    specs: {
                        id: 4,
                        type: StructureType.Text,
                        title: "Specs",
                        value: "<ul><li>4K Ultra HD</li><li>Google TV</li><li>60Hz Native Refresh</li><li>DTS VirtualX</li><li>Voice Remote</li></ul>",
                    },
                    link: {
                        id: 5,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Link",
                        value: "",
                    },
                },
            ],
        });
        blockRemoveItem(this.model, ["linkUrl", "linkTitle"]);
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
