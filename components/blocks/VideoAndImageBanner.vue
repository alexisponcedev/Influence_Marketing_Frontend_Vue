<template>
    <div>
        <img src="/blocks/VideoAndImageBanner.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class VideoAndImageBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "backgroundImage", {
            id: 1,
            type: StructureType.Image,
            title: "Background Image",
            src: "",
            alt: "",
        });

        blockAddItem(this.model, "image", {
            id: 2,
            type: StructureType.Image,
            title: "Image",
            src: "",
            alt: "",
        });

        blockAddItem(this.model, "video", {
            id: 3,
            type: StructureType.Video,
            title: "Video",
            value: "",
        });

        blockAddItem(this.model, "simpleText", {
            id: 4,
            type: StructureType.SimpleText,
            title: "Simple Text",
            value: "",
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
