<template>
    <div>
        <img src="/blocks/ProductTwinImages.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockProductTwinImages extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        {title: "Light", value: this.Theme.light},
                        {title: "Dark", value: this.Theme.dark},
                    ],
                },
                imageLeft: {
                    id: 1,
                    type: StructureType.Image,
                    title: 'Upload left image',
                    src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/7daa063bd6/pdp-3_6-u9-close-up-shot-1__ScaleMaxWidthWzMwNDhd.jpg-2uhe16.jpg',
                    alt: 'featured image',
                },
                imageRight: {
                    id: 2,
                    type: StructureType.Image,
                    title: 'Upload rigth image',
                    src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/d6c7d4d6e7/pdp-3_6-u9-close-up-shot-2__ScaleMaxWidthWzMwNDhd.jpg-6h9mqf.jpg',
                    alt: 'featured image',
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();

    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch('isEmpty')
    onValueChanged() {

        if (this.isEmpty) this.reset();
    }
}
</script>

<style type="text/css">

</style>
