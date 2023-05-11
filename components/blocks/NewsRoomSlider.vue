<template>
    <div>
    <img src="/blocks/newsroom-slider.png" alt="" />
    </div>
    </template>
    
<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
    
@Component
export default class NewsRoomSlider extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;
    
    mounted() {
    blockAddItem(this.model, 'title', {
        id: 0,
        type: StructureType.String,
        title: 'Title',
        value: 'NewsRoom'
    });
    blockAddItem(this.model, "list", {
        id: 1,
        type: StructureType.List,
        title: "Newsroom",
        newItem: {
            image: {
                id: 1,
                type: StructureType.Image,
                title: "Image",
                src: "",
                alt: "Image Alt",
            },
            title: {
                id: 2,
                type: StructureType.String,
                title: "Title",
                value: "",
            },
            subtitle: {
                id: 3,
                type: StructureType.Text,
                title: "Subtitle",
                value: "",
            },
            btn: {
                id: 4,
                type: StructureType.Url,
                title: "Read More",
                value: "",
            },
        },
        value: [],
        });
            this.model = { ...this.model };
        }
        
        get isEmpty(): Boolean {
            return this.model && Object.keys(this.model).length === 0;
        }
    }
</script>