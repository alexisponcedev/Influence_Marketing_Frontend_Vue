<template>
    <div>
        <img src="/blocks/ContactUsNewForm.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class ContactUsNewForm extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({ default: true }) readonly editable: Boolean | undefined
    @VModel({ type: Object }) model!: any



    mounted() {
        blockAddItem(this.model, 'tab1', {
            id: 0, type: StructureType.Object, title: 'Form Tab', value: {
                title: { id: 0, type: StructureType.String, title: 'Title', value: 'Sample Title' },
                subtitle: { id: 1, type: StructureType.String, title: 'Subtitle', value: 'Sample Subtitle' }
            }
        })

        blockAddItem(this.model, 'tab2', {
            id: 0, type: StructureType.Object, title: 'Form Call', value: {
                title: { id: 0, type: StructureType.String, title: 'Title', value: 'Sample Title' },
                subtitle: { id: 1, type: StructureType.String, title: 'Subtitle', value: 'Sample Subtitle' },
                list: {
                    id: 2, type: StructureType.List, title: 'List',
                    newItem: {
                        title: { id: 0, type: StructureType.String, title: 'Title', value: '' },
                        image: { id: 1, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt' },
                    },
                    value: [
                        {
                            title: { id: 0, type: StructureType.String, title: 'Title', value: '' },
                            image: { id: 1, type: StructureType.Image, title: 'Image', src: '', alt: 'Image Alt' },
                        }
                    ]

                }
            }
        })

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

}
</script>
