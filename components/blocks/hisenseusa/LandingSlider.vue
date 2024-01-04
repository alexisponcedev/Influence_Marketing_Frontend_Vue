<template>
    <div
        class="tw-mx-auto tw-flex tw-justify-center tw-relative"
        style="min-height: 682px"
        :class="maxWidth"
        v-if="!isEmpty"
    >
        <div
            v-if="activeSlide === index"
            v-for="(image, index) in model.list.value"
            :key="index"
        >
            <img
                v-if="
                    model.size.value === SliderMonitorSize.Mobile &&
                    image.mobile
                "
                class="tw-bg-gray-50 tw-w-full tw-min-h-96"
                :src="image.mobile.src"
                :alt="image.mobile.alt"
            />

            <img
                v-if="
                    model.size.value === SliderMonitorSize.Tablet &&
                    image.tablet
                "
                class="tw-bg-gray-50 tw-w-full tw-min-h-96"
                :src="image.tablet.src"
                :alt="image.tablet.alt"
            />

            <img
                v-if="
                    model.size.value === SliderMonitorSize.Desktop &&
                    image.desktop
                "
                class="tw-object-cover tw-bg-gray-50 tw-w-full tw-min-h-96"
                :src="image.desktop.src"
                :alt="image.desktop.alt"
            />
        </div>

        <button
            @click="goNext"
            class="tw-text-white tw-absolute"
            style="top: 48%; right: 4px"
        >
            <v-icon class="white--text" x-large>mdi-chevron-right</v-icon>
        </button>

        <button
            @click="goPrev"
            class="tw-text-white tw-absolute"
            style="top: 48%; left: 4px"
        >
            <v-icon class="white--text" x-large>mdi-chevron-left</v-icon>
        </button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Theme } from "@/interfaces/ThemeEnum";

enum SliderMonitorSize {
    Mobile = "mobile",
    Tablet = "tablet",
    Desktop = "desktop",
}

@Component
export default class LandingSlider extends Vue {
    @VModel({ type: Object }) model!: any;

    activeSlide = 0;
    SliderMonitorSize = SliderMonitorSize;

