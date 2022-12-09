<template>
    <div>
        <img src="/blocks/ProductNewsBox.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, VModel} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";


@Component
export default class BlockProductNewsBox extends Vue {
    @VModel({type: Object}) model!: any

    Theme = Theme;

    created() {
        blockAddItem(this.model, 'theme', {
            id: 0,
            type: StructureType.Select,
            title: 'Theme',
            value: Theme.dark,
            items: [
                {title: 'Light', value: this.Theme.light},
                {title: 'Dark', value: this.Theme.dark},
            ]
        });
        blockAddItem(this.model, 'divider', {
            id: 1,
            type: StructureType.Select,
            title: 'Line Divider',
            value: true,
            items: [
                {title: 'Show', value: true},
                {title: "Don't show", value: false},
            ]
        })
        blockAddItem(this.model, 'list', {
            id: 2,
            type: StructureType.List,
            title: 'Items',
            newItem: {
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: 'Upload Image',
                    src: '',
                    alt: 'Some note about this image',
                },
                littleImage: {
                    id: 2,
                    type: StructureType.Object,
                    title: 'Little Image',
                    value: {
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: 'Image',
                            src: '',
                            alt: 'Some note about this image',
                        },
                        text: {
                            id: 2,
                            type: StructureType.String,
                            title: 'Text',
                            value: 'Some note about this image',
                        },
                    }
                },
                title: {
                    id: 3,
                    type: StructureType.String,
                    title: 'Title',
                    value: 'Ultra Short Throw. Ultra Convenient.'
                },
                smallTitle: {
                    id: 4,
                    type: StructureType.String,
                    title: 'Small Title',
                    value: ''
                },
                note: {
                    id: 5,
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
                        src: '',
                        alt: 'Some note about this image',
                    },
                    littleImage: {
                        id: 2,
                        type: StructureType.Object,
                        title: 'Little Image',
                        value: {
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Image',
                                src: '',
                                alt: 'Some note about this image',
                            },
                            text: {
                                id: 2,
                                type: StructureType.String,
                                title: 'Text',
                                value: 'Some note about this image',
                            },
                        }
                    },
                    title: {
                        id: 3,
                        type: StructureType.String,
                        title: 'Title',
                        value: 'Ultra Short Throw. Ultra Convenient.'
                    },
                    smallTitle: {
                        id: 4,
                        type: StructureType.String,
                        title: 'Small Title',
                        value: ''
                    },
                    note: {
                        id: 5,
                        type: StructureType.Text,
                        title: 'Note',
                        value: 'Big screen entertainment in a convenient package. No need for ceiling mounts or in-wall cable runs, simply place the L5G on a TV stand just 11 inches from the wall and get a massive 100-inch projection – that’s 3x more screen than a 55-inch TV.'
                    },
                }
            ]
        })
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
