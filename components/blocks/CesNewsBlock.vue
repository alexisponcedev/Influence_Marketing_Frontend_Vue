<template>
    <div>
        <img src="/blocks/CESNewsBlock.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class CesNewsBlock extends Vue {
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
        blockAddItem(this.model, 'title', {id: 1, type: StructureType.SimpleText, title: 'Main Title', value: ''});
        blockAddItem(this.model, 'subtitle', {id: 1, type: StructureType.String, title: 'Subtitle', value: ''});
        blockAddItem(this.model, 'secondLink', {id: 1, type: StructureType.Url, title: 'Second Link', value: ''});
        blockAddItem(this.model, 'contact', {id: 1, type: StructureType.String, title: 'Contact', value: ''});
        blockAddItem(this.model, 'text', {id: 1, type: StructureType.String, title: 'Contact Extra Text', value: ''});
        blockAddItem(this.model, 'email', {id: 1, type: StructureType.String, title: 'Email', value: ''});
        blockAddItem(this.model, 'companyTitle', {
            id: 1,
            type: StructureType.String,
            title: 'Company Title',
            value: ''
        });
        blockAddItem(this.model, 'address', {id: 1, type: StructureType.String, title: 'Address', value: ''});
        blockAddItem(this.model, 'list', {
            id: 1, type: StructureType.List, title: 'List', newItem: {
                link: {id: 1, type: StructureType.Url, title: 'Link', value: ''},
            },
            value: [
                {
                    link: {id: 1, type: StructureType.Url, title: 'Link', value: ''},
                }
            ]
        });

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
