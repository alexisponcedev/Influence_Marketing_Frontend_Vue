<template>
    <div>
        <img src="/blocks/LaserTvInstallationForm.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class LaserTvInstallationForm extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'title', { id: 0, type: StructureType.String, title: 'Title', value: '' });
        blockAddItem(this.model, 'text', { id: 1, type: StructureType.SimpleText, title: 'Text', value: '' });
        blockAddItem(this.model, 'link', { id: 2, type: StructureType.Url, title: 'Confirmation Page Link', value: '' });

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
