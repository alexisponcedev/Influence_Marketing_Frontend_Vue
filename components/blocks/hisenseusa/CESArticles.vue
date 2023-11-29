<template>
    <div>
        <img src="/blocks/NewsPressArchive.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class CESArticles extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    async mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.String,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 8,
            type: StructureType.List,
            title: "Article",
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
                tag: {
                    id: 2,
                    type: StructureType.String,
                    title: "Tag",
                    value: "",
                },
                link: {
                    id: 3,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Link",
                    value: "",
                },
                data: {
                    id: 4,
                    type: StructureType.String,
                    title: "Date",
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
