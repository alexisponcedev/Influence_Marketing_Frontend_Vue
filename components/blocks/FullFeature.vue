<template>
    <div>
        <img src="/blocks/FullFeature.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class FullFeature extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "theme", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: Theme.light },
                { title: "Dark", value: Theme.dark },
            ],
        });
        blockAddItem(this.model, "background", {
            id: 0,
            type: StructureType.Image,
            title: "Background",
            alt: "",
            src: "",
        });
        blockAddItem(this.model, "topImage", {
            id: 1,
            type: StructureType.Image,
            title: "Top Image",
            alt: "",
            src: "",
        });
        blockAddItem(this.model, "subtitle", {
            id: 2,
            type: StructureType.String,
            title: "Subtitle",
            value: "",
        });
        blockAddItem(this.model, "title", {
            id: 3,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "text", {
            id: 4,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });

        blockAddItem(this.model, "bottomImage1", {
            id: 5,
            type: StructureType.Image,
            title: "Bottom Image 1",
            alt: "",
            src: "",
        });
        blockAddItem(this.model, "bottomImage2", {
            id: 6,
            type: StructureType.Image,
            title: "Bottom Image 2",
            alt: "",
            src: "",
        });
        blockAddItem(this.model, "note", {
            id: 7,
            type: StructureType.String,
            title: "Note",
            value: "",
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
