<template>
    <div class="tw-flex tw-justify-center tw-items-center" v-if="!isEmpty">
        <span class="tw-flex tw-w-1/3 tw-h-px tw-bg-[#1954ed] tw-absolute tw-left-0 tw-top-[102px]"></span>
        <div class="tw-text-center tw-text-[#030D30] tw-text-[32px] tw-leading-10 tw-m-0 tw-pb-[75px] tw-pt-[155px]" v-html="model.text.value" />
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
            value: 'Integral Solutions For Modern GROWING Businesses'
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
