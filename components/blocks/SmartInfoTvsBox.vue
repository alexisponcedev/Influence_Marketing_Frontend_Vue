<template>
    <div>
        <img src="/blocks/SmartInfoTvsBox.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockSmartInfoTvsBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: Object;

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
                        title: {
                            id: 1,
                            type: StructureType.String,
                            title: "Title",
                            value: "Google tv",
                        },
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Upload Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                            alt: "Some note about this image",
                        },
                        description: {
                            id: 2,
                            type: StructureType.String,
                            title: "Description",
                            value: "Thousands of streaming channels at your fingertips",
                        },
                        link: {
                            id: 3,
                            type: StructureType.Url,
                            title: "Discover",
                            value: "",
                        },
                    },
                    value: [
                        {
                            color: {id: 0, type: StructureType.Color, title: 'Background Color', value: '#fff'},
                            title: {id: 1, type: StructureType.String, title: "Title", value: "Android TV"},
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image"
                            },
                            description: {
                                id: 2,
                                type: StructureType.String,
                                title: "Description",
                                value: "Thousands of streaming channels at your fingertips"
                            },
                            link: {id: 3, type: StructureType.Url, title: "Discover", value: ""},
                        },
                        {
                            color: {id: 0, type: StructureType.Color, title: 'Background Color', value: '#fff'},
                            title: {id: 1, type: StructureType.String, title: "Title", value: "Android TV"},
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image"
                            },
                            description: {
                                id: 2,
                                type: StructureType.String,
                                title: "Description",
                                value: "Thousands of streaming channels at your fingertips"
                            },
                            link: {id: 3, type: StructureType.Url, title: "Discover", value: ""},
                        },
                        {
                            color: {id: 0, type: StructureType.Color, title: 'Background Color', value: '#fff'},
                            title: {id: 1, type: StructureType.String, title: "Title", value: "Android TV"},
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image"
                            },
                            description: {
                                id: 2,
                                type: StructureType.String,
                                title: "Description",
                                value: "Thousands of streaming channels at your fingertips"
                            },
                            link: {id: 3, type: StructureType.Url, title: "Discover", value: ""},
                        },
                        {
                            color: {id: 0, type: StructureType.Color, title: 'Background Color', value: '#fff'},
                            title: {id: 1, type: StructureType.String, title: "Title", value: "Android TV"},
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image"
                            },
                            description: {
                                id: 2,
                                type: StructureType.String,
                                title: "Description",
                                value: "Thousands of streaming channels at your fingertips"
                            },
                            link: {id: 3, type: StructureType.Url, title: "Discover", value: ""},
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

<style type="text/css"></style>
