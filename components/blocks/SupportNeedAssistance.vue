<template>
    <div>
        <img src="/blocks/SupportNeedAssistance.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";


@Component
export default class SupportNeedAssistance extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, 'theme', {
            id: 0,
            type: StructureType.Select,
            title: 'Theme',
            value: Theme.dark,
            items: [
                {title: 'Light', value: this.Theme.light},
                {title: 'Dark', value: this.Theme.dark},
            ]
        })

        blockAddItem(this.model, 'image', {id: 1, type: StructureType.Image, title: 'Image', src: '', alt: ''});
        blockAddItem(this.model, 'title', {
            id: 2,
            type: StructureType.String,
            title: 'Title',
            value: 'Need More Assistance?'
        });
        blockAddItem(this.model, 'link', {id: 3, type: StructureType.Url, title: 'Contact Us', value: '/contact'});

        blockRemoveItem(this.model, ['linkTitle']);
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
