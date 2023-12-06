<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-p-4 tw-max-w-[1385px] tw-mx-auto">
                <div v-for="(item, index) in model?.list?.value" :key="index">
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
                </div>
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
            newItem: {
                image: {
                    id: 0,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "",
                    hidden: true,
                },
                imageCaption: {
                    id: 1,
                    type: StructureType.SimpleText,
                    title: "Image Caption",
                    value: "",
                    hidden: true,
                },
                video: {
                    id: 2,
                    type: StructureType.Video,
                    title: "Video URL",
                    value: "",
                    hidden: true,
                },
                videoCaption: {
                    id: 3,
                    type: StructureType.SimpleText,
                    title: "Video Caption",
                    value: "",
                    hidden: true,
                },
                showImageFieldsButton: {
                    id: 4,
                    action: "showImageFields",
                    title: "Add Image",
                    icon: "mdi-plus",
                    type: StructureType.Button,
                },
                showVideoFieldsButton: {
                    id: 5,
                    action: "showVideoFields",
                    title: "Add Video",
                    icon: "mdi-plus",
                    type: StructureType.Button,
                },
            },
            value: [],
            onClick: this.showFields,
        });

        this.model = { ...this.model };
    }

    showFields(action: string, payload: any) {
        if (action == "showImageFields") {
            payload.list[payload.index].image.hidden = false;
            payload.list[payload.index].imageCaption.hidden = false;
            payload.list[payload.index].showImageFieldsButton.hidden = true;
        } else if (action == "showVideoFields") {
            payload.list[payload.index].video.hidden = false;
            payload.list[payload.index].videoCaption.hidden = false;
            payload.list[payload.index].showVideoFieldsButton.hidden = true;
        }
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
