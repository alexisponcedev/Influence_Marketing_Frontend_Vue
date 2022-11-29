<template>
    <div>
        <img src="/blocks/CESPX1ImageAndText.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class CESPX1ImageAndText extends Vue {
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
                text: {
                    id: 0,
                    type: StructureType.Text,
                    title: 'Text',
                    value: '<h2>The PX1-PRO features the award-winning triChroma laser engine to achieve full coverage of the BT.2020 color space for a true-to-life picture.</h2>' +
                        '<h3>with its innovative Digital Lens Focus system, the PX1-PRO delivers a razor-sharp 4K iamge in sizes from 90 to 130-incehs.</h3>'
                },
                image: {id: 3, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
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
