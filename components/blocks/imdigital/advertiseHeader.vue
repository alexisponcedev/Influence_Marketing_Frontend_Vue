<template>
    <div class="tw-bg-[#041122] tw-flex tw-items-center tw-justify-center tw-h-[43px] tw-gap-2" v-if="!isEmpty">
        <span class="tw-text-[#b7babf] tw-text-base tw-font-semibold">{{ model.advertiseTitle.value }}</span>
        <span class="tw-text-white tw-text-base">{{ model.advertiseMessage.value }}</span>
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
        blockAddItem(this.model, 'advertiseTitle', {
            id: 0,
            type: StructureType.String,
            title: 'Advertise Title',
            value: 'New'
        });
        blockAddItem(this.model, 'advertiseMessage', {
            id: 1,
            type: StructureType.String,
            title: 'Advertise Message',
            value: 'Only 13% are happy with their CMS - Download the State of CMS  APAC Report'
        });
        this.model = {...this.model}
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
