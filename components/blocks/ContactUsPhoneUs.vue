<template>
    <div>
        <img src="/blocks/ContactUsPhoneUs.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class ContactUsPhoneUs extends Vue {
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
                title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                list: {
                    id: 1,
                    type: StructureType.List,
                    title: 'List',
                    newItem: {
                        image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                        text: {id: 1, type: StructureType.Text, title: 'Text', value: ''},
                        phone: {id: 1, type: StructureType.String, title: 'Phone', value: ''},
                    },
                    value: [
                        {
                            image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                            text: {id: 1, type: StructureType.Text, title: 'Text', value: ''},
                            phone: {id: 1, type: StructureType.String, title: 'Phone', value: ''},
                        }
                    ]
                }


            }
    }

    mounted() {
        if (this.isEmpty) this.reset();

        blockAddItem(this.model, 'title', {id: 0, type: StructureType.String, title: 'Title', value: ''},)
        blockAddItem(this.model, 'contact', {
            id: 1, type: StructureType.Object, title: 'Contact Information',
            value: {
                title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                list: {
                    id: 1, type: StructureType.List, title: 'List',
                    newItem: {
                        title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                        subtitle: {id: 1, type: StructureType.String, title: 'Subtitle', value: ''},
                    },
                    value: [
                        {
                            title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                            subtitle: {id: 1, type: StructureType.String, title: 'Subtitle', value: ''},

                        }
                    ]
                },
            }
        })

        blockAddItem(this.model, 'middleBox', {
            id: 2, type: StructureType.Object,
            title: 'Middle Box',
            value: {
                image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                phoneNumber: {id: 0, type: StructureType.String, title: 'Phone Number', value: ''},
            }
        })

        blockAddItem(this.model, 'rightBox', {
            id: 3, type: StructureType.Object,
            title: 'Right Box',
            value: {
                image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                phoneNumber: {id: 0, type: StructureType.String, title: 'Phone Number', value: ''},
            }
        })
        blockRemoveItem(this.model, ['list']);
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
