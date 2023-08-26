<template>
    <div>
        <img src="/blocks/BeyondLaserMomentsBlock.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BeyondLaserMomentsBlock extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "text", {
            id: 1,
            type: StructureType.Text,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 2,
            type: StructureType.List,
            newItem: {
                image: {
                    id: 0,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "",
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
                    title: "",
                    value: "",
                },
            },
            value: [
                {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: "Image",
                        src: "",
                        alt: "",
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
                        title: "",
                        value: "",
                    },
                },
            ],
        });
        blockAddItem(this.model, "image", {
            id: 3,
            type: StructureType.Image,
            title: "Image",
            src: "",
            alt: "",
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
