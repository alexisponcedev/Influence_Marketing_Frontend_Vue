<template>
    <div>
        <img src="/blocks/LatestNews.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Api } from "@/store";

@Component
export default class NewsSingleLatestNews extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Api = Api;

    async mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.Text,
            title: "Latest News",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "Press Release",
            newItem: {
                subtitle: {
                    id: 1,
                    type: StructureType.String,
                    title: "Subtitle",
                    value: "",
                },
                image: {
                    id: 2,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "Image Alt",
                },
                date: {
                    id: 3,
                    type: StructureType.String,
                    title: "Date",
                    value: ""
                },
                link: {
                    id: 4,
                    type: StructureType.Url,
                    title: "Link",
                    value: ""
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
