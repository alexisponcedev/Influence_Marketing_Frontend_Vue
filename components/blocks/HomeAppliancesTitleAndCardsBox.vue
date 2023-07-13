<template>
    <div>
        <img src="/blocks/HomeAppliancesTitleAndCardsBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class HomeAppliancesTitleAndCardsBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "subtitle", {
            id: 1,
            type: StructureType.String,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 2,
            type: StructureType.List,
            title: "list",
            value: [{}],
            newItem: {
                image: {
                    id: 0,
                    type: StructureType.Image,
                    title: "background Image",
                    src: "",
                    alt: "",
                },
                title: {
                    id: 1,
                    type: StructureType.SimpleText,
                    title: "Title",
                    value: "",
                },
                subtitle: {
                    id: 2,
                    type: StructureType.SimpleText,
                    title: "Subtitle",
                    value: "",
                },
                link: {
                    id: 3,
                    type: StructureType.Url,
                    target: "_self",
                    title: "",
                    value: "",
                },
                theme: {
                    id: 4,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: Theme.light },
                        { title: "Dark", value: Theme.dark },
                    ],
                },
            },
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
