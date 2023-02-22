<template>
    <div>
        <img src="/blocks/AuthorizedRetailersBanner.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class AuthorizedRetailersBanner extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model , 'image' ,{
            id : 0 ,
            title : 'Image',
            type : StructureType.Image,
            src : '',
            alt : '',
        })

        blockAddItem(this.model , 'title' ,{
            id : 1 ,
            title : 'Title',
            type : StructureType.String,
            value : 'Sample Text',
        })

        blockAddItem(this.model , 'subtitle' ,{
            id : 2 ,
            title : 'Subtitle',
            type : StructureType.String,
            value : 'Sample Text',
        })



    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

}
</script>
