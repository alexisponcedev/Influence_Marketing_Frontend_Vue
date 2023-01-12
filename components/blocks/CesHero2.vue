<template>
    <div>
        <img src="/blocks/CesHero2.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class CesHero2 extends Vue {
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
        blockAddItem(this.model, 'backgroundImage', {
            id: 2,
            type: StructureType.Image,
            title: 'Background Image',
            src: '',
            alt: ''
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
