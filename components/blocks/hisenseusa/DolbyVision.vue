<template>
    <div>
        <img src="/blocks/DolbyVision.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeDolbyVision extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                title: {id: 0, type: StructureType.String, title: 'Title', value: 'Dolby Vision'},
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: 'Image',
                    src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/dolbyvision-L9Gusn.jpg',
                    alt: 'Image Alt'
                },
                text: {
                    id: 2,
                    type: StructureType.Text,
                    title: 'Image',
                    value: '<p>Dolby Vision is a next-level HDR format that optimizes every scene on every screen. This high-dynamic range technology gives you amazing color and contrast, so you can discover even more detail in bright and dark scenes. This is entertainment without compromise. </p><p><br></p><p><span class="ql-size-small">* Coming via Firmware update, Summer 2022.</span></p>'
                },
            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
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
