<template>
    <div>
        <img src="/blocks/BlogListWithBigTitleAndLittleItem.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlogListWithBigTitleAndLittleItem extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {

        blockAddItem(this.model, 'title', {id: 0, type: StructureType.Text, title: 'Title', value: ''});
        blockAddItem(this.model, 'link', {id: 1, type: StructureType.Url, title: 'Link', value: ''});
        blockAddItem(this.model, 'list', {
            id: 3, type: StructureType.List, title: 'List',
            newItem: {
                largePost: {
                    id: 0, type: StructureType.Object, title: 'Large Post', value: {
                        image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                        title: {id: 1, type: StructureType.String, title: 'Title', value: ''},
                        tagLink: {id: 2, type: StructureType.Url, title: 'Tag Link', value: ''},
                        link: {id: 3, type: StructureType.Url, title: 'Link', value: ''},
                    }
                },
                smallPost: {
                    id: 1, type: StructureType.Object, title: 'Small Post', value: {
                        image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                        title: {id: 1, type: StructureType.String, title: 'Title', value: ''},
                        tagLink: {id: 2, type: StructureType.Url, title: 'Tag Link', value: ''},
                        link: {id: 3, type: StructureType.Url, title: 'Link', value: ''},
                    }
                },
            },
            value: [
                {
                    largePost: {
                        id: 0, type: StructureType.Object, title: 'Large Post', value: {
                            image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                            title: {id: 1, type: StructureType.String, title: 'Title', value: ''},
                            tagLink: {id: 2, type: StructureType.Url, title: 'Tag Link', value: ''},
                            link: {id: 3, type: StructureType.Url, title: 'Link', value: ''},
                        }
                    },
                    smallPost: {
                        id: 1, type: StructureType.Object, title: 'Small Post', value: {
                            image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                            title: {id: 1, type: StructureType.String, title: 'Title', value: ''},
                            tagLink: {id: 2, type: StructureType.Url, title: 'Tag Link', value: ''},
                            link: {id: 3, type: StructureType.Url, title: 'Link', value: ''},
                        }
                    }
                }
            ]
        });
        this.model = {...this.model};
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
