<template>
    <div>
        <img src="/blocks/GoogleTvFeatureBlocksType2.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class GoogleTvFeatureBlocksType2 extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'block1', {
            id: 5, type: StructureType.Object, title: "Block 1", value: {
                text: {id: 1, type: StructureType.SimpleText, title: 'Text', value: ''},
                icon: {id: 2, type: StructureType.Image, title: "Icon", src: '', alt: ''},
                subtitle: {id: 3, type: StructureType.SimpleText, title: "Subtitle", value: ''},
                title: {id: 4, type: StructureType.String, title: "Title", value: ''},
                list: {
                    id: 5, type: StructureType.List, title: 'List', newItem: {
                        image: {id: 1, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
                    },
                    value: [
                        {
                            image: {id: 1, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
                        }
                    ]
                }
            }
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
