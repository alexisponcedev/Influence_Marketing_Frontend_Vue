<template>
    <div>
        <img src="/blocks/ExtendedWarrantyFAQ.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class ExtendedWarrantyFAQ extends Vue {
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
                    id: 1, type: StructureType.List,
                    title: 'List',
                    newItem: {
                        title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                        questions: {
                            id: 1, type: StructureType.List, title: 'Questions',
                            newItem: {
                                question: {id: 0, type: StructureType.String, title: 'Question', value: ''},
                                answer: {id: 1, type: StructureType.Text, title: 'Answer', value: ''}
                            },
                            value: [
                                {
                                    question: {id: 0, type: StructureType.String, title: 'Question', value: ''},
                                    answer: {id: 1, type: StructureType.Text, title: 'Answer', value: ''}
                                }
                            ]
                        }
                    },
                    value: [
                        {
                            title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                            questions: {
                                id: 1, type: StructureType.List, title: 'Questions',
                                newItem: {
                                    question: {id: 0, type: StructureType.String, title: 'Question', value: ''},
                                    answer: {id: 1, type: StructureType.Text, title: 'Answer', value: ''}
                                },
                                value: [
                                    {
                                        question: {id: 0, type: StructureType.String, title: 'Question', value: ''},
                                        answer: {id: 1, type: StructureType.Text, title: 'Answer', value: ''}
                                    }
                                ]
                            }
                        }
                    ]
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
