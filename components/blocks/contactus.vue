<template>
    <div class="tw-grid tw-grid-cols-2 tw-items-center tw-bg-[url(/blocks/contactus.svg)] tw-bg-cover tw-py-12" v-if="!isEmpty">
        <div class="tw-flex tw-flex-col tw-items-start tw-justify-center h-full tw-px-9">
            <h4 class="tw-text-white tw-font-bold tw-text-[40px] tw-m-0 tw-mb-2">{{ model.smallTitle.value }}</h4>
            <div class="tw-text-[#CCE2FF] tw-text-lg">{{ model.text.value }}</div>
            <ul>
                <li class="tw-text-[#CCE2FF] tw-text-lg" v-for="(item, index) in model.list.value" :key="index">{{ item.List.value }}</li>
            </ul>
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
            value: 'Ready for the future?'
        });
        blockAddItem(this.model, 'text', {
            id: 1,
            type: StructureType.String,
            title: 'Text',
            value: 'Contact us today to:'
        });
        blockAddItem(this.model, 'list', {
            id: 2,
            type: StructureType.List,
            title: 'List Item',
            newItem: {
                List: {
                    id: 0,
                    type: StructureType.String,
                    title: '',
                    value: ''
                }
            },
            value: [
                {
                    List: {
                        id: 0,
                        type: StructureType.String,
                        title: 'item',
                        value: 'Discover IMDigital’s powerful content management capabilities'
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
