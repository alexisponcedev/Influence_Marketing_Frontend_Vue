<template>
    <div>
        <img src="/blocks/HomeAppliancesCardsBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class HomeAppliancesCardsBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "block1", {
            id: 0,
            type: StructureType.Object,
            title: "Card 1",
            value: {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: Theme.light },
                        { title: "Dark", value: Theme.dark },
                    ],
                },
                title: {
                    id: 1,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "",
                },
                text: {
                    id: 4,
                    type: StructureType.SimpleText,
                    title: "text",
                    value: "",
                },
                link: {
                    id: 5,
                    type: StructureType.Url,
                    target: "_self",
                    title: "link",
                    value: "/",
                },
            },
        });
        blockAddItem(this.model, "block2", {
            id: 0,
            type: StructureType.Object,
            title: "Card 2",
            value: {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: Theme.light },
                        { title: "Dark", value: Theme.dark },
                    ],
                },
                title: {
                    id: 1,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                backgroundImage: {
                    id: 2,
                    type: StructureType.Image,
                    title: "Background Image",
                    src: "",
                    alt: "",
                },
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "",
                },
                text: {
                    id: 4,
                    type: StructureType.SimpleText,
                    title: "text",
                    value: "",
                },
                link: {
                    id: 5,
                    type: StructureType.Url,
                    target: "_self",
                    title: "link",
                    value: "/",
                },
            },
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
