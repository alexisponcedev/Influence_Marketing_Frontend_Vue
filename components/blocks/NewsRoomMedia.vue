<template>
    <div>
        <img src="/blocks/NewsRoomMedia.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class NewsRoomMedia extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.String,
            title: "Title",
            value: "News Room News Box",
        });
        blockAddItem(this.model, "list", {
            id: 1,
            maxLength: 2,
            type: StructureType.List,
            title: "News Room News Box list",
            newItem: {
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "Image Alt",
                },
                logo: {
                    id: 1,
                    type: StructureType.Image,
                    title: "logo",
                    src: "",
                    alt: "Image Alt",
                },
                title: {
                    id: 2,
                    type: StructureType.String,
                    title: "Title",
                    value: "",
                },
                downloadImage: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Download Image",
                    src: "",
                    alt: "Image Alt",
                },
                link: {
                    id: 1,
                    type: StructureType.Url,
                    title: "Link",
                    value: "",
                },
            },
            value: [],
        });

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
