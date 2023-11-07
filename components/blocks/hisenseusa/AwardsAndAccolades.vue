<template>
    <div>
        <img src="/blocks/AwardsAndAccolades.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class AwardsAndAccolades extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "Items",
            newItem: {
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Upload Image",
                    src: "",
                },
                title: {
                    id: 2,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                subtitle: {
                    id: 3,
                    type: StructureType.SimpleText,
                    title: "Sub Title",
                    value: "",
                },
                link: {
                    id: 4,
                    type: StructureType.Url,
                    title: "link",
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
