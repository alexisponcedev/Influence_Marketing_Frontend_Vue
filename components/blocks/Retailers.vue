<template>
    <div>
        <img src="/blocks/Retailers.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class HomeRetailers extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop({default: true}) readonly editable: Boolean | undefined
    @VModel({type: Object}) model!: any

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                title: {id: 0, type: StructureType.String, title: 'Title', value: 'Find Me At A Store'},
                subtitle: {
                    id: 1,
                    type: StructureType.String,
                    title: 'Subtitle',
                    value: 'Check with these retailers for product availability.'
                },
                list: {
                    id: 2, type: StructureType.List, title: 'List',
                    newItem: {
                        title: {id: 0, type: StructureType.String, title: "Title", value: 'BestBuy'},
                        link: {
                            id: 1,
                            type: StructureType.String,
                            title: 'Link',
                            value: "https://wwwbestbuy.com/site/hisense-l5g-laser-tv-ultra-short-throw-projector-with-120-alr-screen-4k-uhd-2700-lumens-hdr10-android-tv-black/6502768.p?skuId=6502768"
                        },
                        image: {
                            id: 2,
                            type: StructureType.Image,
                            title: 'Image',
                            src: "https://assets.hisense-usa.com/assets/RetailerLogos/1c00787e48/432px-Target_logo-v2__ScaleMaxWidthWzI1Nl0.svg.png",
                            alt: "Find Me At BestBuy"
                        },
                    },
                    value: [
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'BestBuy'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://wwwbestbuy.com/site/hisense-l5g-laser-tv-ultra-short-throw-projector-with-120-alr-screen-4k-uhd-2700-lumens-hdr10-android-tv-black/6502768.p?skuId=6502768"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/1c00787e48/432px-Target_logo-v2__ScaleMaxWidthWzI1Nl0.svg.png",
                                alt: "Find Me At BestBuy"
                            },
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'Brandsmart USA'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://www.brandsmartusa.com/hisense/251794/l9-series-120-4k-trichroma-laser-tv-with-ambient-light-rejecting-cinema-screen.htm"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/abd1d8ed4c/Brandsmartl_1DC8482E-2FB1-4429-AC16D1889676F738_2e2117d2-8621-44cb-a484a6a49c6646ee-v2__ScaleMaxWidthWzI1Nl0.png",
                                alt: "Find Me At Brandsmart USA"
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'Crutchfield'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://www.brandsmartusa.com/hisense/251794/l9-series-120-4k-trichroma-laser-tv-with-ambient-light-rejecting-cinema-screen.htm"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/8c45fc3060/crutchfield-logo-black__ScaleMaxWidthWzI1Nl0.png",
                                alt: "Find Me At Crutchfield"
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'Curacao'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://icuracao.com/4k-triple-laser-tv-w-ultra-short-throw-projector.html"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/0343f85a1a/Curacao_logo__ScaleMaxWidthWzI1Nl0.jpeg",
                                alt: "Find Me At Curacao"
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'Electronic Express'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://www.electronicexpress.com/catalog/200602/hisense-4k-ultra-short-throw-laser-projection-tv-w-120-inch-alr"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/01d8465f7f/ee-logo__ScaleMaxWidthWzI1Nl0.png",
                                alt: "Find Me At Electronic Express"
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'Newegg'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://www.newegg.com/hisense-120l9gu-dlp/p/236-00ES-00007?Item=236-00ES-00007"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/8dd357fe5f/pngegg__ScaleMaxWidthWzI1Nl0.png",
                                alt: "Find Me At Newegg"
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'P.C. Richard &amp; Son'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://www.pcrichard.com/hisense-120-trichroma-ultra-short-throw-l9g-projector-and-screen-bundle/120L9CINE120.html"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/57dcccf60e/PC-RICHARDS-LOGO__ScaleMaxWidthWzI1Nl0.png",
                                alt: "Find Me At P.C. Richard &amp; Son"
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'Projector Screen'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://www.projectorscreen.com/hisense-120l9g-trichroma-laser-tv-4k-projector-ust-screen"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/6faaee3050/PSCO-WhereToBuy-375x175__ScaleMaxWidthWzI1Nl0.png",
                                alt: "Find Me At Projector Screen"
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'Sky by Gramophone'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://skybygramophone.com/products/hisense-l9g-laser-tv?_pos=1&amp;_sid=cc2d5bfea&amp;_ss=r&amp;variant=41396414873764"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/963519af48/skybygramophone-logo__ScaleMaxWidthWzI1Nl0.jpeg",
                                alt: "Find Me At Sky by Gramophone"
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'Value Electronics'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://valueelectronics.com/product/hisense-l5-120-fixed-ust-alr-screen/"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/4b3c831d60/value-electronics-logo__ScaleMaxWidthWzI1Nl0.png",
                                alt: "Find Me At Value Electronics"
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'Walts'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://www.walts.com/projectors/projector/hisense-projector-120l9g-ss"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/365da73826/walts-logo__ScaleMaxWidthWzI1Nl0.png",
                                alt: "Find Me At Walts"
                            }
                        },
                        {
                            title: {id: 0, type: StructureType.String, title: "Title", value: 'World Wide Stereo'},
                            link: {
                                id: 1,
                                type: StructureType.String,
                                title: 'Link',
                                value: "https://www.bestbuy.com/site/hisense-l5g-laser-tv-ultra-short-throw-projector-with-120-alr-screen-4k-uhd-2700-lumens-hdr10-android-tv-black/6502768.p?skuId=6502768"
                            },
                            image: {
                                id: 2,
                                type: StructureType.Image,
                                title: 'Image',
                                src: "https://assets.hisense-usa.com/assets/RetailerLogos/215740e7ad/WWS-Logo-175x70__ScaleMaxWidthWzI1Nl0.png",
                                alt: "Find Me At World Wide Stereo"
                            }
                        }
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

    addItem(name: string, item: any) {
        if (!this.model.hasOwnProperty(name)) this.model[name] = item;
        this.model[name].id = item.id;

        if (this.model[name].type !== item.type) this.model[name].type = item.type;
        if (item.type === StructureType.Image) {
            this.model[name].src = '';
            this.model[name].alt = 'Image Alt';
        }
        if (item.type === StructureType.List) {
            this.model[name].newItem = item.newItem;
        }
        if (item.type === StructureType.Select) {
            this.model[name].items = item.items;
        }
    }
}
</script>
