<template>
    <div class="tw-grid tw-grid-cols-2 tw-gap-5 tw-px-9 tw-items-start tw-bg-[url(/blocks/demoForm.svg)] tw-bg-cover tw-py-[100px]" v-if="!isEmpty">
        <div class="tw-flex tw-flex-col tw-items-start h-full">
            <h4 class="tw-text-white tw-font-bold tw-text-[40px] tw-m-0 tw-mb-2">{{ model.title.value }}</h4>
            <div class="tw-text-[#CCE2FF] tw-text-lg" v-html="model.description.value"></div>

            <div class="tw-flex tw-gap-2 tw-mt-10">
                <img :src="model.popularImage.src" alt="icon">
                <span class="tw-text-lg tw-font-semibold tw-text-[#3DF110]">{{ model.popularText.value }}</span>
            </div>
            <div class="tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-5 tw-mt-10">
                <div class="tw-flex tw-flex-col tw-gap-3 " v-for="(item, index) in model.list.value" :key="index">
                    <h2 class="tw-text-[32px] tw-font-bold tw-text-white">{{ item.Title.value }}</h2>
                    <div class="tw-text-lg tw-font-semibold tw-text-white" v-html="item.Content.value" />
                </div>
            </div>
        </div>
        <div class="">
            <div class="tw-px-9 tw-grid tw-grid-cols-2 tw-gap-[14px] tw-bg-white tw-rounded-[25px] tw-p-5">
                <div class="tw-bg-[#f5f6f6] tw-h-[44px] tw-relative tw-rounded-md tw-overflow-hidden">
                    <input type="text" class="tw-w-full tw-h-full tw-px-4 tw-bg-[#f5f6f6] tw-pt-4 tw-outline-none" placeholder="Text">
                    <span class="tw-absolute tw-top-[5px] tw-left-4 tw-text-[#035282] tw-text-[10px] tw-font-semibold">First Name*</span>
                </div>
                <div class="tw-bg-[#f5f6f6] tw-h-[44px] tw-relative tw-rounded-md tw-overflow-hidden">
                    <input type="text" class="tw-w-full tw-h-full tw-px-4 tw-bg-[#f5f6f6] tw-pt-4 tw-outline-none" placeholder="Text">
                    <span class="tw-absolute tw-top-[5px] tw-left-4 tw-text-[#035282] tw-text-[10px] tw-font-semibold">Last Name*</span>
                </div>
                <div class="tw-bg-[#f5f6f6] tw-h-[44px] tw-relative tw-rounded-md tw-overflow-hidden">
                    <input type="text" class="tw-w-full tw-h-full tw-px-4 tw-bg-[#f5f6f6] tw-pt-4 tw-outline-none" placeholder="Text">
                    <span class="tw-absolute tw-top-[5px] tw-left-4 tw-text-[#035282] tw-text-[10px] tw-font-semibold">Email*</span>
                </div>
                <div class="tw-bg-[#f5f6f6] tw-h-[44px] tw-relative tw-rounded-md tw-overflow-hidden">
                    <input type="text" class="tw-w-full tw-h-full tw-px-4 tw-bg-[#f5f6f6] tw-pt-4 tw-outline-none" placeholder="Text">
                    <span class="tw-absolute tw-top-[5px] tw-left-4 tw-text-[#035282] tw-text-[10px] tw-font-semibold">Phone Number</span>
                </div>
                <div class="tw-bg-[#f5f6f6] tw-h-[44px] tw-relative tw-rounded-md tw-overflow-hidden">
                    <input type="text" class="tw-w-full tw-h-full tw-px-4 tw-bg-[#f5f6f6] tw-pt-4 tw-outline-none" placeholder="Text">
                    <span class="tw-absolute tw-top-[5px] tw-left-4 tw-text-[#035282] tw-text-[10px] tw-font-semibold">Company Name*</span>
                </div>
                <div class="tw-bg-[#f5f6f6] tw-h-[44px] tw-relative tw-rounded-md tw-overflow-hidden">
                    <input type="text" class="tw-w-full tw-h-full tw-px-4 tw-bg-[#f5f6f6] tw-pt-4 tw-outline-none" placeholder="Text">
                    <span class="tw-absolute tw-top-[5px] tw-left-4 tw-text-[#035282] tw-text-[10px] tw-font-semibold">Website URL</span>
                </div>
                <div class="tw-bg-[#f5f6f6] tw-h-[44px] tw-relative tw-rounded-md tw-overflow-hidden tw-col-span-2">
                    <!-- <input type="text" class="tw-w-full tw-h-full tw-px-4 tw-bg-[#f5f6f6] tw-pt-4 tw-outline-none" placeholder="IMDigital"> -->
                    <select name="cars" id="cars" class="tw-w-full tw-h-full tw-px-4 tw-bg-[#f5f6f6] tw-pt-4 tw-outline-none" placeholder="IMDigital">
                        <option value="volvo">Test</option>
                    </select>
                    <span class="tw-absolute tw-top-[5px] tw-left-4 tw-text-[#035282] tw-text-[10px] tw-font-semibold">Product of interest*</span>
                </div>
                <label class="tw-col-span-2">
                    <input type="checkbox" checked>
                    <span class="checkmark"></span>
                    Subscribe to IMDigital's marketing blog 
                </label>
                <div class="tw-col-span-2">
                    <div class="tw-text-sm" v-html="model.policy.value"></div>
                    <button
                        class="tw-inline-flex tw-text-sm tw-text-[#1042F1]">
                        {{ model.link.value }}
                    </button>
                </div>
                <button class="tw-h-[48px] tw-rounded-md tw-col-span-2 tw-border tw-border-solid tw-border-[#3df110] tw-text-[#3df110] tw-mt-[60px]">Get your free demo</button>
            </div>
            <div class="tw-text-white tw-mt-5 tw-text-center tw-text-lg">{{ model.join.value }}</div>
        </div>
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
        blockAddItem(this.model, 'title', {
            id: 0,
            type: StructureType.String,
            title: 'Title',
            value: 'Get a Free Demo of IMDigital Platform'
        });
        blockAddItem(this.model, 'description', {
            id: 1,
            type: StructureType.SimpleText,
            title: 'Text',
            value: 'IMDigital platform has all the tools you need for marketing, sales, content management, operations, and customer service. Each product in the platform is powerful alone, but the real magic happens when you use them together.'
        });
        blockAddItem(this.model, 'policy', {
            id: 1,
            type: StructureType.SimpleText,
            title: 'Text',
            value: `We're committed to your privacy. IMDigital uses the information you provide to us to contact you about our relevant content, products, and services. You may unsubscribe from these communications at any time. For more information, check out our Privacy Policy.`
        });
        blockAddItem(this.model, 'list', {
            id: 2,
            type: StructureType.List,
            title: 'Feauture List',
            newItem: {
                Title: {
                    id: 0,
                    type: StructureType.String,
                    title: 'Feauture Title',
                    value: ''
                },
                Content: {
                    id: 1,
                    type: StructureType.SimpleText,
                    title: 'Feauture Content',
                    value: ''
                }
            },
            value: [
                {
                    Title: {
                        id: 0,
                        type: StructureType.String,
                        title: 'Feauture Title',
                        value: 'Marketing'
                    },
                    Content: {
                        id: 1,
                        type: StructureType.SimpleText,
                        title: 'Feauture Content',
                        value: 'Lead generation Marketing automation Multi-touch revenue attribution'
                    }
                }
            ]
        });
        blockAddItem(this.model, 'link', {
            id: 3,
            type: StructureType.Url,
            title: 'Privacy Policy',
            value: 'Privacy Policy',
        });
        blockAddItem(this.model, 'join', {
            id: 4,
            type: StructureType.String,
            title: 'Join Text',
            value: 'Join over +15,000 happy clients!'
        });
        blockAddItem(this.model, 'popularImage', {
            id: 5,
            type: StructureType.Image,
            title: 'Upload Image',
            src: 'blocks/featureIcon.svg',
            alt: 'Some note about this image',
        });
        blockAddItem(this.model, 'popularText', {
            id: 6,
            type: StructureType.String,
            title: 'Popular Text',
            value: 'Popular Features'
        });
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
