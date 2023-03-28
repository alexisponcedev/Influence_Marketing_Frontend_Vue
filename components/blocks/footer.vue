<template>
    <div class="tw-flex tw-items-center tw-justify-between tw-p-[15px] tw-bg-[#002357]" v-if="!isEmpty">
        <img :src="model.logo.src" :alt="model.logo.alt">
        <!-- <ul>
            <li v-for="(item, index) in model.list.value" :key="index">{{ item }}</li>
        </ul> -->
        <button class="tw-py-[10px] tw-px-6 tw-rounded-md tw-bg-[#3df110] tw-text-[#232729] tw-font-semibold">{{ model.link.value }}</button>
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
        blockAddItem(this.model, 'logo', {
            id: 0,
            type: StructureType.Image,
            title: 'Upload Logo',
            src: 'blocks/logo.png',
            alt: 'logo alt',
        });
        // blockAddItem(this.model, 'list', {
        //     id: 1,
        //     type: StructureType.List,
        //     title: 'Advertise Message',
        //     value: ['Platform']
        // });
        blockAddItem(this.model, 'link', {
            id: 2,
            type: StructureType.Url,
            title: 'Demo button',
            value: 'Demo'
        });
        this.model = {...this.model}
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
