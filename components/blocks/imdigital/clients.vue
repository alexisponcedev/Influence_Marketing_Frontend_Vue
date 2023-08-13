<template>
    <div class="tw-flex tw-justify-center tw-items-center py-12 tw-gap-[50px]" v-if="!isEmpty">
        <div class="tw-text-[#000] tw-text-[24px] tw-font-bold">
            {{ model.text.value }}
        </div>
        <div class="tw-flex tw-gap-5">
            <img :src="item.Box.src" :alt="item.Box.alt" v-for="(item, index) in model.list.value" :key="index">
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
            value: 'Join over +15,000 happy clients!'
        });
        blockAddItem(this.model, 'list', {
            id: 1,
            type: StructureType.List,
            title: 'List Item',
            newItem: {
                Box: {
                    id: 0,
                    type: StructureType.Image,
                    title: 'Upload Image',
                    src: '',
                    alt: '',
                }
            },
            value: [
                {
                    Box: {
                        id: 0,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'blocks/clientItem.svg',
                        alt: 'Some note about this image',
                    }
                },
                {
                    Box: {
                        id: 0,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'blocks/clientItem.svg',
                        alt: 'Some note about this image',
                    }
                },
                {
                    Box: {
                        id: 0,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'blocks/clientItem.svg',
                        alt: 'Some note about this image',
                    }
                },
                {
                    Box: {
                        id: 0,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'blocks/clientItem.svg',
                        alt: 'Some note about this image',
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
