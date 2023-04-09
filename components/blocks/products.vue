<template>
    <div class="tw-grid tw-grid-cols-2 tw-items-end tw-py-[75px]" v-if="!isEmpty">
        <div class="tw-flex tw-flex-col tw-items-start tw-justify-end h-full tw-px-9">
            <h4 class="tw-text-[#030d30] tw-font-semibold tw-text-[32px] tw-m-0">{{ model.smallTitle.value }}</h4>
            <h2 class="tw-text-[#030d30] tw-text-lg tw-font-semibold tw-m-0">{{ model.text.value }}</h2>
            <p class="tw-text-[#030d30] tw-text-lg tw-mt-[10px]" v-html="model.description.value" />
            <div class="tw-flex tw-items-center tw-gap-[32px]">
                <button class="tw-mt-3 tw-text-[#1042f1] tw-text-lg tw-font-semibold tw-rounded-md tw-flex tw-items-center tw-gap-2">
                    {{ model.more.value }}
                    <img src="@/assets/svgs/arrow-right-blue.svg" alt="icon">
                </button>
            </div>
        </div>
        <img :src="model.image.src" :alt="model.image.alt" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlockTextIntroduction extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "smallTitle", {
            id: 0,
            type: StructureType.String,
            title: "Samll Title",
            value: "IM CXM",
        });
        blockAddItem(this.model, "text", {
            id: 1,
            type: StructureType.String,
            title: "Text",
            value: "Content Experience Management",
        });
        blockAddItem(this.model, "description", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Description Text",
            value: "CXM is a Headless CMS with a Visual Editor for developers, marketers & content editors",
        });
        blockAddItem(this.model, "more", {
            id: 4,
            type: StructureType.Url,
            title: "More Button",
            value: "More",
        });

        blockAddItem(this.model, "image", {
            id: 5,
            type: StructureType.Image,
            title: "Upload Image",
            src: "blocks/products.svg",
            alt: "Some note about this image",
        });
        blockAddItem(this.model, "direction", {
            id: 5,
            type: StructureType.Select,
            title: "Direction",
            value: "ltr",
            items: [
                { title: "Left to Right", value: "ltr" },
                { title: "Right to Left", value: "rtl" },
            ],
        });
        // blockAddItem(this.model, 'file', {
        //     id: 4,
        //     type: StructureType.File,
        //     title: 'Upload File',
        //     src: '',
        //     alt: 'upload file',
        // });
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
