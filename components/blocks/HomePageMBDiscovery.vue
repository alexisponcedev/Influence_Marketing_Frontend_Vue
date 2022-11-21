<template>
    <div>
        <!--    <img src="/blocks/HomePageMBDiscovery.png" alt=""/>-->
        <img src="/blocks/HomePageMBDiscovery.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";


@Component
export default class HomePageMBDiscovery extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: Object


    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {

                title: {
                    id: 0,
                    type: StructureType.String,
                    title: 'Title',
                    value: 'There’s More to Discover at Hisense'
                },
                list: {
                    id: 1,
                    type: StructureType.List,
                    title: 'Items',
                    newItem: {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: 'Upload Image',
                            src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png',
                            alt: 'Some note about this image',
                        },
                        title: {id: 1, type: StructureType.String, title: 'Title', value: 'Televisions'},
                        link: {id: 2, type: StructureType.Url, title: 'Shop Now URL', value: '/products'},
                    },
                    value: [
                        {
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Upload Image',
                                src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355b2b6a3d41.webp",
                                alt: 'Some note about this image',
                            },
                            title: {
                                id: 2,
                                type: StructureType.String,
                                title: 'Title',
                                value: '100 Days. $100 Reward. No Regrets.'
                            },
                            grayTitle: {
                                id: 3,
                                type: StructureType.String,
                                title: 'Gray Title',
                                value: 'Limited time offer on eligible 65-inch & up Hisense Google TVs.'
                            },
                            linkTitle: {id: 4, type: StructureType.String, title: 'Link Title', value: 'Learn More'},
                            link: {id: 5, type: StructureType.Url, title: 'Link Url', value: '/'},
                        },
                        {
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Upload Image',
                                src: '',
                                alt: 'Some note about this image',
                            },
                            title: {
                                id: 2,
                                type: StructureType.String,
                                title: 'Title',
                                value: 'Double your warranty* with Hisense! '
                            },
                            grayTitle: {
                                id: 3,
                                type: StructureType.String,
                                title: 'Gray Title',
                                value: '*compared to the 1 year industry standard.'
                            },
                            linkTitle: {id: 4, type: StructureType.String, title: 'Link Title', value: 'View Products'},
                            link: {id: 5, type: StructureType.Url, title: 'Link Url', value: '/'},
                        },
                        {
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Upload Image',
                                src: '',
                                alt: 'Some note about this image',
                            },
                            title: {
                                id: 2,
                                type: StructureType.String,
                                title: 'Title',
                                value: 'Let’s get real. These are the TVs your old TV should be worried about.'
                            },
                            grayTitle: {id: 3, type: StructureType.String, title: 'Gray Title', value: ''},
                            linkTitle: {id: 4, type: StructureType.String, title: 'Link Title', value: 'See The Range'},
                            link: {id: 5, type: StructureType.Url, title: 'Link Url', value: '/'},
                        },
                    ]
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

<style scoped>
.main-title {
    font-family: 'hisense', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 42px;
    line-height: 48px;

    text-align: center;
    color: #000000;
    margin-top: 70px;
    margin-bottom: 72px;
}
</style>
