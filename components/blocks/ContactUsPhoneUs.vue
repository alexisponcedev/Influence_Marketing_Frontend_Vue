<template>
    <div>
        <img src="/blocks/ContactUsPhoneUs.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class ContactUsPhoneUs extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    mounted() {
        blockAddItem(this.model, 'title', {id: 0, type: StructureType.String, title: 'Title', value: ''},)
        blockAddItem(this.model, 'contact', {
            id: 1, type: StructureType.Object, title: 'Contact Information',
            value: {
                title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                list: {
                    id: 1, type: StructureType.List, title: 'List',
                    newItem: {
                        title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                        subtitle: {id: 1, type: StructureType.String, title: 'Subtitle', value: ''},
                    },
                    value: [
                        {
                            title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                            subtitle: {id: 1, type: StructureType.String, title: 'Subtitle', value: ''},

                        }
                    ]
                },
            }
        })

        blockAddItem(this.model, 'middleBox', {
            id: 2, type: StructureType.Object,
            title: 'Middle Box',
            value: {
                image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                phoneNumber: {id: 0, type: StructureType.String, title: 'Phone Number', value: ''},
            }
        })

        blockAddItem(this.model, 'rightBox', {
            id: 3, type: StructureType.Object,
            title: 'Right Box',
            value: {
                image: {id: 0, type: StructureType.Image, title: 'Image', src: '', alt: ''},
                title: {id: 0, type: StructureType.String, title: 'Title', value: ''},
                phoneNumber: {id: 0, type: StructureType.String, title: 'Phone Number', value: ''},
            }
        })
        blockRemoveItem(this.model, ['list']);
        this.model = {... this.model};
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
