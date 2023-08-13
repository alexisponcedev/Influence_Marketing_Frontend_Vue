<template>
    <div class="tw-grid tw-grid-cols-2 tw-items-end tw-bg-[#1042f1] tw-py-10" v-if="!isEmpty">
        <div class="tw-flex tw-flex-col tw-items-start tw-justify-center h-full tw-p-9">
            <h4 class="tw-text-[#3df110] tw-font-semibold tw-text-lg tw-m-0 tw-mb-1">{{ model.smallTitle.value }}</h4>
            <div class="tw-text-white tw-font-bold tw-text-[40px] tw-leading-[48px] tw-m-0 tw-mt-0" v-html="model.text.value"></div>
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
            value: 'IM CXM Content Experience Management'
        });

        blockAddItem(this.model, 'image', {
            id: 3,
            type: StructureType.Image,
            title: 'Upload Image',
            src: 'blocks/banner2.svg',
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
