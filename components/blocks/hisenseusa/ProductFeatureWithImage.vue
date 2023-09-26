<template>
    <div
        class="tw-flex tw-items-center"
        :class="{
            'tw-flex-row-reverse': model.direction.value === Direction.rtl,
        }"
        v-if="!isEmpty"
    >
        <div class="tw-flex-1">
            <img
                :src="model.image.src"
                style="width: 720px; height: 720px"
                class="tw-bg-grey-50 tw-object-cover"
                :alt="model.image.alt"
            />
        </div>

        <div
            class="tw-flex-1 tw-flex tw-flex-col tw-items-start tw-justify-center tw-space-y-6 h-full tw-p-9"
        >
            <h4 class="small-title tw-text-black">
                {{ model.littleTitle.value }}
            </h4>
            <h2 class="large-title tw-text-black">{{ model.title.value }}</h2>
            <p class="paragraph tw-text-black">
                {{ model.description.value }}
            </p>
        </div>
    </div>
    <!--  <div>-->
    <!--    <img src="/blocks/ProductFeatureWithImage.png" alt=""/>-->
    <!--  </div>-->
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";
import { Direction } from "~/interfaces/DirectionEnum";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class ProductFeatureWithImage extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;
    Direction = Direction;

    product: Object = {};
    loadingProduct: boolean = true;

    mounted() {
        blockAddItem(this.model, "template", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: "v1",
            items: [
                { title: "Version 1", value: "v1" },
                { title: "Version 2", value: "v2" },
            ],
        });
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
        blockAddItem(this.model, "littleTitle", {
            id: 2,
            type: StructureType.String,
            title: "Little Title",
            value: "4K ULED ™",
        });
        blockAddItem(this.model, "title", {
            id: 3,
            type: StructureType.String,
            title: "Title",
            value: "Sharper, smoother pictures",
        });
        blockAddItem(this.model, "description", {
            id: 4,
            type: StructureType.String,
            title: "Description",
            value: "4K greatness, but better. The U8G has our exclusive ULED technologies. They boost color, contrast, brightness, motion… we could go on. It’s the TV your old TV wants to be.",
        });
        blockAddItem(this.model, "image", {
            id: 5,
            type: StructureType.Image,
            title: "Image",
            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/26632e121d/pdp-3_6-u9-50-50-feat-1__ScaleMaxWidthWzMwNDhd.jpg-t34p4p.jpg",
            alt: "featured image",
        });
        blockAddItem(this.model, "link", {
            id: 6,
            type: StructureType.Url,
            target: "_self",
            title: "Shop TV",
            value: "/",
        });
        blockAddItem(this.model, "backgroundColor", {
            id: 7,
            type: StructureType.Color,
            title: "Background color",
            value: "#fff",
        });
        blockAddItem(this.model, "textColor", {
            id: 8,
            type: StructureType.Color,
            title: "Text color",
            value: "#fff",
        });

        // blockRemoveItem(this.model , ['textColor']);

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css">
.small-title {
    font-size: 15px;
    font-weight: 700;
}

.large-title {
    font-size: 42px;
    font-weight: 700;
}

.paragraph {
    font-size: 18px;
    font-weight: 400;
}
</style>
