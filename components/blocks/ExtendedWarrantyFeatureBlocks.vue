<template>
    <div>
        <img src="/blocks/ExtendedWarrantyFeatureBlocks.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class ExtendedWarrantyFeatureBlocks extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        this.addItem('backgroundColor', {id: 0, type: StructureType.Color, title: 'Background Color', value: ''})
        this.addItem('title', {id: 1, type: StructureType.String, title: 'Title', value: ''});
        this.addItem('list', {
            id: 2,
            type: StructureType.List,
            title: 'List',
            newItem: {
                image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                text: {id: 1, type: StructureType.SimpleText, title: 'Text', value: ''},
                link: {id: 2, type: StructureType.Url, title: 'Link', value: ''},
            },
            value: [
                {
                    image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                    text: {id: 1, type: StructureType.SimpleText, title: 'Text', value: ''},
                    link: {id: 2, type: StructureType.Url, title: 'Link', value: ''},
                }
            ]
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    addItem(name: string, item: any) {
        if (!this.model.hasOwnProperty(name)) this.model[name] = item;
        this.model[name].id = item.id;

        if (this.model[name].type !== item.type) this.model[name].type = item.type;
        if (item.type === StructureType.Image) {
            this.model[name].src = '';
            this.model[name].alt = 'Image Alt';
        }
        if (item.type === StructureType.List) {
            this.model[name].newItem = item.newItem;
        }
        if (item.type === StructureType.Select) {
            this.model[name].items = item.items;
        }
    }
}
</script>
