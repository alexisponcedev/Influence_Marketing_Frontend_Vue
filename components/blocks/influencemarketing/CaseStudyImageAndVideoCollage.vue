<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-p-4 tw-max-w-[1385px] tw-mx-auto">
                <!-- <div v-for="(item, index) in model?.list?.value" :key="index">
                    <div
                        v-if="item?.image?.src && item?.video?.value"
                        class="tw-flex tw-flex-col md:tw-flex-row tw-gap-8 tw-justify-center tw-items-center"
                    >
                        <div
                            class="tw-w-full md:tw-w-1/2 tw-pt-[61%] tw-h-0 md:tw-pt-0 md:tw-h-[400px] tw-relative"
                        >
                            <img
                                class="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-[calc(100%_-_28px)] tw-object-cover"
                                :src="item?.image?.src"
                                :alt="item?.image?.alt"
                            />
                            <div
                                v-if="item?.imageCaption?.value"
                                class="tw-absolute tw-left-4 tw-bottom-0 tw-text-white tw-text-xs tw-font-normal"
                                v-html="item?.imageCaption?.value"
                            />
                        </div>
                        <div
                            class="tw-w-full md:tw-w-1/2 tw-pt-[61%] tw-h-0 md:tw-pt-0 md:tw-h-[400px] tw-relative"
                        >
                            <iframe
                                class="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-[calc(100%_-_28px)] tw-object-cover"
                                :src="item?.video?.value"
                                allow="autoplay"
                            />
                            <div
                                v-if="item?.videoCaption?.value"
                                class="tw-absolute tw-left-4 tw-bottom-0 tw-text-white tw-text-xs tw-font-normal"
                                v-html="item?.videoCaption?.value"
                            />
                        </div>
                    </div>
                    <div
                        v-else-if="item?.image?.src"
                        class="tw-w-full tw-relative tw-pt-[57.8%] tw-h-0"
                    >
                        <img
                            class="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-object-cover tw-h-[calc(100%_-_28px)]"
                            :src="item?.image?.src"
                            :alt="item?.image?.alt"
                        />
                        <div
                            v-if="item?.imageCaption?.value"
                            class="tw-absolute tw-left-4 tw-bottom-0 tw-text-white tw-text-xs tw-font-normal"
                            v-html="item?.imageCaption?.value"
                        />
                    </div>
                    <div
                        v-else-if="item?.video?.value"
                        class="tw-w-full tw-relative tw-pt-[57.8%] tw-h-0"
                    >
                        <iframe
                            class="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-object-cover tw-h-[calc(100%_-_28px)]"
                            :src="item?.video?.value"
                            allow="autoplay"
                        />
                        <div
                            v-if="item?.videoCaption?.value"
                            class="tw-absolute tw-left-4 tw-bottom-0 tw-text-white tw-text-xs tw-font-normal"
                            v-html="item?.videoCaption?.value"
                        />
                    </div>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class CaseStudyImageAndVideoCollage extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "Rows",
            maxLength: 2,
            value: [],
            newItem: {
                list: {
                    id: 1,
                    type: StructureType.List,
                    maxLength: 0,
                    newItem: {
                        type: {
                            id: 0,
                            type: StructureType.TextPreview,
                            title: "Type",
                            value: "",
                        },
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                            alt: "",
                        },
                        imageCaption: {
                            id: 2,
                            type: StructureType.SimpleText,
                            title: "Image Caption",
                            value: "",
                        },
                        video: {
                            id: 3,
                            type: StructureType.Video,
                            title: "Video URL",
                            value: "",
                        },
                        videoCaption: {
                            id: 4,
                            type: StructureType.SimpleText,
                            title: "Video Caption",
                            value: "",
                        },
                    },
                    value: [],
                    onChanged: this.postProcessing,
                },
                addImageButton: {
                    id: 2,
                    action: "addImage",
                    title: "Add Image",
                    icon: "mdi-plus",
                    type: StructureType.Button,
                },
                addVideoButton: {
                    id: 3,
                    action: "addVideo",
                    title: "Add Video",
                    icon: "mdi-plus",
                    type: StructureType.Button,
                },
            },
            onClick: this.addField,
        });

        this.postProcessing();
    }

    addField(action: string, payload: any) {
        payload.list[payload.index].list.value.push({
            type: {
                id: 0,
                type: StructureType.TextPreview,
                title: "Type",
                value: action == "addImage" ? "image" : "video",
            },
            image: {
                id: 1,
                type: StructureType.Image,
                title: "Image",
                src: "",
                alt: "",
            },
            imageCaption: {
                id: 2,
                type: StructureType.SimpleText,
                title: "Image Caption",
                value: "",
            },
            video: {
                id: 3,
                type: StructureType.Video,
                title: "Video URL",
                value: "",
            },
            videoCaption: {
                id: 4,
                type: StructureType.SimpleText,
                title: "Video Caption",
                value: "",
            },
        });
        payload.list[payload.index].list.onChanged = this.postProcessing;
        this.postProcessing();
    }

    postProcessing() {
        this.model?.list?.value?.forEach((item: any) => {
            item?.list?.value?.forEach((media: any) => {
                if (media.type.value == "image") {
                    media.video.hidden = true;
                    media.videoCaption.hidden = true;
                    media.image.hidden = false;
                    media.imageCaption.hidden = false;
                } else if (media.type.value == "video") {
                    media.video.hidden = false;
                    media.videoCaption.hidden = false;
                    media.image.hidden = true;
                    media.imageCaption.hidden = true;
                }
            });

            if (item?.list?.value?.length >= 2) {
                item.addImageButton.hidden = true;
                item.addVideoButton.hidden = true;
            } else {
                item.addImageButton.hidden = false;
                item.addVideoButton.hidden = false;
            }
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
