<template>
    <div>
        <img src="/blocks/GoogleTvProducts.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class GoogleTvProducts extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'title', {id: 1, type: StructureType.SimpleText, title: 'Title', value: ''});
        blockAddItem(this.model, 'link', {id: 2, type: StructureType.Url, title: "Link", value: ''});
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
