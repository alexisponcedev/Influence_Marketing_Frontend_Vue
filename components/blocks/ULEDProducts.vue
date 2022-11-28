<template>
    <div>
        <img src="/blocks/ULEDProducts.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockULEDProducts extends Vue {
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
                        title: {
                            id: 0,
                            type: StructureType.String,
                            title: "Title",
                            value: "LASER TVS",
                        },
                        description: {
                            id: 1,
                            type: StructureType.String,
                            title: "Description",
                            value: "Discover a New Expanse of Color",
                        },
                        image: {
                            id: 2,
                            type: StructureType.Image,
                            title: "Upload Image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                            alt: "Some note about this image",
                        },
                        list: {
                            id: 3,
                            type: StructureType.List,
                            title: 'Links',
                            newItem: {link: {id: 1, type: StructureType.Url, title: 'Discover', value: ''}},
                            value: [
                                {
                                    link: {id: 1, type: StructureType.Url, title: 'Discover', value: ''},
                                },
                            ]
                        },
                    },
                    value: [
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Title",
                                value: "LASER TVS",
                            },
                            description: {
                                id: 1,
                                type: StructureType.String,
                                title: "Description",
                                value: "Discover a New Expanse of Color",
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: "Upload Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image",
                            },
                            list: {
                                id: 3,
                                type: StructureType.List,
                                title: 'Links',
                                newItem: {link: {id: 1, type: StructureType.Url, title: 'Discover', value: ''}},
                                value: [
                                    {
                                        link: {id: 1, type: StructureType.Url, title: 'Discover', value: ''},
                                    },
                                ]
                            },
                        },
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Title",
                                value: "LASER TVS",
                            },
                            description: {
                                id: 1,
                                type: StructureType.String,
                                title: "Description",
                                value: "Discover a New Expanse of Color",
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: "Upload Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image",
                            },
                            list: {
                                id: 3,
                                type: StructureType.List,
                                title: 'Links',
                                newItem: {link: {id: 1, type: StructureType.Url, title: 'Discover', value: ''}},
                                value: [
                                    {
                                        link: {id: 1, type: StructureType.Url, title: 'Discover', value: ''},
                                    },
                                ]
                            },

                            // linkTitle: {id: 3, type: StructureType.String, title: 'Link Title', value: 'Discover'},
                            // linkUrl: {id: 4, type: StructureType.Url, title: 'Link URL', value: '/'},
                            //
                            // whereToBuy: {
                            //   id: 5,
                            //   type: StructureType.Select,
                            //   title: 'Show Where To Buy',
                            //   value: true,
                            //   items: [
                            //     {title: 'True', value: true},
                            //     {title: 'False', value: false},
                            //   ]
                            // },
                            // model: {id: 6, type: StructureType.String, title: 'Product Model', value: ''}
                        },
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Title",
                                value: "LASER TVS",
                            },
                            description: {
                                id: 1,
                                type: StructureType.String,
                                title: "Description",
                                value: "Discover a New Expanse of Color",
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: "Upload Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image",
                            },
                            list: {
                                id: 3,
                                type: StructureType.List,
                                title: 'Links',
                                newItem: {link: {id: 1, type: StructureType.Url, title: 'Discover', value: ''}},
                                value: [
                                    {
                                        link: {id: 1, type: StructureType.Url, title: 'Discover', value: ''},
                                    },
                                ]
                            },


                            // list:{
                            //   id : 3 , type : StructureType.List , title : 'Links' , newItem : {} , value : [
                            //     {
                            //       linkTitle : {id : 0 , type : StructureType.String , title : 'Link Title' , value : 'Discover'},
                            //       linkUrl : {id : 1 , type : StructureType.Url , title : 'Link URL' , value : '/'},
                            //     }
                            //   ]
                            // },

                            // linkTitle: {id: 3, type: StructureType.String, title: 'Link Title', value: 'Discover'},
                            // linkUrl: {id: 4, type: StructureType.Url, title: 'Link URL', value: '/'},
                            //
                            // whereToBuy: {
                            //   id: 5,
                            //   type: StructureType.Select,
                            //   title: 'Show Where To Buy',
                            //   value: true,
                            //   items: [
                            //     {title: 'True', value: true},
                            //     {title: 'False', value: false},
                            //   ]
                            // },
                            // model: {id: 6, type: StructureType.String, title: 'Product Model', value: ''}
                        },
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Title",
                                value: "LASER TVS",
                            },
                            description: {
                                id: 1,
                                type: StructureType.String,
                                title: "Description",
                                value: "Discover a New Expanse of Color",
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: "Upload Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image",
                            },
                            list: {
                                id: 3,
                                type: StructureType.List,
                                title: 'Links',
                                newItem: {link: {id: 1, type: StructureType.Url, title: 'Discover', value: ''}},
                                value: [
                                    {
                                        link: {id: 1, type: StructureType.Url, title: 'Discover', value: ''},
                                    },
                                ]
                            },

                            // list:{
                            //   id : 3 , type : StructureType.List , title : 'Links' , newItem : {} , value : [
                            //     {
                            //       linkTitle : {id : 0 , type : StructureType.String , title : 'Link Title' , value : 'Discover'},
                            //       linkUrl : {id : 1 , type : StructureType.Url , title : 'Link URL' , value : '/'},
                            //     }
                            //   ]
                            // },

                            // linkTitle: {id: 3, type: StructureType.String, title: 'Link Title', value: 'Discover'},
                            // linkUrl: {id: 4, type: StructureType.Url, title: 'Link URL', value: '/'},
                            //
                            // whereToBuy: {
                            //   id: 5,
                            //   type: StructureType.Select,
                            //   title: 'Show Where To Buy',
                            //   value: true,
                            //   items: [
                            //     {title: 'True', value: true},
                            //     {title: 'False', value: false},
                            //   ]
                            // },
                            // model: {id: 6, type: StructureType.String, title: 'Product Model', value: ''}
                        },
                    ],
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
