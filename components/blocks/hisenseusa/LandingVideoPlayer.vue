<template>
    <div v-if="!isEmpty" style="margin-bottom: -8px">
        <div
            v-if="editable"
            class="tw-p-2 tw-my-1.5 tw-text-gray-500 tw-text-sm tw-bg-gray-50 tw-rounded-lg tw-inline-block"
        >
            In order to choose video player component please click here ..
        </div>
        <div class="tw-aspect-video">
            <iframe
                @click="clicked"
                ref="videoPlayer"
                class="tw-z-0"
                :title="model.video.alt"
                :src="model.video.src"
                width="100%"
                height="100%"
                allow="autoplay; fullscreen"
                allowfullscreen=""
                data-ready="true"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class LandingVideoPlayer extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
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
    }
    clicked() {
        console.log("you have clicked me easily ");
        this.$emit("click");
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
