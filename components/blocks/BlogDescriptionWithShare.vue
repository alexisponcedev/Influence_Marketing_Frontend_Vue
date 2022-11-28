<template>
    <div>
        <img src="/blocks/BlogDescriptionWithShare.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class BlogDescriptionWithShare extends Vue {
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
                text: {id: 0, type: StructureType.Text, title: 'Text', value: ''},
                sharingTitle: {id: 1, type: StructureType.String, title: 'Sharing Title', value: ''},
                list: {
                    id: 2, type: StructureType.List, title: 'List',
                    newItem: {
                        link: {id: 0, type: StructureType.Url, title: 'Link', value: ''},
                        socialMedia: {
                            id: 1, type: StructureType.Select,
                            title: 'Social Media',
                            value: "linkedin",
                            items: [
                                {title: "LinkedIn", value: "linkedin"},
                                {title: "Twitter", value: "twitter"},
                                {title: "Facebook", value: "facebook"},
                                {title: "Link", value: "link"},
                            ]
                        },
                    },
                    value: [
                        {
                            link: {id: 0, type: StructureType.Url, title: 'Link', value: ''},
                            socialMedia: {
                                id: 1, type: StructureType.Select, title: 'Social Media', value: "linkedin",
                                items: [
                                    {title: "LinkedIn", value: "linkedin"},
                                    {title: "Twitter", value: "twitter"},
                                    {title: "Facebook", value: "facebook"},
                                    {title: "Link", value: "link"},
                                ]
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
