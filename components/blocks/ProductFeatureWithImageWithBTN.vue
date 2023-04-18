<template>
    <div>
        <img src="/blocks/ProductFeatureWithImageWithBTN.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import { Direction } from "~/interfaces/DirectionEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlockProductFeatureWithImage extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;
    Direction = Direction;

    product: Object = {};
    loadingProduct: boolean = true;

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
        blockAddItem(this.model, "direction", {
            id: 1,
            type: StructureType.Select,
            title: "Direction",
            value: Direction.ltr,
            items: [
                { title: "Left To Right", value: this.Direction.ltr },
                { title: "Right To Left", value: this.Direction.rtl },
            ],
        });
        blockAddItem(this.model, "title", {
            id: 2,
            type: StructureType.String,
            title: "Title",
            value: "Android TV",
        });
        blockAddItem(this.model, "paragraphOne", {
            id: 3,
            type: StructureType.String,
            title: "Paragraph One",
            value: "Puts your favourite content front and center. Where it’s ready to watch or pick up where you left off. Stream more than 500,000 shows, movies and apps, as well as watch live sports and news.",
        });
        blockAddItem(this.model, "paragraphTwo", {
            id: 4,
            type: StructureType.String,
            title: "Description",
            value: "With the Google Assistant built-in, you can turn on the lights, change the thermostat, add stuff to your grocery list, and control your TV with your voice. And with universal search, you can even get recommendations with Android TV.",
        });
        blockAddItem(this.model, "learn_more", {
            id: 5,
            type: StructureType.Url,
            target: "_self",
            title: "Learn More",
            value: "",
        });
        blockAddItem(this.model, "image", {
            id: 6,
            type: StructureType.Image,
            title: "Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/26632e121d/pdp-3_6-u9-50-50-feat-1__ScaleMaxWidthWzMwNDhd.jpg-t34p4p.jpg",
            alt: "featured image",
        });
        blockAddItem(this.model, "link", {
            id: 7,
            type: StructureType.Url,
            target: "_self",
            title: "Link",
            value: "/",
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
