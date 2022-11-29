<template>
    <div>
        <img src="/blocks/BlogBigImageAndTextBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlogBigImageAndTextBox extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({ default: true }) readonly editable: Boolean | undefined
    @VModel({ type: Object }) model!: any

    mounted() {
        blockAddItem(this.model, 'image', { id: 0, type: StructureType.Image, title: "Badge Image", src: '', alt: '' });
        blockAddItem(this.model, 'title', { id: 1, type: StructureType.String, title: 'Title', value: 'Sample Title' });
        blockAddItem(this.model, 'text', { id: 2, type: StructureType.Text, title: 'Text', value: 'Sample text' });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

}
</script>
