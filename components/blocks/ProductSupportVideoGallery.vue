<template>
    <div>
        <img src="/blocks/ProductSupportVideoGallery.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class ProductSupportVideoGallery extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'title', { id: 0, type: StructureType.SimpleText, title: 'Title', value: '' })
        blockAddItem(this.model, 'list', {
            id: 1, type: StructureType.List, title: 'List', newItem: {
                video: {id: 1, type: StructureType.Video, title: 'Video', video:''},
            },
            value: [
                {
                    video: { id: 1, type: StructureType.Video, title: 'Video', video: '' },
                }
            ]
        });

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
