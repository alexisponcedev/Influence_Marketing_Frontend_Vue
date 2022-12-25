<template>
    <div>
        <img src="/blocks/CesHero.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class CesHero extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({ default: true }) readonly editable: Boolean | undefined
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
        blockAddItem(this.model, 'title', { id: 1, type: StructureType.String, title: 'Title', value: '' });
        blockAddItem(this.model, 'backgroundImage', { id: 1, type: StructureType.Image, title: 'Background Image', src: '', alt : '' });
        blockAddItem(this.model, 'text', { id: 1, type: StructureType.String, title: 'Subtitle', value: '' });
        blockAddItem(this.model, 'link', { id: 1, type: StructureType.Url, title: 'link', value: '' });

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
