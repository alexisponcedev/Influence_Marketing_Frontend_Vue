<template>
    <div>
        <img src="/blocks/ContactUsChat.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class ContactUsChat extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any


    mounted() {
        blockAddItem(this.model, 'link', {id: 0, type: StructureType.Url, title: 'Link', value: ''});
        blockAddItem(this.model, 'title', {id: 1, type: StructureType.String, title: 'Title', value: 'Title Text'});
        blockAddItem(this.model, 'subtitle', {id: 2, type: StructureType.String, title: 'Subtitle', value: 'Subtitle Text'});
        blockRemoveItem(this.model, ['generalInquirySubmitUrl', 'partAndServiceSupportSubmitUrl', 'tab1', 'tab2'])
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

}
</script>
