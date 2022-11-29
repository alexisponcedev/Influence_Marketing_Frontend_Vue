<template>
    <div>
        <img src="/blocks/SmoothMotion.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeSmoothMotion extends Vue {
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
                title: {
                    id: 0,
                    type: StructureType.Text,
                    title: 'Title',
                    value: '<h2>Have a healthy heap<br> of buttery - smooth motion.</h2>'
                },
                fadedImage: {
                    id: 1,
                    type: StructureType.Image,
                    title: "Faded Image",
                    src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-5-motion2.jpg',
                    alt: 'Image Alt'
                },
                image: {
                    id: 2,
                    type: StructureType.Image,
                    title: "Image",
                    src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-5-motion1.jpg',
                    alt: 'Image Alt'
                },
                text: {
                    id: 3,
                    type: StructureType.Text,
                    title: 'Text',
                    value: '<p> With microsecond level-processor response and MEMC technology the L9G ensures you never miss a moment of the action. Images are buttery-smooth and crystal clear - so whether its sports, games, or action films, the L9G is gonna give you the picture you deserve.</p>'
                }
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
