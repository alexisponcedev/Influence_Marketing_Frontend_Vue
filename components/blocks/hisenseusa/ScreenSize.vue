<template>
    <div>
        <img src="/blocks/ScreenSize.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeScreenSize extends Vue {
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
                title: {id: 0, type: StructureType.String, title: 'Title', value: 'Massive 100" or 120" Screen'},
                tabs: {
                    id: 1, type: StructureType.List, title: 'Items',
                    newItem: {
                        title: {id: 0, type: StructureType.String, title: 'Tab Title', value: '100 inch'},
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: 'Tab Image',
                            src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-6-100inch.jpg',
                            alt: 'Image Alt'
                        },
                        text: {
                            id: 2,
                            type: StructureType.Text,
                            title: 'Tab Text',
                            value: '<p>At mere inches from the wall, the 100L9G casts a massive 100 inch projection in beautiful 4K resolution -that’s 2.5x more screen than a 65 inch TV.</p>'
                        },
                    },
                    value: [
                        {
                            title: {id: 0, type: StructureType.String, title: 'Tab Title', value: '100 inch'},
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Tab Image',
                                src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-6-100inch.jpg',
                                alt: 'Image Alt'
                            },
                            text: {
                                id: 2,
                                type: StructureType.Text,
                                title: 'Tab Text',
                                value: '<p>At mere inches from the wall, the 100L9G casts a massive 100 inch projection in beautiful 4K resolution -that’s 2.5x more screen than a 65 inch TV.</p>'
                            },
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: 'Tab Title', value: '120 inch'},
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Tab Image',
                                src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/section-6-120inch.jpg',
                                alt: 'Image Alt'
                            },
                            text: {
                                id: 2,
                                type: StructureType.Text,
                                title: 'Tab Text',
                                value: '<p>Positioned just a couple more inches away the 120L9G gives you an even bigger 120" image. At nearly 4x the size of a 65" TV, the 120" screen fills your field of view.</p>'
                            },
                        }
                    ]
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
