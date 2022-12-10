<template>

    <div class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center" v-if="!isEmpty">
        <div v-if="editable"
             class="tw-p-2 tw-my-1.5 tw-text-gray-500 tw-text-sm tw-bg-gray-50 tw-rounded-lg tw-inline-block tw-self-start">
            In order
            to
            choose video player component please click here ..
        </div>
        <iframe
            class="tw-z-0"
            title='Iframe content'
            :src='model.src.value'
            :width='model.width.value'
            :height='model.height.value'/>
    </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class IFrame extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'src', {
            id: 0,
            type: StructureType.String,
            title: "Iframe Source",
            value: 'https://google.com'
        });
        blockAddItem(this.model, 'width', {id: 1, type: StructureType.String, title: 'Width', value: '100%'});
        blockAddItem(this.model, 'height', {id: 2, type: StructureType.String, title: 'Height', value: '600'});
        this.model = {...this.model};
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
