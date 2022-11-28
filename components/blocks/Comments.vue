<template>
    <div>
        <img src="/blocks/Comments.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeComments extends Vue {
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
                comments: {
                    id: 1, type: StructureType.List,
                    title: 'Comments',
                    newItem: {
                        quote: {
                            id: 0,
                            type: StructureType.String,
                            title: 'Quote',
                            value: 'The best UST for gaming I\'ve tried so far.'
                        },
                        author: {
                            id: 0,
                            type: StructureType.String,
                            title: 'Comment',
                            value: 'Mark Henninger, ProjectorCentral.com'
                        },
                    },
                    value: [
                        {
                            quote: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Quote',
                                value: 'The best UST for gaming I\'ve tried so far.'
                            },
                            author: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Comment',
                                value: 'Mark Henninger, ProjectorCentral.com'
                            },
                        },
                        {
                            quote: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Quote',
                                value: 'We have reviewed several good Laser TVs, but the L9G is arguably the best.'
                            },
                            author: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Comment',
                                value: 'Phil Jones, ProjectorReviews.com'
                            },
                        },
                        {
                            quote: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Quote',
                                value: 'The screen needs to be part of the UST experience, and the inclusion of a high-quality, easily adjustable screen sets the Hisense apart.'
                            },
                            author: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Comment',
                                value: 'Mark Henninger, ProjectorCentral.com'
                            },
                        },
                        {
                            quote: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Quote',
                                value: 'The color that this projector produces are just stunning.'
                            },
                            author: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Comment',
                                value: 'Phil Jones, ProjectorReviews.com'
                            },
                        },
                        {
                            quote: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Quote',
                                value: 'I saw extremely rich colors and excellent rendering of fine gradation at all brightness levels, and no notion of the tonality being out of balance. It\'s an impressive feat of dynamic contrast picture processing that allows the L9G to rise to the top of its class.'
                            },
                            author: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Comment',
                                value: 'Mark Henninger, ProjectorCentral.com'
                            },
                        },
                        {
                            quote: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Quote',
                                value: 'Quite possibly, the best-designed Laser TV that I\'ve reviewed in the last two years.'
                            },
                            author: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Comment',
                                value: 'Phil Jones, ProjectorReviews.com'
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
