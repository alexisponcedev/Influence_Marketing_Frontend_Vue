<template>
    <div>
        <img src="/blocks/MoreTvExperts.png" alt="">
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockMoreTvExperts extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: Object

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
                title: {id: 1, type: StructureType.String, title: 'Title', value: "The experts agree."},
                coloredTitle: {
                    id: 1,
                    type: StructureType.String,
                    title: 'Colored Title',
                    value: "We make awesome TVs."
                },
                image: {
                    id: 2,
                    type: StructureType.Image,
                    title: 'Header Image',
                    src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
                    alt: 'MoreTv Head',
                },
                list: {
                    id: 3,
                    type: StructureType.List,
                    title: 'quotes',
                    newItem: {
                        quote: {
                            id: 0,
                            type: StructureType.String,
                            title: 'Quote',
                            value: "Best Budget TV for watching sports"
                        },
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: 'Quote image',
                            src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
                            alt: 'MoreTv Head',
                        },
                    },
                    value: [
                        {
                            quote: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Quote',
                                value: "Best Budget TV for watching sports"
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Quote image',
                                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
                                alt: 'MoreTv Head',
                            },
                        },
                        {
                            quote: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Quote',
                                value: "In a class all of its own"
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Quote image',
                                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
                                alt: 'MoreTv Head',
                            },
                        },
                        {
                            quote: {
                                id: 0,
                                type: StructureType.String,
                                title: 'Quote',
                                value: "Dazzling bright and full of features"
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Quote image',
                                src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/39f6c6b03f/content_dp-beautiful-screen-min-clikhq.png',
                                alt: 'MoreTv Head',
                            },
                        },
                    ]
                }
            }
    }

    mounted() {
        if (this.isEmpty) this.reset();
        // this.loadProduct();
    }

    loadProduct() {
        // this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/' + this.product_id )
        this.$axios.$get('https://impim.dev-api.hisenseportal.com/api/cms/getProduct/781')
            .then(res => {
                this.product = res.data;
            }).finally(() => {
            this.loadingProduct = false;
        })
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
