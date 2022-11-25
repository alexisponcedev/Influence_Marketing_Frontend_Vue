<template>
    <div>
        <img src="/blocks/Awards.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeAwards extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: Object

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                title: {id: 0, type: StructureType.String, title: 'Title', value: 'Awards and Accolades'},
                awards: {
                    id: 1, type: StructureType.List,
                    title: 'Awards',
                    newItem: {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: 'Image',
                            src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/projectorreviewsbadge.png',
                            alt: 'Image Alt'
                        },
                    },
                    value: [
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Image',
                                src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/projectorreviewsbadge.png',
                                alt: 'Image Alt'
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Image',
                                src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/valueelectronicsbadge.png',
                                alt: 'Image Alt'
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Image',
                                src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/projectorcentralbadge.png',
                                alt: 'Image Alt'
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Image',
                                src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/cediabadge.png',
                                alt: 'Image Alt'
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: 'Image',
                                src: 'https://assets.hisense-usa.com/resources/themes/default/images/products/lg9/projectorscreenbadge.png',
                                alt: 'Image Alt'
                            },
                        },
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

    @Watch('value')
    onValueChanged(newValue: any, oldValue: any) {
        if (newValue && Object.keys(newValue).length === 0) this.reset(oldValue);
    }
}
</script>
