<template>
    <div>
        <img src="/blocks/ExtendedWarrantyPaymentStatus.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class ExtendedWarrantyPaymentStatus extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({ default: true }) readonly editable: Boolean | undefined
    @VModel({ type: Object }) model!: any

    mounted() {
        blockAddItem(this.model, 'PDF', {
            id: 0,
            type: StructureType.File,
            title: 'PDF File',
            src: '',
            alt: ''
        })

        blockAddItem(this.model, 'list', {
            id: 0,
            type: StructureType.List,
            title: 'List',
            newItem: {
                image: { id: 0, type: StructureType.Image, title: 'Image', src: '', alt: '' },
                text: { id: 1, type: StructureType.Text, title: 'Text', value: 'Success' },
                link: { id: 2, type: StructureType.Url, title: 'Link', value: '' }
            },
            value: [
                {
                    image: { id: 0, type: StructureType.Image, title: 'Image', src: '', alt: '' },
                    text: { id: 1, type: StructureType.Text, title: 'Text', value: 'Success' },
                    link: { id: 2, type: StructureType.Url, title: 'Link', value: '' },
                    termsLink: { id: 3, type: StructureType.Url, title: '', value: '' },

                },
                {
                    image: { id: 0, type: StructureType.Image, title: 'Image', src: '', alt: '' },
                    text: { id: 1, type: StructureType.Text, title: 'Text', value: 'Failed' },
                    link: { id: 2, type: StructureType.Url, title: 'Link', value: '' }
                }
            ]
        })
        this.model = { ... this.model }
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

}
</script>
