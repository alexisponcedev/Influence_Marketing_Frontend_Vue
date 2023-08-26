<template>
    <div>
        <img src="/blocks/Retailers.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class HomeRetailers extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'title', {
            id: 0,
            type: StructureType.String,
            title: 'Title',
            value: 'Find Me At A Store'
        })
        blockAddItem(this.model, 'subtitle', {
            id: 1,
            type: StructureType.String,
            title: 'Subtitle',
            value: 'Check with these retailers for product availability.'
        })

        blockRemoveItem(this.model, ['list']);

        this.model = {...this.model};

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
