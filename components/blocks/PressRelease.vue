<template>
    <div>
        <img src="/blocks/NewsRoomNewsBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Api } from "@/store";

@Component
export default class NewsRoomNewsBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Api = Api;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.String,
            title: "Title",
            value: "Title",
        });
        blockAddItem(this.model, "list", {
            id: 2,
            type: StructureType.List,
            title: "Press Release list",
            newItem: {
                subtitle: {
                    id: 1,
                    type: StructureType.String,
                    title: "Press Release",
                    value: "",
                },
                title: {
                    id: 2,
                    type: StructureType.String,
                    title: "Title",
                    value: "",
                },
                date: {
                    id: 3,
                    type: StructureType.String,
                    title: "Date",
                    value: "",
                },
                image: {
                    id: 4,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "Image Alt",
                },
                link: {
                    id: 5,
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
