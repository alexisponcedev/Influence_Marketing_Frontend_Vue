<template>
    <div>
        <img src="/blocks/LaserHead.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class BlockLaserHead extends Vue {
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
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Upload Image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/98546a4425/lasertv4k-logo-white__ScaleMaxWidthWzMwNDhd.png-40bmxc.png",
                    alt: "Some note about this image",
                },
                title: {
                    id: 2,
                    type: StructureType.String,
                    title: "Title",
                    value: "BIG.BOLD.BEAUTIFUL.",
                },
                paragraph: {
                    id: 3,
                    type: StructureType.String,
                    title: "Paragraph",
                    value: "Every seat in your house becomes the best seat with the Hisense 100” and 120” 4K UHD Smart Laser TV with Wide Color Gamut. Immerse yourself in this incredible TV and experience the game, a movie, or your favorite TV show like never before.",
                },
                link: {
                    id: 4,
                    type: StructureType.Url,
                    target: "_self",
                    title: "SHOP LASER TVs",
                    value: "https://www.hisense-usa.com/tv-and-audio/televisions/all-tvs/?prop301=Laser+Display",
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
