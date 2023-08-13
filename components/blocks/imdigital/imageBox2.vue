<template>
    <div class="tw-grid tw-grid-cols-2 tw-items-center tw-py-6" v-if="!isEmpty">
        <div class="tw-flex tw-flex-col tw-items-start tw-justify-center h-full tw-p-9">
            <div class="tw-text-[#0C2445] tw-text-[32px] tw-font-bold tw-m-0 tw-mb-2" v-html="model.title.value"></div>
            <div class="tw-text-[#0C2445] tw-text-lg tw-leading-[26px] tw-m-0" v-html="model.text.value"></div>
            <div class="tw-flex tw-items-center tw-gap-[32px] tw-mt-12">
                <button class="tw-py-3 tw-px-6 tw-bg-[#3df110] tw-text-[#0c2445] tw-text-lg tw-font-semibold tw-rounded-md tw-flex tw-items-center tw-gap-2">
                    {{ model.demo.value }}
                    <img src="@/assets/svgs/arrow-right.svg" alt="icon">
                </button>
                <button class="tw-py-3 tw-px-6 tw-border-[#1042F1] tw-border tw-border-solid tw-rounded-md tw-text-[#1042F1]">{{ model.contact.value }}</button>
            </div>
        </div>
        <img :src="model.image.src" :alt="model.image.alt" class="tw-mt-[70px]">
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
            type: StructureType.SimpleText,
            title: 'Title',
            value: 'Ensure Brand Consistency'
        });
        blockAddItem(this.model, 'text', {
            id: 1,
            type: StructureType.SimpleText,
            title: 'Text',
            value: 'CXM helps team to tell story and manage content for every use-case: corporate websites, e-commerce, helpdesks, mobile apps, and screen displays. Building websites with page builders using components. Admin can customize contents of components.'
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
