<template>
    <div>
        <img src="/blocks/TvAndAudioLaserIntro.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockTvAndAudioLaserIntro extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

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
                    title: 'Theme',
                    value: Theme.dark,
                    items: [
                        {title: 'Light', value: this.Theme.light},
                        {title: 'Dark', value: this.Theme.dark},
                    ]
                },
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: 'Upload Image',
                    src: 'https://assets.hisense-usa.com/resources/themes/default/images/brandassets/logo-lasertv.svg',
                    alt: 'Some note about this image',
                },
                title: {
                    id: 2,
                    type: StructureType.String,
                    title: "Title",
                    value: "4K HDR",
                },
                primarylittleTitle: {
                    id: 3,
                    type: StructureType.String,
                    title: "Little Title",
                    value: "120 INCHES OF REALITY",
                },
                littleTitle: {
                    id: 4,
                    type: StructureType.String,
                    title: "Little Title",
                    value: "BIG.BOLD.BEAUTIFUL.",
                },
                paragraph: {
                    id: 5,
                    type: StructureType.String,
                    title: "Paragraph",
                    value: "The Hisense 4K UHD Smart Laser TV with Wide Color Gamut features a dual-color laser that displays a cinema-like picture full of rich, vibrant and true-to-life colors on an incredible 120” display. At every distance and angle, images are sharp and comfortable to watch for an immersive home-theater experience.",
                },
            }
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
