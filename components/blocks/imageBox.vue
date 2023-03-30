<template>
    <div class="tw-grid tw-grid-cols-2 tw-gap-20 tw-p-6" v-if="!isEmpty">
        <img :src="model.image.src" :alt="model.image.alt">
        <div class="tw-flex tw-flex-col tw-items-start h-full tw-py-9">
            <div class="tw-text-[#0C2445] tw-font-bold tw-text-lg tw-leading-[26px] tw-m-0" v-html="model.text.value"></div>
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
            type: StructureType.SimpleText,
            title: 'Text',
            value: 'Managing digital content with a headless CMS can be a difficult task. Without a visual preview, editors are often lost and need instruction even for simple changes.'
        });

        blockAddItem(this.model, 'image', {
            id: 1,
            type: StructureType.Image,
            title: 'Upload Image',
            src: 'blocks/imageBox.png',
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
