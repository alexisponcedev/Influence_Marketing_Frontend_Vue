<template>
    <div>
        <img src="/blocks/GoogleTvTops.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class GoogleTvTops extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'list', {
            id: 1, type: StructureType.List, title: 'List', newItem: {
                image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                text: {id: 1, type: StructureType.SimpleText, title: 'Text', value: ''},
            },
            value: [
                {
                    image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                    text: {id: 1, type: StructureType.SimpleText, title: 'Text', value: ''},
                }
            ]
        });

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
