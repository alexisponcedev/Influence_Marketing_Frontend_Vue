<template>
    <div>
        <img src="/blocks/ProductNewsBox.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockProductNewsBox extends Vue {
    @VModel({type: Object}) model!: any

    Theme = Theme;

    created() {
        this.addItem(this.model, 'theme', {
            id: 0,
            type: StructureType.Select,
            title: 'Theme',
            value: Theme.dark,
            items: [
                {title: 'Light', value: this.Theme.light},
                {title: 'Dark', value: this.Theme.dark},
            ]
        });
        this.addItem(this.model, 'divider', {
            id: 1,
            type: StructureType.Select,
            title: 'Line Divider',
            value: true,
            items: [
                {title: 'Show', value: true},
                {title: "Don't show", value: false},
            ]
        })
        this.addItem(this.model, 'list', {
            id: 2,
            type: StructureType.List,
            title: 'Items',
            newItem: {
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: 'Upload Image',
                    src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/c3e247b4bb/L5G_KeyFeature-01__ScaleMaxWidthWzMwNDhd.jpg-rgx0ux.jpg',
                    alt: 'Some note about this image',
                },
                title: {
                    id: 2,
                    type: StructureType.String,
                    title: 'Title',
                    value: 'Ultra Short Throw. Ultra Convenient.'
                },
                smallTitle: {
                    id: 3,
                    type: StructureType.String,
                    title: 'Small Title',
                    value: ''
                },
                note: {
                    id: 4,
                    type: StructureType.Text,
                    title: 'Note',
                    value: 'Big screen entertainment in a convenient package. No need for ceiling mounts or in-wall cable runs, simply place the L5G on a TV stand just 11 inches from the wall and get a massive 100-inch projection – that’s 3x more screen than a 55-inch TV.'
                },
            },
            value: [
                {
                    image: {
                        id: 1,
                        type: StructureType.Image,
                        title: 'Upload Image',
                        src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/c3e247b4bb/L5G_KeyFeature-01__ScaleMaxWidthWzMwNDhd.jpg-rgx0ux.jpg',
                        alt: 'Some note about this image',
                    },
                    title: {
                        id: 2,
                        type: StructureType.String,
                        title: 'Title',
                        value: 'Ultra Short Throw. Ultra Convenient.'
                    },
                    smallTitle: {
                        id: 3,
                        type: StructureType.String,
                        title: 'Small Title',
                        value: ''
                    },
                    note: {
                        id: 4,
                        type: StructureType.Text,
                        title: 'Note',
                        value: 'Big screen entertainment in a convenient package. No need for ceiling mounts or in-wall cable runs, simply place the L5G on a TV stand just 11 inches from the wall and get a massive 100-inch projection – that’s 3x more screen than a 55-inch TV.'
                    },
                },
            ]
        })
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    addItem(base: any, name: string, item: any) {
        if (!base.hasOwnProperty(name)) base[name] = item;
        base[name].id = item.id;

        if (base[name].type !== item.type) base[name].type = item.type;

        if (item.type === StructureType.Image) {
            base[name].src = '';
            base[name].alt = 'Image Alt';
        }

        if (item.type === StructureType.List) {
            base[name].newItem = item.newItem;
            base[name].value.forEach((element: any, index: number) => {
                Object.keys(item.newItem).forEach((key: string) => {
                    this.addItem(base[name].value[index], key, item.newItem[key])
                })
            })
        }

        if (item.type === StructureType.Object) {
            Object.keys(item.value).forEach((key: string) => {
                this.addItem(base[name].value, key, item.value[key])
            })
        }

        if (item.type === StructureType.Select) {
            base[name].items = item.items;
        }
    }
}
</script>

<style type="text/css"></style>