    mounted() {
        blockAddItem(this.model, "theme", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: Theme.light },
                { title: "Dark", value: Theme.dark },
            ],
        });

        blockAddItem(this.model, "size", {
            id: 1,
            type: StructureType.Select,
            title: "Slider Monitor Size",
            value: "desktop",
            items: [
                { title: "Mobile", value: SliderMonitorSize.Mobile },
                { title: "Table", value: SliderMonitorSize.Tablet },
                { title: "Desktop", value: SliderMonitorSize.Desktop },
            ],
        });

        blockAddItem(this.model, "list", {
            id: 2,
            type: StructureType.List,
            title: "Items",
            newItem: {
                buttonStyle: {
                    id: 1,
                    type: StructureType.PopupObject,
                    title: "Button Style",
                    value: {
                        outlineColor: {
                            id: 1,
                            type: StructureType.Color,
                            title: "Outline Color",
                            value: "#000",
                        },
                        outlineHoverColor: {
                            id: 2,
                            type: StructureType.Color,
                            title: "Outline Hover Color",
                            value: "#000",
                        },
                        textColor: {
                            id: 3,
                            type: StructureType.Color,
                            title: "Text Color",
                            value: "#000",
                        },
                        textHoverColor: {
                            id: 4,
                            type: StructureType.Color,
                            title: "Text Hover Color",
                            value: "#fff",
                        },
                        fillColor: {
                            id: 5,
                            type: StructureType.Color,
                            title: "Fill Color",
                            value: "#fff",
                        },
                        fillHoverColor: {
                            id: 6,
                            type: StructureType.Color,
                            title: "Fill Hover Color",
                            value: "#000",
                        },
                    },
                },
                url: {
                    id: 2,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Target URL",
                    value: "/products",
                },
                mobile: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Mobile Image",
                    src: "https://assets.hisense-usa.com/assets/HomePageSlides/881cd9b3f1/No2-mobile-v2__ScaleMaxWidthWzg1MF0.jpg",
                    alt: "Small Image for Slider",
                },
                tablet: {
                    id: 4,
                    type: StructureType.Image,
                    title: "Tablet Image",
                    src: "https://assets.hisense-usa.com/assets/HomePageSlides/881cd9b3f1/No2-mobile__ScaleMaxWidthWzE1MzZd.jpg",
                    alt: "Large Image for Slider",
                },
                desktop: {
                    id: 5,
                    type: StructureType.Image,
                    title: "Desktop Image",
                    src: "https://assets.hisense-usa.com/assets/HomePageSlides/8e29040da0/No2-v2__ScaleMaxWidthWzI1NjBd.jpg",
                    alt: "Large Image for Slider",
                },
                lightboxTitle: {
                    id: 6,
                    type: StructureType.String,
                    title: "Lightbox Button Title",
                    value: "",
                },
                lightbox: {
                    id: 7,
                    type: StructureType.Select,
                    title: "Open Light Box (this option will ignore the Link)",
                    value: true,
                    items: [
                        { title: "Active", value: true },
                        { title: "Deactive", value: false },
                    ],
                },
                lightbox_live_animation: {
                    id: 8,
                    type: StructureType.Select,
                    title: "Light box live animation toggle",
                    value: true,
                    items: [
                        { title: "Active", value: true },
                        { title: "Deactive", value: false },
                    ],
                },
                lightboxObject: {
                    id: 9,
                    type: StructureType.Object,
                    title: "Light Box Data",
                    value: {
                        caption: {
                            id: 0,
                            type: StructureType.SimpleText,
                            title: "Title",
                            value: "",
                        },
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                            alt: "some note about this asset",
                        },
                        video: {
                            id: 2,
                            type: StructureType.String,
                            title: "Iframe Link",
                            value: "",
                        },
                        link: {
                            id: 3,
                            type: StructureType.Url,
                            title: "Download",
                            value: "/",
                        },
                    },
                },
            },
            value: [
                {
                    buttonStyle: {
                        id: 1,
                        type: StructureType.PopupObject,
                        title: "Button Style",
                        value: {
                            outlineColor: {
                                id: 1,
                                type: StructureType.Color,
                                title: "Outline Color",
                                value: "#000",
                            },
                            outlineHoverColor: {
                                id: 2,
                                type: StructureType.Color,
                                title: "Outline Hover Color",
                                value: "#000",
                            },
                            textColor: {
                                id: 3,
                                type: StructureType.Color,
                                title: "Text Color",
                                value: "#000",
                            },
                            textHoverColor: {
                                id: 4,
                                type: StructureType.Color,
                                title: "Text Hover Color",
                                value: "#fff",
                            },
                            fillColor: {
                                id: 5,
                                type: StructureType.Color,
                                title: "Fill Color",
                                value: "#fff",
                            },
                            fillHoverColor: {
                                id: 6,
                                type: StructureType.Color,
                                title: "Fill Hover Color",
                                value: "#000",
                            },
                        },
                    },
                    url: {
                        id: 2,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Target URL",
                        value: "/products",
                    },
                    mobile: {
                        id: 3,
                        type: StructureType.Image,
                        title: "Mobile Image",
                        src: "https://assets.hisense-usa.com/assets/HomePageSlides/881cd9b3f1/No2-mobile-v2__ScaleMaxWidthWzg1MF0.jpg",
                        alt: "Small Image for Slider",
                    },
                    tablet: {
                        id: 4,
                        type: StructureType.Image,
                        title: "Tablet Image",
                        src: "https://assets.hisense-usa.com/assets/HomePageSlides/881cd9b3f1/No2-mobile__ScaleMaxWidthWzE1MzZd.jpg",
                        alt: "Large Image for Slider",
                    },
                    desktop: {
                        id: 5,
                        type: StructureType.Image,
                        title: "Desktop Image",
                        src: "https://assets.hisense-usa.com/assets/HomePageSlides/8e29040da0/No2-v2__ScaleMaxWidthWzI1NjBd.jpg",
                        alt: "Large Image for Slider",
                    },
                    lightboxTitle: {
                        id: 6,
                        type: StructureType.String,
                        title: "Lightbox Button Title",
                        value: "",
                    },
                    lightbox: {
                        id: 7,
                        type: StructureType.Select,
                        title: "Open Light Box (this option will ignore the Link)",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    lightbox_live_animation: {
                        id: 8,
                        type: StructureType.Select,
                        title: "Light box live animation toggle",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    lightboxObject: {
                        id: 9,
                        type: StructureType.Object,
                        title: "Light Box Data",
                        value: {
                            caption: {
                                id: 0,
                                type: StructureType.SimpleText,
                                title: "Title",
                                value: "",
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "",
                                alt: "some note about this asset",
                            },
                            video: {
                                id: 2,
                                type: StructureType.String,
                                title: "Iframe Link",
                                value: "",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                title: "Download",
                                value: "/",
                            },
                        },
                    },
                },
                {
                    buttonStyle: {
                        id: 1,
                        type: StructureType.PopupObject,
                        title: "Button Style",
                        value: {
                            outlineColor: {
                                id: 1,
                                type: StructureType.Color,
                                title: "Outline Color",
                                value: "#000",
                            },
                            outlineHoverColor: {
                                id: 2,
                                type: StructureType.Color,
                                title: "Outline Hover Color",
                                value: "#000",
                            },
                            textColor: {
                                id: 3,
                                type: StructureType.Color,
                                title: "Text Color",
                                value: "#000",
                            },
                            textHoverColor: {
                                id: 4,
                                type: StructureType.Color,
                                title: "Text Hover Color",
                                value: "#fff",
                            },
                            fillColor: {
                                id: 5,
                                type: StructureType.Color,
                                title: "Fill Color",
                                value: "#fff",
                            },
                            fillHoverColor: {
                                id: 6,
                                type: StructureType.Color,
                                title: "Fill Hover Color",
                                value: "#000",
                            },
                        },
                    },
                    url: {
                        id: 2,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Target URL",
                        value: "/products",
                    },
                    mobile: {
                        id: 3,
                        type: StructureType.Image,
                        title: "Mobile Image",
                        src: "https://assets.hisense-usa.com/assets/HomePageSlides/7864d0fbb5/Homepage-Banner-HUSA-Mobile-v2__ScaleMaxWidthWzg1MF0.jpg",
                        alt: "Small Image for Slider",
                    },
                    tablet: {
                        id: 4,
                        type: StructureType.Image,
                        title: "Tablet Image",
                        src: "https://assets.hisense-usa.com/assets/HomePageSlides/7864d0fbb5/Homepage-Banner-HUSA-Mobile__ScaleMaxWidthWzE1MzZd.jpg",
                        alt: "Large Image for Slider",
                    },
                    desktop: {
                        id: 5,
                        type: StructureType.Image,
                        title: "Desktop Image",
                        src: "https://assets.hisense-usa.com/assets/HomePageSlides/de5912bcef/Homepage-Banner-HUSA-desk-update-v3__ScaleMaxWidthWzI1NjBd.png",
                        alt: "Large Image for Slider",
                    },
                    lightboxTitle: {
                        id: 6,
                        type: StructureType.String,
                        title: "Lightbox Button Title",
                        value: "",
                    },
                    lightbox: {
                        id: 7,
                        type: StructureType.Select,
                        title: "Open Light Box (this option will ignore the Link)",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    lightbox_live_animation: {
                        id: 8,
                        type: StructureType.Select,
                        title: "Light box live animation toggle",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    lightboxObject: {
                        id: 9,
                        type: StructureType.Object,
                        title: "Light Box Data",
                        value: {
                            caption: {
                                id: 0,
                                type: StructureType.SimpleText,
                                title: "Title",
                                value: "",
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "",
                                alt: "some note about this asset",
                            },
                            video: {
                                id: 2,
                                type: StructureType.String,
                                title: "Iframe Link",
                                value: "",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                title: "Download",
                                value: "/",
                            },
                        },
                    },
                },
                {
                    buttonStyle: {
                        id: 1,
                        type: StructureType.PopupObject,
                        title: "Button Style",
                        value: {
                            outlineColor: {
                                id: 1,
                                type: StructureType.Color,
                                title: "Outline Color",
                                value: "#000",
                            },
                            outlineHoverColor: {
                                id: 2,
                                type: StructureType.Color,
                                title: "Outline Hover Color",
                                value: "#000",
                            },
                            textColor: {
                                id: 3,
                                type: StructureType.Color,
                                title: "Text Color",
                                value: "#000",
                            },
                            textHoverColor: {
                                id: 4,
                                type: StructureType.Color,
                                title: "Text Hover Color",
                                value: "#fff",
                            },
                            fillColor: {
                                id: 5,
                                type: StructureType.Color,
                                title: "Fill Color",
                                value: "#fff",
                            },
                            fillHoverColor: {
                                id: 6,
                                type: StructureType.Color,
                                title: "Fill Hover Color",
                                value: "#000",
                            },
                        },
                    },
                    url: {
                        id: 2,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Target URL",
                        value: "/products",
                    },
                    mobile: {
                        id: 3,
                        type: StructureType.Image,
                        title: "Mobile Image",
                        src: "https://assets.hisense-usa.com/assets/HomePageSlides/454c68e2c7/Perfect-match-sweepstakes-mobile-v5__ScaleMaxWidthWzg1MF0.jpg",
                        alt: "Small Image for Slider",
                    },
                    tablet: {
                        id: 4,
                        type: StructureType.Image,
                        title: "Tablet Image",
                        src: "https://assets.hisense-usa.com/assets/HomePageSlides/454c68e2c7/Perfect-match-sweepstakes-mobile-v3__ScaleMaxWidthWzE1MzZd.jpg",
                        alt: "Large Image for Slider",
                    },
                    desktop: {
                        id: 5,
                        type: StructureType.Image,
                        title: "Desktop Image",
                        src: "https://assets.hisense-usa.com/assets/HomePageSlides/eeaefdc6f6/Perfect-match-sweepstakes-v2__ScaleMaxWidthWzI1NjBd.jpg",
                        alt: "Large Image for Slider",
                    },
                    lightboxTitle: {
                        id: 6,
                        type: StructureType.String,
                        title: "Lightbox Button Title",
                        value: "",
                    },
                    lightbox: {
                        id: 7,
                        type: StructureType.Select,
                        title: "Open Light Box (this option will ignore the Link)",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    lightbox_live_animation: {
                        id: 8,
                        type: StructureType.Select,
                        title: "Light box live animation toggle",
                        value: true,
                        items: [
                            { title: "Active", value: true },
                            { title: "Deactive", value: false },
                        ],
                    },
                    lightboxObject: {
                        id: 9,
                        type: StructureType.Object,
                        title: "Light Box Data",
                        value: {
                            caption: {
                                id: 0,
                                type: StructureType.SimpleText,
                                title: "Title",
                                value: "",
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "",
                                alt: "some note about this asset",
                            },
                            video: {
                                id: 2,
                                type: StructureType.String,
                                title: "Iframe Link",
                                value: "",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                title: "Download",
                                value: "/",
                            },
                        },
                    },
                },
            ],
        });
    }

    goNext() {
        this.activeSlide = (this.activeSlide + 1) % this.slidesCount;
    }

    goPrev() {
        this.activeSlide = (this.activeSlide - 1) % this.slidesCount;
    }

    get slidesCount(): any {
        return this.isEmpty ? 0 : this.model.list.value.length;
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    get maxWidth() {
        return this.isEmpty
            ? {}
            : {
                  "tw-max-w-sm":
                      this.model.size.value === SliderMonitorSize.Mobile,
                  "tw-max-w-md":
                      this.model.size.value === SliderMonitorSize.Tablet,
                  "tw-aspect-video":
                      this.model.size.value === SliderMonitorSize.Mobile,
              };
    }
}
</script>
