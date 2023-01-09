<template>
    <div>
        <img src="/blocks/CESImagesBlock1.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class CesImagesBlock1 extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({ default: true }) readonly editable: boolean | undefined
    @VModel({ type: Object }) model!: any

    mounted() {
        blockAddItem(this.model, 'theme', {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: Theme.light },
                { title: "Dark", value: Theme.dark },
            ],
        });
        blockAddItem(this.model, 'blockTitle', { id: 1, type: StructureType.SimpleText, title: 'Main Title', value: '' });
        blockAddItem(this.model, 'image1', { id: 1, type: StructureType.Image, title: 'Image 1', src: '', alt: '' });
        blockAddItem(this.model, 'image2', { id: 1, type: StructureType.Image, title: 'Image 2', src: '',alt:'' });
        blockAddItem(this.model, 'link1', { id: 1, type: StructureType.Url, title: 'link 1', value: '' });
        blockAddItem(this.model, 'link2', { id: 1, type: StructureType.Url, title: 'link 2', value: '' });
        blockAddItem(this.model, 'title1', { id: 1, type: StructureType.String, title: 'Title 1', value: '' });
        blockAddItem(this.model, 'title2', { id: 1, type: StructureType.String, title: 'Title 2', value: '' });

        this.model = {... this.model}

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
