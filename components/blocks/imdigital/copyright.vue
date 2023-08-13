<template>
    <div class="tw-flex-col tw-bg-[#041122] tw-flex tw-items-center tw-justify-center" v-if="!isEmpty">
        <span class="tw-w-full tw-flex tw-justify-center tw-text-white tw-text-base tw-py-[10px]">{{ model.copyright.value }}</span>
        <div class="tw-flex tw-items-center tw-justify-center tw-w-full tw-pt-5 tw-pb-10 tw-border-t tw-border-white">
            <img :src="model.logo.src" :alt="model.logo.alt">
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
        blockAddItem(this.model, 'copyright', {
            id: 0,
            type: StructureType.String,
            title: 'Copyright',
            value: 'Copyright © 2022 IMDigital, Inc.'
        });
        blockAddItem(this.model, 'logo', {
            id: 1,
            type: StructureType.Image,
            title: 'Upload Logo',
            src: 'blocks/logo.png',
            alt: 'logo alt',
        });
        this.model = {...this.model}
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
