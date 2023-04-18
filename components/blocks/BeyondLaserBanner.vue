<template>
    <div>
        <img src="/blocks/BeyondLaserBanner.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BeyondLaserBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "link", {
            id: 0,
            type: StructureType.Url,
            target: "_self",
            title: "Image",
            value: "",
        });
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.String,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "tinyTitle", {
            id: 2,
            type: StructureType.String,
            title: "Tiny Title",
            value: "",
        });
        blockAddItem(this.model, "video", {
            id: 3,
            type: StructureType.Video,
            title: "Video",
            value: "",
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
