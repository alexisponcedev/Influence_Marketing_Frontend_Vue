<template>
    <div>
        <img src="/blocks/BlogCubeSlider.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlogCubeSlider extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'list', {
            id: 0, type: StructureType.List, title: 'List',
            newItem: {
                model: {id: 0, type: StructureType.String, title: 'Model', value: ''},
                title: {id: 1, type: StructureType.String, title: 'Title', value: ''},
                description: {id: 2, type: StructureType.Text, title: 'Description', value: ''},
                link: {id: 3, type: StructureType.Url, title: 'Link', value: ''},
                image: {id: 4, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
            },
            value: [
                {
                    model: {id: 0, type: StructureType.String, title: 'Model', value: ''},
                    title: {id: 1, type: StructureType.String, title: 'Title', value: ''},
                    description: {id: 2, type: StructureType.Text, title: 'Description', value: ''},
                    link: {id: 3, type: StructureType.Url, title: 'Link', value: ''},
                    image: {id: 4, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
                }
            ]
        });
        this.model = {...this.model};
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }


}
</script>
