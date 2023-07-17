<template>
    <div>
        <img src="/blocks/OfferClaimForm.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class OfferClaimForm extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: any;

    Theme = Theme;

    mounted() {

        blockAddItem(this.model, 'theme', {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                {title: "Light", value: this.Theme.light},
                {title: "Dark", value: this.Theme.dark},
            ],
        })
        blockAddItem(this.model, 'title', {
            id: 1,
            type: StructureType.String,
            title: 'Title',
            value: 'Offer Claim Form'
        })
        blockAddItem(this.model, 'modelContent', {
            id: 3,
            type: StructureType.Text,
            title: 'Modal Content',
            value: 'Modal content goes here ...'
        })

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
