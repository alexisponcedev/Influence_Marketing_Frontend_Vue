<template>
    <div>
        <img src="/blocks/VideoFeature.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class VideoFeature extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "videoType", {
            id: 1,
            type: StructureType.Select,
            title: "Link Type",
            value: "iframe",
            items: [
                { value: "link", title: "Video Link" },
                { value: "iframe", title: "Iframe Link" },
            ],
        });
        blockAddItem(this.model, "video", {
            id: 1,
            type: StructureType.String,
            title: "Link",
            value: "",
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
