<template>
    <div>
        <img src="/blocks/BlockTVHero.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlockTVHero extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model , 'title' , {id: 0, type: StructureType.Text, title: 'Title', value: 'We make award winning TVs.'})
        blockAddItem(this.model , 'text' , {
            id: 1, type: StructureType.Text, title: 'Text', value: 'LESS TALK, MORE TV' +
                'Find one (or two) \n' +
                'made just for you.' +
                'Computer-generated living room not included.' +
                ''
        })
        blockAddItem(this.model , 'link' , {id: 2, type: StructureType.Url, title: 'View the Entire Lineup', value: '/'})
        blockAddItem(this.model , 'image' , {id: 3, type: StructureType.Image, title: 'Image', src: '', alt: ''})
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
