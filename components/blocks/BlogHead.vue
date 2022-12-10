<template>
    <div>
        <img src="/blocks/BlogHead.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlogHead extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any


    mounted() {
        blockAddItem(this.model, 'tagLink', {id: 0, type: StructureType.Url, title: 'Top Tag Link', value: ''});
        blockAddItem(this.model, 'title', {id: 0, type: StructureType.SimpleText, title: 'Title', value: ''});
        blockAddItem(this.model, 'sharingTitle', {
            id: 1,
            type: StructureType.String,
            title: 'Sharing Title',
            value: ''
        });
        blockAddItem(this.model, 'list', {
            id: 2, type: StructureType.List, title: 'List',
            newItem: {
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
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
