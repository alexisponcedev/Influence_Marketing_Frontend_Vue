<template>
    <div class="tw-pt-[140px] tw-pb-[50px] tw-bg-white" v-if="!isEmpty">
        <div class="tw-flex tw-flex-col tw-items-start tw-justify-center h-full tw-px-9">
            <h4 class="tw-text-[#0C2445] tw-font-bold tw-text-[32px] tw-m-0 tw-mb-2 tw-max-w-[50%] tw-mb-[60px]">{{ model.title.value }}</h4>

            <div class="tw-grid tw-grid-cols-2 tw-gap-5">
                <div class="tw-flex tw-items-center tw-flex-col tw-gap-5">
                    <div class="tw-flex tw-flex-col tw-overflow-hidden" v-for="(item, index) in model.list.value" :key="index" @click="activeItem = item, activeIndex = index">
                        <div class="tw-flex tw-items-start tw-gap-5">
                            <div class="tw-flex tw-items-center tw-justify-center tw-w-[32px] tw-h-[32px] tw-min-w-[32px] tw-rounded-full tw-bg-[#0b33c1]">
                                <img src="@/assets/svgs/check.svg" alt="icon">
                            </div>
                            <div class="tw-font-bold tw-text-[24px] tw-text-[#0c2445]">{{ item.Title.value }}</div>
                        </div>
                        <div class="tw-text-md tw-text-[#0c2445] tw-ml-[52px] tw-mt-3" :class="{'tw-h-0' : activeIndex !== index}">{{ item.Description.value }}</div>
                    </div>
                </div>
                <div class="tw-flex tw-items-end" v-if="activeItem">
                    <img :src="activeItem.Image.src" :alt="activeItem.Image.alt">
                </div>
            </div>
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

    data() {
        return {
            activeItem: null,
            activeIndex: null
        }
    }

    mounted() {
        blockAddItem(this.model, 'title', {
            id: 0,
            type: StructureType.String,
            title: 'Title',
            value: 'Powerful Content Experience Management'
        });
        blockAddItem(this.model, 'list', {
            id: 1,
            type: StructureType.List,
            title: 'List Item',
            newItem: {
                Title: {
                    id: 0,
                    type: StructureType.String,
                    title: 'Title',
                    value: ''
                },
                Description: {
                    id: 1,
                    type: StructureType.SimpleText,
                    title: 'Description',
                    value: ''
                },
                Image: {
                    id: 2,
                    type: StructureType.Image,
                    title: 'Upload Image',
                    src: '',
                    alt: '',
                }
            },
            value: [
                {
                    Title: {
                        id: 0,
                        type: StructureType.String,
                        title: 'Title',
                        value: 'Effectively build and manage any kind of page'
                    },
                    Description: {
                        id: 1,
                        type: StructureType.SimpleText,
                        title: 'Description',
                        value: 'Building websites with page builders using components. Admin can customize contents of components.'
                    },
                    Image: {
                        id: 2,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'blocks/featureItem.png',
                        alt: 'alt image',
                    }
                },
                {
                    Title: {
                        id: 0,
                        type: StructureType.String,
                        title: 'Title',
                        value: 'Effectively build and manage any'
                    },
                    Description: {
                        id: 1,
                        type: StructureType.SimpleText,
                        title: 'Description',
                        value: 'Building websites with page builders using components. Admin can customize contents of components.'
                    },
                    Image: {
                        id: 2,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'blocks/featureItem.png',
                        alt: 'alt image',
                    }
                },
                {
                    Title: {
                        id: 0,
                        type: StructureType.String,
                        title: 'Title',
                        value: 'Organic Search'
                    },
                    Description: {
                        id: 1,
                        type: StructureType.SimpleText,
                        title: 'Description',
                        value: 'Building websites with page builders using components. Admin can customize contents of components.'
                    },
                    Image: {
                        id: 2,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'blocks/featureItem.png',
                        alt: 'alt image',
                    }
                },
                {
                    Title: {
                        id: 0,
                        type: StructureType.String,
                        title: 'Title',
                        value: 'Effectively build and manage any kind of page'
                    },
                    Description: {
                        id: 1,
                        type: StructureType.SimpleText,
                        title: 'Description',
                        value: 'Building websites with page builders using components. Admin can customize contents of components.'
                    },
                    Image: {
                        id: 2,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'blocks/featureItem.png',
                        alt: 'alt image',
                    }
                },
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
