<template>
    <div class="tw-grid tw-grid-cols-2 tw-items-center tw-bg-[#1042f1]" v-if="!isEmpty">
        <div class="tw-flex tw-flex-col tw-items-start tw-justify-center tw-space-y-6 h-full tw-p-9">
            <h4 class="tw-text-[#3df110] tw-font-semibold tw-text-lg tw-m-0 tw-mb-2">{{ model.smallTitle.value }}</h4>
            <h2 class="tw-text-white tw-font-bold tw-leading-[48px] tw-m-0">{{ model.text.value }}</h2>
            <p class="tw-text-[#cce2ff] tw-text-lg tw-mt-[34px]" v-html="model.description.value" />
            <div class="tw-flex tw-items-center tw-gap-[32px]">
                <button class="tw-py-3 tw-px-6 tw-bg-[#3df110] tw-text-[#0c2445] tw-text-lg tw-font-semibold tw-rounded-md tw-flex tw-items-center tw-gap-2">
                    {{ model.demo.value }}
                    <img src="@/assets/svgs/arrow-right.svg" alt="icon">
                </button>
                <button class="tw-py-3 tw-px-6 tw-border-[#3df110] tw-border tw-rounded-md tw-text-[#3df110]">{{ model.contact.value }}</button>
            </div>
        </div>
        <img :src="model.image.src" :alt="model.image.alt">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";


@Component
export default class BlockTextIntroduction extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'smallTitle', {
            id: 0,
            type: StructureType.String,
            title: 'Samll Title',
            value: 'IM DIGITAL SUITE'
        });
        blockAddItem(this.model, 'text', {
            id: 1,
            type: StructureType.SimpleText,
            title: 'Text',
            value: 'Simplified digital tools and processes for complex modern businesses'
        });
        blockAddItem(this.model, 'description', {
            id: 2,
            type: StructureType.SimpleText,
            title: 'Description Text',
            value: 'Help team to tell their stories, manage their products and clients, and automate their data-driven processes.'
        });
        blockAddItem(this.model, 'demo', {
            id: 3,
            type: StructureType.Url,
            title: 'Demo Button',
            value: 'Get a Demo',
        });
        blockAddItem(this.model, 'contact', {
            id: 4,
            type: StructureType.Url,
            title: 'Contact Us Button',
            value: 'Contact Us',
        });

        blockAddItem(this.model, 'image', {
            id: 3,
            type: StructureType.Image,
            title: 'Upload Image',
            src: 'blocks/banner.svg',
            alt: 'Some note about this image',
        });
        // blockAddItem(this.model, 'file', {
        //     id: 4,
        //     type: StructureType.File,
        //     title: 'Upload File',
        //     src: '',
        //     alt: 'upload file',
        // });
        this.model = {...this.model}
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
