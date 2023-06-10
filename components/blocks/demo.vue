<template>
    <div class="tw-pt-[140px] tw-pb-[250px] tw-bg-[#1042f1]" v-if="!isEmpty">
        <div class="tw-flex tw-flex-col tw-items-start tw-justify-center h-full tw-px-9 tw-max-w-[50%]">
            <h4 class="tw-text-[#3df110] tw-font-semibold tw-text-lg tw-m-0 tw-mb-2">{{ model.smallTitle.value }}</h4>
            <div class="tw-text-white tw-font-bold tw-text-[40px] tw-leading-[48px] tw-m-0" v-html="model.text.value"></div>
        </div>
        <img :src="model.image.src" :alt="model.image.alt" class="tw-absolute tw-bottom-0 tw-right-0">
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
            title: 'Title',
            value: 'Thank you farzan!'
        });
        blockAddItem(this.model, 'text', {
            id: 1,
            type: StructureType.SimpleText,
            title: 'Text',
            value: 'Someone will be in touch soon to schedule your demo.'
        });

        blockAddItem(this.model, 'image', {
            id: 3,
            type: StructureType.Image,
            title: 'Upload Image',
            src: 'blocks/demo.svg',
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
