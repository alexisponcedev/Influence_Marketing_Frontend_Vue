<template>
    <div>
        <img src="/blocks/LaserImageAndTextBox.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockLaserImageAndTextBox extends Vue {
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
                list: {
                    id: 1,
                    type: StructureType.List,
                    title: "Items",
                    newItem: {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Upload Image",
                            src: "",
                            alt: "featured image",
                        },
                        title: {
                            id: 1,
                            type: StructureType.String,
                            title: "Title",
                            value: "",
                        },
                        description: {
                            id: 2,
                            type: StructureType.String,
                            title: "description",
                            value: "",
                        },
                    },
                    value: [
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Upload Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/782cec7516/content_dp-100-120-screen-min-f8h2el.png",
                                alt: "featured image",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: '100" to 120" Screen',
                            },
                            description: {
                                id: 2,
                                type: StructureType.String,
                                title: "description",
                                value: `Bigger is Better. Experience all your favorite content on a screen that's 4X bigger than a 55" TV. TV this big makes old favorites feel like something brand new.`,
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Upload Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/d23d7365de/wide-color-gamut__ScaleMaxWidthWzMwNDhd.jpg-vbcmqu.jpg",
                                alt: "featured image",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: "Wide Color Gamut",
                            },
                            description: {
                                id: 2,
                                type: StructureType.String,
                                title: "description",
                                value: "True-to-Life Colors. With pure color lasers you can enjoy an enhanced spectrum of color thats looks more like the real world.",
                            },
                        },
                    ]
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
        // this.loadProduct();
    }

    loadProduct() {
        // this.$axios.$get(process.env.PIM_API_URL + '/cms/getProduct/' + this.product_id )
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
