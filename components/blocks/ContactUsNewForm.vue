<template>
    <div>
        <img src="/blocks/ContactUsNewForm.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class ContactUsNewForm extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any


    mounted() {
        blockAddItem(this.model, 'title', {id: 0, type: StructureType.String, title: 'Title', value: 'Sample Title'});
        blockAddItem(this.model, 'form', {
            id: 1, type: StructureType.Object, title: 'Form Tab', value: {
                title: {id: 0, type: StructureType.String, title: 'Title', value: 'Sample Title'},
                subtitle: {id: 1, type: StructureType.String, title: 'Subtitle', value: 'Sample Subtitle'}
            }
        })

        blockAddItem(this.model, 'connection', {
            id: 2, type: StructureType.Object, title: 'Form Call', value: {
                title: {id: 0, type: StructureType.String, title: 'Title', value: 'Sample Title'},
                subtitle: {id: 1, type: StructureType.String, title: 'Subtitle', value: 'Sample Subtitle'},
                text: {id: 2, type: StructureType.Text, title: 'Serial Number Detail', value: ''},
                // list: {
                //     id: 2, type: StructureType.List, title: 'List',
                //     newItem: {
                //         title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                //         image: {id: 1, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
                //         link: {id: 2, type: StructureType.Url, title: 'Link', value: ''},
                //     },
                //     value: [
                //         {
                //             title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                //             image: {id: 1, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt'},
                //             link: {id: 2, type: StructureType.Url, title: 'Link', value: ''},
                //         }
                //     ]
                //
                // }
            }
        })
        blockRemoveItem(this.model, ['generalInquirySubmitUrl', 'partAndServiceSupportSubmitUrl', 'tab1', 'tab2'])
        this.model = {...this.model};
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

}
</script>
