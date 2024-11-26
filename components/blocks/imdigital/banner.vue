<template>
    <div v-if="!isEmpty">
        <div v-if="model.template.value === 'v1'" class="tw-grid tw-grid-cols-2 tw-items-center tw-bg-[#1042f1]">
            <div class="tw-flex tw-flex-col tw-items-start tw-justify-center tw-space-y-6 h-full tw-p-9">
                <h4 class="tw-text-[#3df110] tw-font-semibold tw-text-lg tw-m-0 tw-mb-2">{{
                        model.smallTitle.value
                    }}</h4>
                <h2 class="tw-text-white tw-font-bold tw-leading-[48px] tw-m-0" v-html="model.text.value" />
                <p class="tw-text-[#cce2ff] tw-text-lg tw-mt-[34px]" v-html="model.description.value"/>
                <div class="tw-flex tw-items-center tw-gap-[32px]">
                    <button
                        class="tw-py-3 tw-px-6 tw-bg-[#3df110] tw-text-[#0c2445] tw-text-lg tw-font-semibold tw-rounded-md tw-flex tw-items-center tw-gap-2">
                        {{ model.demo.value }}
                        <img src="@/assets/svgs/arrow-right.svg" alt="icon">
                    </button>
                    <button class="tw-py-3 tw-px-6 tw-border-[#3df110] tw-border tw-rounded-md tw-text-[#3df110]">
                        {{ model.contact.value }}
                    </button>
                </div>
            </div>
            <img :src="model.image.src" :alt="model.image.alt">
        </div>

        <div v-else class="tw-grid tw-grid-cols-2 tw-items-end tw-bg-[#1042f1] tw-py-10">
            <div class="tw-flex tw-flex-col tw-items-start tw-justify-center tw-space-y-6 h-full tw-p-9">
                <h4 class="tw-text-[#3df110] tw-font-semibold tw-text-lg tw-m-0 tw-mb-1">{{
                        model.smallTitle.value
                    }}</h4>
                <h2 class="tw-text-white tw-font-bold tw-leading-[48px] tw-m-0 tw-mt-0" v-html="model.text.value" />
            </div>
            <img :src="model.image.src" :alt="model.image.alt">
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import {Theme} from "~/interfaces/ThemeEnum";
import blockRemoveItem from "~/utils/blockRemoveItem";


@Component
export default class BlockTextIntroduction extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    prepare() {
        blockAddItem(this.model, 'smallTitle', {
            id: 1,
            type: StructureType.String,
            title: 'Samll Title',
            value: 'IM DIGITAL SUITE'
        });
        blockAddItem(this.model, 'text', {
            id: 2,
            type: StructureType.SimpleText,
            title: 'Text',
            value: 'Simplified digital tools and processes for complex modern businesses'
        });
        blockAddItem(this.model, 'image', {
            id: 3,
            type: StructureType.Image,
            title: 'Upload Image',
            src: 'blocks/banner.svg',
            alt: 'Some note about this image',
        });

        if (this.model.template.value === 'v1') {
            blockAddItem(this.model, 'description', {
                id: 4,
                type: StructureType.SimpleText,
                title: 'Description Text',
                value: 'Help team to tell their stories, manage their products and clients, and automate their data-driven processes.'
            });
            blockAddItem(this.model, 'demo', {
                id: 5,
                type: StructureType.Url,
                title: 'Demo Button',
                value: 'Get a Demo',
            });
            blockAddItem(this.model, 'contact', {
                id: 6,
                type: StructureType.Url,
                title: 'Contact Us Button',
                value: 'Contact Us',
            });
        } else
            blockRemoveItem(this.model, ['description', 'demo', 'contact'])

        this.model = {...this.model}
    }

    mounted() {
        blockAddItem(this.model, 'template', {
            id: 0,
            type: StructureType.Select,
            title: 'Template',
            value: 'v1',
            items: [
                {title: 'Version 1', value: 'v1'},
                {title: 'Version 2', value: 'v2'},
            ]
        })
        this.prepare();
    }

    get template(){
        return this.model && this.model.template ? this.model.template.value : '';
    }

    @Watch('template')
    onTemplateChanged(){
        this.prepare();
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
