<template>
    <div>
        <img v-if="model.image" :src="model.image.src" :alt="model.image.alt"/>
        <img v-else src="/blocks/L9GImageBox.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";


@Component
export default class L9GImageBox extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

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
        blockAddItem(this.model, 'image', {
            id: 1,
            type: StructureType.Image,
            title: 'Image',
            src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/b52570711e/22-9_RELAX-BREATHE-min__ScaleMaxWidthWzMwNDhd.png-t4p64p.png',
            alt: 'Some note about this image',
        })
        blockAddItem(this.model, 'title', {
            id: 2,
            type: StructureType.SimpleText,
            title: 'Title',
            value: 'Relax. <br/> Breathe.'
        })
        blockAddItem(this.model, 'subtitle', {
            id: 3,
            type: StructureType.SimpleText,
            title: 'Subtitle',
            value: 'Transform.'
        })
        blockAddItem(this.model, 'text', {
            id: 4,
            type: StructureType.SimpleText,
            title: 'Text',
            value: 'Drift away with library-quiet Hisense air products.'
        })

        this.model = {...this.model};

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css">

</style>
