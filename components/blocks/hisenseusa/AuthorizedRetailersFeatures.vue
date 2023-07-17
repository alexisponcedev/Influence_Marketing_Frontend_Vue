<template>
    <div>
        <img src="/blocks/AuthorizedRetailersFeatures.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class AuthorizedRetailersFeatures extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any


    mounted() {
        this.addItem('list', {
            id: 0,
            type: StructureType.List,
            title: 'List',
            newItem: {
                image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                text: {
                    id: 1,
                    type: StructureType.Text,
                    title: 'Text',
                    value: 'The most up to date Hisense product information, product pricing and individual promotional offers.'
                }
            },
            value: [
                {
                    image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                    text: {
                        id: 1,
                        type: StructureType.Text,
                        title: 'Text',
                        value: 'The most up to date Hisense product information, product pricing and individual promotional offers.'
                    }
                }
            ]
        })
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
