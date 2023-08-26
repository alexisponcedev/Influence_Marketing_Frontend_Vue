<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-container tw-mx-auto">
                <div
                    class="tw-flex tw-flex-wrap xl:tw-flex-nowrap tw-justify-center tw-items-start relative"
                >
                    <div
                        class="tw-order-2 xl:tw-order-1 tw-w-full md:tw-w-1/2 tw-gap-4 xl:tw-w-auto tw-flex tw-justify-center md:tw-justify-evenly tw-items-center xl:tw-block tw-relative xl:tw-absolute xl:tw-left-0 xl:tw-top-0 tw-h-full tw-z-[1]"
                    >
                        <img
                            :src="model.image1.src"
                            :alt="model.image1.alt"
                            class="tw-max-w-[252px] tw-w-[45%] xl:tw-w-full tw-mb-4 xl:tw-ml-auto xl:tw-translate-x-10"
                        />
                        <img
                            :src="model.image2.src"
                            :alt="model.image2.alt"
                            class="tw-max-w-[252px] xl:tw-max-w-[198px] tw-w-[45%] xl:tw-w-full tw-mb-4 xl:tw-mr-auto xl:-tw-translate-y-20 xl:-tw-translate-x-9"
                        />
                    </div>
                    <div
                        class="tw-order-1 xl:tw-order-2 tw-max-w-[800px] xl:tw-max-w-[600px] tw-w-full tw-mx-auto tw-relative tw-z-[2] tw-mb-10 xl:tw-mb-0"
                    >
                        <div
                            class="tw-w-full tw-flex tw-flex-col tw-justify-start tw-items-center tw-gap-8 tw-mb-8"
                        >
                            <h5
                                class="tw-text-xl md:tw-text-2xl tw-text-skyblue tw-font-normal"
                            >
                                {{ model.subtitle.value }}
                            </h5>
                            <h3
                                class="tw-text-white tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-center -tw-tracking-wide"
                                v-html="model.title.value"
                            ></h3>

                            <div
                                class="tw-text-center tw-text-white"
                                v-html="model.text.value"
                            ></div>
                        </div>
                        <div
                            class="tw-w-full tw-flex tw-justify-center tw-items-center tw-mt-4 tw-text-xs"
                        >
                            <a
                                :href="model.link.value"
                                class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer white"
                                >{{ model.link.title }}</a
                            >
                        </div>
                    </div>
                    <div
                        class="tw-order-3 tw-w-full md:tw-w-1/2 tw-gap-4 xl:tw-w-auto tw-flex tw-justify-center md:tw-justify-evenly tw-items-center xl:tw-block xl:tw-right-0 xl:tw-bottom-0 tw-relative xl:tw-absolute tw-z-[1]"
                    >
                        <img
                            :src="model.image3.src"
                            :alt="model.image3.alt"
                            class="tw-max-w-[252px] xl:tw-max-w-[215px] tw-w-[45%] xl:tw-w-full tw-mb-4 xl:tw-translate-y-14 xl:-tw-translate-x-14"
                        />
                        <img
                            :src="model.image4.src"
                            :alt="model.image4.alt"
                            class="tw-max-w-[252px] tw-w-[45%] xl:tw-w-full mb-4 xl:tw-ml-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class HomeAboutUs extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "subtitle", {
            id: 0,
            type: StructureType.String,
            title: "Subtitle",
            value: "",
        });
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "text", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });
        blockAddItem(this.model, "image1", {
            id: 3,
            type: StructureType.Image,
            title: "Upload Image",
            src: "",
            alt: "image alt",
        });
        blockAddItem(this.model, "image2", {
            id: 4,
            type: StructureType.Image,
            title: "Upload Image",
            src: "",
            alt: "image alt",
        });
        blockAddItem(this.model, "image3", {
            id: 5,
            type: StructureType.Image,
            title: "Upload Image",
            src: "",
            alt: "image alt",
        });
        blockAddItem(this.model, "image4", {
            id: 6,
            type: StructureType.Image,
            title: "Upload Image",
            src: "",
            alt: "image alt",
        });
        blockAddItem(this.model, "link", {
            id: 7,
            type: StructureType.Url,
            title: "link",
            value: "/",
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
