<template>
    <div>
        <img src="/blocks/ProductFeatureWithImageWithBTN.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";
import {Direction} from "~/interfaces/DirectionEnum";

@Component
export default class BlockProductFeatureWithImage extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: Object;

    Theme = Theme;
    Direction = Direction;

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
                direction: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Direction",
                    value: Direction.ltr,
                    items: [
                        {title: "Left To Right", value: this.Direction.ltr},
                        {title: "Right To Left", value: this.Direction.rtl},
                    ],
                },
                title: {
                    id: 2,
                    type: StructureType.String,
                    title: 'Title',
                    value: "Android TV"
                },
                paragraphOne: {
                    id: 3,
                    type: StructureType.String,
                    title: 'Paragraph One',
                    value: "Puts your favourite content front and center. Where it’s ready to watch or pick up where you left off. Stream more than 500,000 shows, movies and apps, as well as watch live sports and news."
                },
                paragraphTwo: {
                    id: 4,
                    type: StructureType.String,
                    title: 'Description',
                    value: "With the Google Assistant built-in, you can turn on the lights, change the thermostat, add stuff to your grocery list, and control your TV with your voice. And with universal search, you can even get recommendations with Android TV."
                },
                image: {
                    id: 5,
                    type: StructureType.Image,
                    title: 'Image',
                    src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/26632e121d/pdp-3_6-u9-50-50-feat-1__ScaleMaxWidthWzMwNDhd.jpg-t34p4p.jpg',
                    alt: 'featured image'
                },
                link: {
                    id: 6,
                    type: StructureType.Url,
                    title: 'Link',
                    value: "/"
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
        // this.loadProduct();
    }

    loadProduct() {
        // this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/' + this.product_id )
        this.$axios
            .$get("https://impim.dev-api.hisenseportal.com/api/cms/getProduct/781")
            .then((res) => {
                this.product = res.data;
            })
            .finally(() => {
                this.loadingProduct = false;
            });
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
