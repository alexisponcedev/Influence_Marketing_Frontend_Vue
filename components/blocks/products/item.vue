<template>
    <div v-if="!isEmpty" class="product-container">
        <div class="tw-flex tw-justify-between tw-items-center">
            <div class="product-class">50" Class</div>
            <div class="product-model">{{ model.model }}</div>
        </div>

        <div class="product-new"><span v-if="model.isNew">New</span></div>

        <div class="tw-flex tw-items-center tw-justify--center">
            <img
                :src="Image"
                alt="image address"
                class="product-image tw-mx-auto tw-mb-6"
            />
        </div>

        <div class="product-series tw-mb-12"></div>

        <div class="product-detail tw-mb-6">{{ model.name }}</div>

        <div
            class="tw-flex tw-justify-center tw-items-center tw-space-x-2 tw-mb-6"
        >
            <div class="product-coming-soon">Coming Soon</div>
            <div class="product-link">View Product</div>
        </div>

        <div class="tw-flex tw-items-center tw-justify-center tw-space-x-4">
            <img src="@/assets/svgs/compare.svg" alt="compare icon" />
            <span class="compare-text">Add to compare</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";

@Component
export default class LandingSlider extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        if (this.isEmpty)
            this.model = {
                url: {
                    id: 0,
                    type: StructureType.Url,
                    target: "_self",
                    title: "PIM URL",
                    value: "https://load-from-pim-server.com/api",
                },
            };
    }

    get Image() {
        return this.model && this.model.media && this.model.media.url !== ""
            ? this.model.media.url
            : "https://assets.hisense-usa.com/assets/GalleryImages/Product/475/cbf5a253da/a4gv___ScaleMaxWidthWzY0MF0.png";
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style scoped>
.product-container {
    padding: 29px;
}

.product-class {
    font-family: "hisense", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    color: #565656;
}

.product-model {
    font-family: "hisense", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    text-align: right;
    color: #5a5b75;
}

.product-new {
    font-family: "hisense", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    text-align: right;
    color: #00cccc;
}

.product-image {
    max-height: 221px;
}

.product-class {
    border: 1px solid #a2a2a2;
    border-radius: 7px;
    padding: 3px;

    font-family: "hisense", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    color: #565656;
}

.product-series {
    font-family: "hisense", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 36px;
    text-align: center;
    color: #00cccc;
}

.product-detail {
    font-family: "hisense", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 26px;
    text-align: center;
    color: #5a5b75;
}

.product-coming-soon {
    background-color: #d0d0d0;
    font-family: "hisense", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 48px;
    width: 100%;
    text-align: center;
    color: #ffffff;
}

.product-link {
    background: #00cccc;
    font-family: "hisense", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 48px;
    text-align: center;
    width: 100%;

    color: #ffffff;
}

.compare-text {
    font-family: "hisense", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 48px;
    text-align: center;
    color: #000000;
}
</style>
