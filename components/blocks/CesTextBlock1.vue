<template>
    <div>
        <img src="/blocks/CESTexBlock1.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class CesTexBlock1 extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'theme', {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                {title: "Light", value: Theme.light},
                {title: "Dark", value: Theme.dark},
            ],
        });
        blockAddItem(this.model, 'image', {id: 1, type: StructureType.Image, title: 'Image ', src: '', alt: ''});
        blockAddItem(this.model, 'title', {id: 1, type: StructureType.String, title: 'Main Title', value: ''});
        blockAddItem(this.model, 'subtitle', {id: 1, type: StructureType.String, title: 'Subtitle', value: ''});
        blockAddItem(this.model, 'description', {id: 1, type: StructureType.SimpleText, title: 'Subtitle', value: ''});
        blockAddItem(this.model, 'link', {id: 1, type: StructureType.Url, title: 'link', value: ''});
        blockAddItem(this.model, 'productLink', {id: 1, type: StructureType.Url, title: 'Product Link', value: ''});
        blockAddItem(this.model, 'specs', {id: 1, type: StructureType.String, title: 'Specs Title', value: ''});
        blockAddItem(this.model, 'list', {
            id: 1, type: StructureType.List, title: 'List', newItem: {
                title: {id: 1, type: StructureType.String, title: 'Title', value: ''},
            },
            value: [
                {
                    title: {id: 1, type: StructureType.String, title: 'Title', value: ''},
                }
            ]
        });

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
