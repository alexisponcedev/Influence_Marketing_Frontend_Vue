<template>
    <div>
        <img src="/blocks/CesCards.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class CesCards extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'title', {id: 1, type: StructureType.SimpleText, title: 'Text', value: ''});
        blockAddItem(this.model, 'block1', {
            id: 4, type: StructureType.Object, title: "Block 2", value: {
                status: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Show Status",
                    value: "active",
                    items: [
                        { title: "Active", value: "active" },
                        { title: "Deactive", value: "deactive" },
                    ],
                },
                title: { id: 1, type: StructureType.SimpleText, title: 'Title', value: '' },
                link: { id: 1, type: StructureType.Url, title: 'Link', value: '' },
                backgroundImage: { id: 2, type: StructureType.Image, title: "Background Image", src: '', alt: '' },
                image1: { id: 4, type: StructureType.Image, title: "Image 1", src: '', alt: '' },
                image2: { id: 5, type: StructureType.Image, title: "Image 2", src: '', alt: '' },
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: Theme.light },
                        { title: "Dark", value: Theme.dark },
                    ],
                },
            }
        });
        blockAddItem(this.model, 'block2', {
            id: 3, type: StructureType.Object, title: "Block 2", value: {
                status: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Show Status",
                    value: "active",
                    items: [
                        { title: "Active", value: "active" },
                        { title: "Deactive", value: "deactive" },
                    ],
                },
                title: { id: 1, type: StructureType.SimpleText, title: 'Title', value: '' },
                link: { id: 1, type: StructureType.Url, title: 'Link', value: '' },
                backgroundImage: { id: 2, type: StructureType.Image, title: "Background Image", src: '', alt: '' },
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: Theme.light },
                        { title: "Dark", value: Theme.dark },
                    ],
                },
            }
        });
        blockAddItem(this.model, 'list', {
            id: 1, type: StructureType.List, title: 'List', newItem: {
                title: { id: 1, type: StructureType.String, title: 'Title', value: '' },
                backgroundImage: { id: 2, type: StructureType.Image, title: "Background Image", src: '', alt: '' },
                link: { id: 1, type: StructureType.Url, title: 'Link', value: '' },
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: Theme.light },
                        { title: "Dark", value: Theme.dark },
                    ],
                },
            },
            value: [
                {
                    title: { id: 1, type: StructureType.String, title: 'Title', value: '' },
                    backgroundImage: { id: 2, type: StructureType.Image, title: "Background Image", src: '', alt: '' },
                    link: { id: 1, type: StructureType.Url, title: 'Link', value: '' },
                    theme: {
                        id: 0,
                        type: StructureType.Select,
                        title: "Theme",
                        value: Theme.dark,
                        items: [
                            { title: "Light", value: Theme.light },
                            { title: "Dark", value: Theme.dark },
                        ],
                    },
                }
            ]
        });
        blockAddItem(this.model, 'block3', {
            id: 4, type: StructureType.Object, title: "Block 3", value: {
                status: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Show Status",
                    value: "active",
                    items: [
                        { title: "Active", value: "active" },
                        { title: "Deactive", value: "deactive" },
                    ],
                },
                title: { id: 1, type: StructureType.SimpleText, title: 'Title', value: '' },
                link: { id: 1, type: StructureType.Url, title: 'Link', value: '' },
                backgroundImage: { id: 2, type: StructureType.Image, title: "Background Image", src: '', alt: '' },
                image1: { id: 4, type: StructureType.Image, title: "Image 1", src: '', alt: '' },
                image2: { id: 5, type: StructureType.Image, title: "Image 2", src: '', alt: '' },
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: Theme.light },
                        { title: "Dark", value: Theme.dark },
                    ],
                },
            }
        });
        blockAddItem(this.model, 'link', {id: 1, type: StructureType.Url, title: 'Link', value: ''});

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
