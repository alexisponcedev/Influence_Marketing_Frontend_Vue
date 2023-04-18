<template>
    <div>
        <img src="/blocks/HomeApplianceFeatures.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class BlockHomeApplianceFeatures extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue,
                ...{
                    backgroundColor: {
                        id: 7,
                        type: StructureType.Color,
                        title: "Background color",
                        value: "#fff",
                    },
                },
            };
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: this.Theme.light },
                        { title: "Dark", value: this.Theme.dark },
                    ],
                },
                mainTitleBlack: {
                    id: 1,
                    type: StructureType.String,
                    title: "Main Title Black",
                    value: "Super Cool",
                },
                mainTitleColored: {
                    id: 2,
                    type: StructureType.String,
                    title: "Main Title Colored",
                    value: "Features",
                },
                link: {
                    id: 3,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Link",
                    value: "/refrigerators/refrigerators/all-refrigerators",
                },
                list: {
                    id: 1,
                    type: StructureType.List,
                    title: "features with icon items",
                    newItem: {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/466780d428/content_ci-dual-tech-min-2p7h2a.png",
                            alt: "featured image",
                        },
                        grayTitle: {
                            id: 1,
                            type: StructureType.String,
                            title: "Gray Title",
                            value: "Dual-Tech Cooling",
                        },
                        coloredTitle: {
                            id: 2,
                            type: StructureType.String,
                            title: "Colored Title",
                            value: "PRESERVE THE TASTE",
                        },
                        paragraph: {
                            id: 3,
                            type: StructureType.String,
                            title: "Paragraph",
                            value: "The fridge and freezer zones maintain the ideal humidity level in each compartment, preventing odor transfer and keeping the fresh and original taste longer. Dual-tech Cooling* also helps prevent food from drying out.",
                        },
                        Note: {
                            id: 4,
                            type: StructureType.String,
                            title: "Note",
                            value: "* Dual-Tech Cooling is not an available feature on all refrigerator models.",
                        },
                    },
                    value: [
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/28c0bb9bf0/content_dp-digital-display-min-ymnp3o.png",
                                alt: "featured image",
                            },
                            grayTitle: {
                                id: 1,
                                type: StructureType.String,
                                title: "Gray Title",
                                value: "Digital Display",
                            },
                            coloredTitle: {
                                id: 2,
                                type: StructureType.String,
                                title: "Colored Title",
                                value: "ELECTRONIC EXTERIOR TEMPERATURE CONTROL",
                            },

                            paragraph: {
                                id: 3,
                                type: StructureType.String,
                                title: "Paragraph",
                                value: "The digital touch electronic control displays information without having to open the door. For example, the Super Cool function can cool down the internal temperature quickly and the Super Freeze function rapidly creates cold air to preserve fresh items.",
                            },
                            Note: {
                                id: 4,
                                type: StructureType.String,
                                title: "Note",
                                value: "",
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/de35508625/content_ci-led-lighting-min-j5kxwo.png",
                                alt: "featured image",
                            },
                            grayTitle: {
                                id: 1,
                                type: StructureType.String,
                                title: "Gray Title",
                                value: "LED Lighting",
                            },
                            coloredTitle: {
                                id: 2,
                                type: StructureType.String,
                                title: "Colored Title",
                                value: "MAXIMUM BRIGHTNESS",
                            },

                            paragraph: {
                                id: 3,
                                type: StructureType.String,
                                title: "Paragraph",
                                value: "Grabbing snacks in the middle of the night has just become easier thanks to the built-in LED* light. Now, you can quickly find the food or beverage item you're looking for while reducing costs on your power bill at the same time.",
                            },
                            Note: {
                                id: 4,
                                type: StructureType.String,
                                title: "Note",
                                value: "* LED lighting is not an available feature on all refrigerator models.",
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/5bc2704fa7/content_ci-flexible-storage-min-mgis3d.png",
                                alt: "featured image",
                            },
                            grayTitle: {
                                id: 1,
                                type: StructureType.String,
                                title: "Gray Title",
                                value: "Flexible Storage",
                            },
                            coloredTitle: {
                                id: 2,
                                type: StructureType.String,
                                title: "Colored Title",
                                value: "FULLY ADJUSTABLE SHELVES",
                            },
                            paragraph: {
                                id: 3,
                                type: StructureType.String,
                                title: "Paragraph",
                                value: "Enjoy the storage options that the fully adjustable* shelves offer to keep your items organized. Raise the shelf to different shelf-holders to fit larger bottles, jugs or tall layer cakes. Whatever your food storage needs are, our flexible shelving options can help personalize your refrigerator based on your preference.",
                            },
                            Note: {
                                id: 4,
                                type: StructureType.String,
                                title: "Note",
                                value: "* Adjustable shelves is not an available feature on all refrigerator models.",
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/466780d428/content_ci-dual-tech-min-2p7h2a.png",
                                alt: "featured image",
                            },
                            grayTitle: {
                                id: 1,
                                type: StructureType.String,
                                title: "Gray Title",
                                value: "Dual-Tech Cooling",
                            },
                            coloredTitle: {
                                id: 2,
                                type: StructureType.String,
                                title: "Colored Title",
                                value: "PRESERVE THE TASTE",
                            },
                            paragraph: {
                                id: 3,
                                type: StructureType.String,
                                title: "Paragraph",
                                value: "The fridge and freezer zones maintain the ideal humidity level in each compartment, preventing odor transfer and keeping the fresh and original taste longer. Dual-tech Cooling* also helps prevent food from drying out.",
                            },
                            Note: {
                                id: 4,
                                type: StructureType.String,
                                title: "Note",
                                value: "* Dual-Tech Cooling is not an available feature on all refrigerator models.",
                            },
                        },
                    ],
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch("isEmpty")
    onValueChanged() {
        if (this.isEmpty) this.reset();
    }
}
</script>

<style type="text/css"></style>
