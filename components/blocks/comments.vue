<template>
    <div class="tw-container" v-if="!isEmpty">
        <span class="tw-flex tw-w-1/3 tw-h-px tw-bg-[#1954ed] tw-absolute tw-left-0 tw-top-[102px]"></span>
        <div class="tw-px-9 tw-text-[#030D30] tw-text-[32px] tw-leading-10 tw-m-0 tw-pb-[75px] tw-pt-[155px]" v-html="model.text.value" />

        <div class="tw-text-[40px] tw-font-bold tw-[#030D30] tw-px-10 tw-text-center tw-mb-20">“Our website is doing exactly what we wanted. Generating new leads every week!”</div>
        <div class="tw-flex tw-gap-10 tw-justify-between tw-px-9">
            <div class="tw-flex tw-flex-col" v-for="(item, index) in model.list.value" :key="index">
                <h2 class="tw-text-[24px] tw-text-[#030D30]">{{ item.Name.value }}</h2>
                <div class="tw-text-lg tw-font-semibold tw-text-[#030D30]">{{ item.Post.value }}</div>
                <img :src="item.Image.src" :alt="item.Image.alt">
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

    mounted() {
        blockAddItem(this.model, 'text', {
            id: 0,
            type: StructureType.String,
            title: 'Text',
            value: 'What our clients are saying'
        });
        blockAddItem(this.model, 'list', {
            id: 1,
            type: StructureType.List,
            title: 'List Item',
            newItem: {
                Name: {
                    id: 0,
                    type: StructureType.String,
                    title: 'Name',
                    value: ''
                },
                Post: {
                    id: 1,
                    type: StructureType.String,
                    title: 'Post',
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
                    Name: {
                        id: 0,
                        type: StructureType.String,
                        title: 'Name',
                        value: 'Sanele Gwala'
                    },
                    Post: {
                        id: 1,
                        type: StructureType.String,
                        title: 'Post',
                        value: 'Regional Marketing Manager'
                    },
                    Image: {
                        id: 2,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'blocks/comment.svg',
                        alt: 'alt image',
                    }
                },
                {
                    Name: {
                        id: 0,
                        type: StructureType.String,
                        title: 'Name',
                        value: 'Sanele Gwala'
                    },
                    Post: {
                        id: 1,
                        type: StructureType.String,
                        title: 'Post',
                        value: 'Regional Marketing Manager'
                    },
                    Image: {
                        id: 2,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'blocks/comment.svg',
                        alt: 'alt image',
                    }
                },
                {
                    Name: {
                        id: 0,
                        type: StructureType.String,
                        title: 'Name',
                        value: 'Sanele Gwala'
                    },
                    Post: {
                        id: 1,
                        type: StructureType.String,
                        title: 'Post',
                        value: 'Regional Marketing Manager'
                    },
                    Image: {
                        id: 2,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'blocks/comment.svg',
                        alt: 'alt image',
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
