<template>
    <div v-if="!isEmpty">
        <section class="tw-bg-midnight">
            <div
                class="tw-h-full lg:tw-h-screen tw-min-h-screen lg:tw-min-h-min tw-relative tw-container tw-mx-auto tw-px-4"
            >
                <div
                    class="tw-flex tw-justify-between lg:tw-justify-center tw-items-center tw-flex-col lg:tw-flex-row tw-h-full tw-min-h-screen lg:tw-min-h-min"
                >
                    <div
                        class="tw-w-full lg:tw-w-1/3 tw-h-[40vh] lg:tw-h-auto tw-flex tw-flex-col tw-justify-center tw-items-start tw-gap-8 tw-order-2 lg:tw-order-1"
                    >
                        <h2
                            class="tw-text-4xl md:tw-text-5xl lg:tw-text-6xl tw-text-white tw-leading-none tw-font-bold tw-uppercase -tw-tracking-[1.2px] tw-mb-0"
                            style="word-break: break-word"
                        >
                            {{ model.title.value }}
                        </h2>
                        <div
                            class="tw-text-white"
                            v-html="model.text.value"
                        ></div>
                    </div>
                    <div
                        class="tw-w-full lg:tw-w-2/3 tw-h-[50vh] lg:tw-h-full tw-relative tw-order-1 lg:tw-order-2"
                    >
                        <img
                            src="@/assets/images/tarnsparent_cube.svg"
                            alt="cube"
                            class="!tw-w-full tw-max-w-sm lg:tw-max-w-md tw-relative tw-left-0 lg:tw-left-[12%] tw-top-7 lg:tw-top-1/2 lg:-tw-translate-y-2/3"
                        />
                        <img
                            src="@/assets/images/floating_cube.png"
                            alt="cube"
                            width="150"
                            height="150"
                            class="tw-z-[2] !tw-w-28 !tw-h-28 sm:!tw-w-[150px] sm:!tw-h-[150px] tw-absolute tw-left-[30%] sm:tw-left-[40%] tw-top-1/2 sm:-tw-translate-y-1/2 -tw-translate-x-2/3"
                        />
                        <img
                            src="@/assets/images/floating_cube_blur.png"
                            alt="cube"
                            width="150"
                            height="150"
                            class="tw-z-[2] !tw-w-28 !tw-h-28 sm:!tw-w-[150px] sm:!tw-h-[150px] tw-absolute tw-left-1/2 -tw-bottom-16 sm:-tw-bottom-36 lg:tw-bottom-28 -tw-translate-x-1/2"
                        />
                        <img
                            src="@/assets/images/floating_cube_blur2.png"
                            alt="cube"
                            width="150"
                            height="150"
                            class="tw-z-[2] !tw-w-28 !tw-h-28 sm:!tw-w-[150px] sm:!tw-h-[150px] tw-absolute tw-right-[10%] tw-top-1/3 -tw-translate-y-1/3 sm:-tw-translate-y-full"
                        />
                        <img
                            :src="model.image.src"
                            :alt="model.image.alt"
                            width="100"
                            height="100"
                            class="tw-absolute tw-right-1/2 tw-top-1/2 tw-translate-x-[55%] sm:tw-translate-x-3/4 -tw-translate-y-[10%] lg:-tw-translate-y-1/3 tw-object-cover tw-rounded-md !tw-w-full tw-max-w-[250px] sm:tw-max-w-xs lg:tw-max-w-md"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { Theme } from "~/interfaces/ThemeEnum";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class SolutionsBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "theme", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: this.Theme.light },
                { title: "Dark", value: this.Theme.dark },
            ],
        });
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.String,
            title: "Text",
            value: "",
        });
        blockAddItem(this.model, "text", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });
        blockAddItem(this.model, "image", {
            id: 3,
            type: StructureType.Image,
            title: "Upload Image",
            src: "",
            alt: "Some note about this image",
        });

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css">
.large-title {
    font-size: 42px;
    font-weight: 700;
}

.paragraph {
    font-size: 18px;
    font-weight: 400;
}
</style>
