<template>
    <div>
        <img src="/blocks/ProductFeaturesWithIcon.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import { Direction } from "~/interfaces/DirectionEnum";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class BlockProductFeaturesWithIcon extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    prepare() {
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

        blockAddItem(this.model, "image", {
            id: 1,
            type: StructureType.Image,
            title: "Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/26632e121d/pdp-3_6-u9-50-50-feat-1__ScaleMaxWidthWzMwNDhd.jpg-t34p4p.jpg",
            alt: "featured image",
        });
        blockAddItem(this.model, "blackTitle", {
            id: 2,
            type: StructureType.String,
            title: "Black Title",
            value: "All the tech.",
        });
        blockAddItem(this.model, "coloredTitle", {
            id: 3,
            type: StructureType.String,
            title: "Colored Title",
            value: "None of the tech B.S.",
        });
        blockAddItem(this.model, "paragraph", {
            id: 4,
            type: StructureType.Text,
            title: "Paragraph",
            value: "A great TV is just a great TV. Not an ‘immersive harmony of sound and vision’. Cut through the usual tech B.S with our jargon / jargoff filter.",
        });

        if (this.model.button.value === "active") {
            blockAddItem(this.model, "listOn", {
                id: 6,
                type: StructureType.List,
                title: "JARGON List",
                newItem: {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: "Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/d69cbda3b2/cat-uled-tvs-feature-icon-1__ScaleMaxWidthWzMwNDhd.png-k1h7gm.png",
                        alt: "featured image",
                    },
                    paragraph: {
                        id: 1,
                        type: StructureType.String,
                        title: "Paragraph",
                        value: "A suite of technology that enables seamless working between hardware and software.",
                    },
                },
                value: [
                    {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/21b477d765/cat-uled-tvs-feature-icon-2__ScaleMaxWidthWzMwNDhd.png-ooz44y.png",
                            alt: "featured image",
                        },
                        paragraph: {
                            id: 1,
                            type: StructureType.String,
                            title: "Paragraph",
                            value: "Color you can feel in every pixel.",
                        },
                    },
                    {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/c7286b686b/cat-uled-tvs-feature-icon-3__ScaleMaxWidthWzMwNDhd.png-bl0kbm.png",
                            alt: "featured image",
                        },
                        paragraph: {
                            id: 1,
                            type: StructureType.String,
                            title: "Paragraph",
                            value: "The fusion of these technologies transforms your TV into an entertainment powerhouse.",
                        },
                    },
                    {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/405b12ad15/cat-uled-tvs-feature-icon-4__ScaleMaxWidthWzMwNDhd.png-s50tdu.png",
                            alt: "featured image",
                        },
                        paragraph: {
                            id: 1,
                            type: StructureType.String,
                            title: "Paragraph",
                            value: "With built-in microphones you can make your TV the centre-piece of the room.",
                        },
                    },

                    {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/df178c4db4/cat-uled-tvs-feature-icon-5__ScaleMaxWidthWzMwNDhd.png-sontp4.png",
                            alt: "featured image",
                        },
                        paragraph: {
                            id: 1,
                            type: StructureType.String,
                            title: "Paragraph",
                            value: "Take your viewing experience further by maximising your highlights and lowlights.",
                        },
                    },
                ],
            });
            blockAddItem(this.model, "listOff", {
                id: 7,
                type: StructureType.List,
                title: "JARGOFF List",
                newItem: {
                    image: {
                        id: 0,
                        type: StructureType.Image,
                        title: "Image",
                        src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/d69cbda3b2/cat-uled-tvs-feature-icon-1__ScaleMaxWidthWzMwNDhd.png-k1h7gm.png",
                        alt: "featured image",
                    },
                    paragraph: {
                        id: 1,
                        type: StructureType.String,
                        title: "Paragraph",
                        value: "Always shows the best possible picture.",
                    },
                },
                value: [
                    {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/21b477d765/cat-uled-tvs-feature-icon-2__ScaleMaxWidthWzMwNDhd.png-ooz44y.png",
                            alt: "featured image",
                        },
                        paragraph: {
                            id: 1,
                            type: StructureType.String,
                            title: "Paragraph",
                            value: "Makes every day look like the 4th of July.",
                        },
                    },
                    {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/c7286b686b/cat-uled-tvs-feature-icon-3__ScaleMaxWidthWzMwNDhd.png-bl0kbm.png",
                            alt: "featured image",
                        },
                        paragraph: {
                            id: 1,
                            type: StructureType.String,
                            title: "Paragraph",
                            value: "The same technology that you see and hear at the cinema, now in your home.",
                        },
                    },
                    {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/405b12ad15/cat-uled-tvs-feature-icon-4__ScaleMaxWidthWzMwNDhd.png-s50tdu.png",
                            alt: "featured image",
                        },
                        paragraph: {
                            id: 1,
                            type: StructureType.String,
                            title: "Paragraph",
                            value: "Talking to your TV is a whole lot easier.",
                        },
                    },

                    {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/df178c4db4/cat-uled-tvs-feature-icon-5__ScaleMaxWidthWzMwNDhd.png-sontp4.png",
                            alt: "featured image",
                        },
                        paragraph: {
                            id: 1,
                            type: StructureType.String,
                            title: "Paragraph",
                            value: "Makes the darks darker, keeps the brights brighter.",
                        },
                    },
                ],
            });
        } else blockRemoveItem(this.model, ["listOn", "listOff"]);

        this.model = { ...this.model };
    }

    mounted() {
        blockAddItem(this.model, "button", {
            id: 5,
            type: StructureType.Select,
            title: "Jarg Button Status",
            value: "active",
            items: [
                { title: "Active", value: "active" },
                { title: "Deactive", value: "deactive" },
            ],
        });
        this.prepare();
    }

    get button() {
        return this.model && this.model.button ? this.model.button.value : "";
    }

    @Watch("button")
    onButtonChanged() {
        this.prepare();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    // @Watch("isEmpty")
    // onValueChanged() {
    //     if (this.isEmpty) this.reset();
    // }
}
</script>

<style type="text/css"></style>
