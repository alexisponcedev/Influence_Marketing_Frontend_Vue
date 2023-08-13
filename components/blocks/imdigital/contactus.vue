<template>
    <div class="tw-grid tw-grid-cols-2 tw-gap-5 tw-px-9 tw-items-start tw-bg-[url(/blocks/contactus.svg)] tw-bg-cover tw-py-[100px]" v-if="!isEmpty">
        <div class="tw-flex tw-flex-col tw-items-start h-full">
            <h4 class="tw-text-white tw-font-bold tw-text-[40px] tw-m-0 tw-mb-2">{{ model.smallTitle.value }}</h4>
            <div class="tw-text-[#CCE2FF] tw-text-lg">{{ model.text.value }}</div>
            <ul>
                <li class="tw-text-[#CCE2FF] tw-text-lg" v-for="(item, index) in model.list.value" :key="index">{{ item.List.value }}</li>
            </ul>
        </div>
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
                <span class="tw-absolute tw-top-[5px] tw-left-4 tw-text-[#035282] tw-text-[10px] tw-font-semibold">Topic*</span>
            </div>
            <div class="tw-bg-[#f5f6f6] tw-h-[102px] tw-relative tw-rounded-md tw-overflow-hidden tw-col-span-2">
                <textarea type="text" class="tw-w-full tw-h-full tw-px-4 tw-bg-[#f5f6f6] tw-pt-4 tw-outline-none" placeholder="Message" />
            </div>

            <button class="tw-h-[48px] tw-rounded-md tw-col-span-2 tw-border tw-border-solid tw-border-[#3df110] tw-text-[#3df110] tw-mt-[60px]">Send Message</button>
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
        blockAddItem(this.model, 'smallTitle', {
            id: 0,
            type: StructureType.String,
            title: 'Samll Title',
            value: 'Ready for the future?'
        });
        blockAddItem(this.model, 'text', {
            id: 1,
            type: StructureType.String,
            title: 'Text',
            value: 'Contact us today to:'
        });
        blockAddItem(this.model, 'list', {
            id: 2,
            type: StructureType.List,
            title: 'List Item',
            newItem: {
                List: {
                    id: 0,
                    type: StructureType.String,
                    title: '',
                    value: ''
                }
            },
            value: [
                {
                    List: {
                        id: 0,
                        type: StructureType.String,
                        title: 'item',
                        value: 'Discover IMDigital’s powerful content management capabilities'
                    }
                }
            ]
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
