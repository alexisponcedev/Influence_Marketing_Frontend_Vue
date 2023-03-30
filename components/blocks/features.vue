<template>
    <div class="tw-flex tw-items-center tw-flex-col tw-justify-center tw-bg-[#E7ECFE] tw-py-6" v-if="!isEmpty">
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center h-full tw-p-9">
            <h2 class="tw-text-[#030D30] tw-text-[32px] tw-m-0 tw-mb-2">{{ model.smallTitle.value }}</h2>
            <h4 class="tw-text-[#1042F1] tw-text-lg tw-m-0">{{ model.text.value }}</h4>            
        </div>
        <div class="tw-flex tw-mt-10">
            <div class="tw-flex tw-flex-col tw-items-center" v-for="(item, index) in model.list.value" :key="index">
                <h2 class="">{{ item.Box.title }}</h2>
                <div>{{ item.Box.value }}</div>
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
        blockAddItem(this.model, 'smallTitle', {
            id: 0,
            type: StructureType.String,
            title: 'Samll Title',
            value: 'Manage your brand with IM Products'
        });
        blockAddItem(this.model, 'text', {
            id: 1,
            type: StructureType.String,
            title: 'Text',
            value: 'Pick your market, we’ve got you covered.'
        });
        blockAddItem(this.model, 'list', {
            id: 2,
            type: StructureType.List,
            title: 'List Item',
            newItem: {
                Box: {
                    id: 0,
                    type: StructureType.String,
                    title: '',
                    value: ''
                }
            },
            value: [
                {
                    Box: {
                        id: 0,
                        type: StructureType.String,
                        title: 'Save Money',
                        value: 'Customer engagement marketing is a marketing strategy that delivers timely, relevant, and personalized messages to consumers.'
                    }
                }
            ]
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
