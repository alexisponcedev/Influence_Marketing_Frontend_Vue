<template>
    <div style="margin-bottom: -8px">
        <div
            class="tw-p-2 tw-my-1.5 tw-text-gray-500 tw-text-sm tw-bg-gray-50 tw-rounded-lg tw-inline-block"
        >
            In order to choose video player component please click here ..
        </div>
        <div class="tw-aspect-video">
            <iframe
                @click="clicked"
                :title="model.video?.alt || model.video?.title || ''"
                :src="model.video?.value"
                ref="videoPlayer"
                class="tw-z-0"
                width="100%"
                height="100%"
                allow="autoplay; fullscreen"
                data-ready="true"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class LandingVideoPlayer extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "video", {
            id: 0,
            type: StructureType.Url,
            target: "_self",
            title: "Video",
            value: "https://player.vimeo.com/video/408847720?autoplay=1&amp;muted=1&amp;loop=1&amp;controls=0&amp;background=1",
        });

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

        this.model = { ...this.model };
    }

    clicked() {
        this.$emit("click");
    }
}
</script>
