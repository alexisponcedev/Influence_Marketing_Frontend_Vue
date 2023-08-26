<template>
    <div>
        <img src="/blocks/LandingStaticBanner.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class LandingStaticBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "image", {
            id: 0,
            title: "Image",
            type: StructureType.Image,
            src: "",
            alt: "",
        });

        blockAddItem(this.model, "video", {
            id: 1,
            title: "Video (optional)",
            type: StructureType.String,
            value: "",
        });

        blockAddItem(this.model, "theme", {
            id: 2,
            type: StructureType.Select,
            items: [
                { title: "Light", value: "light" },
                { title: "Dark", value: "dark" },
            ],
            title: "Theme",
            value: "dark",
        });

        blockAddItem(this.model, "link", {
            id: 3,
            type: StructureType.Url,
            target: "_self",
            title: "Link",
            value: "",
        });
    }

    get isEmpty(): boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
