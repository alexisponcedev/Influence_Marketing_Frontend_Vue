<template>
    <div>
    <img src="/blocks/NewsRoomNewsBox.png" alt="" />
    </div>
    </template>
    
<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
    
@Component
export default class NewsRoomNewsBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;
    
    mounted() {
    blockAddItem(this.model, 'title', {
        id: 0,
        type: StructureType.String,
        title: 'Title',
        value: 'News Room News Box'
    });
    blockAddItem(this.model, 'link', {
        id: 0,
        type: StructureType.Url,
        title: 'link',
        value: ''
    });

            this.model = { ...this.model };
        }
        
        get isEmpty(): Boolean {
            return this.model && Object.keys(this.model).length === 0;
        }
    }
</script>