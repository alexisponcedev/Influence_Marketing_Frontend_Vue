<template>
    <div>
        <img src="/blocks/LaserTvInstallationDescription.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class LaserTvInstallationDescription extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'title', { id: 0, type: StructureType.SimpleText, title: 'Title', value: '' })
        blockAddItem(this.model, 'list', {
            id: 1, type: StructureType.List, title: 'List', newItem: {
                image: {id: 1, type: StructureType.Image, title: 'Image', src: '', alt :''},
            },
            value: [
                {
                    image: {id: 1, type: StructureType.Image, title: 'Image', src: '', alt :''},
                }
            ]
        });
        blockAddItem(this.model, 'text', { id: 1, type: StructureType.SimpleText, title: 'text', value: '' })


    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
