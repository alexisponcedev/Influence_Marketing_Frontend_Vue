<template>
    <div>
        <img src="/blocks/TvAndAudioFindHisense.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockTvAndAudioFindHisense extends Vue {
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
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                            alt: "Some note about this image",
                        },
                        title: {
                            id: 1,
                            type: StructureType.String,
                            title: "Title",
                            value: "ULED—Beautiful from the Inside Out",
                        },
                        description: {
                            id: 2,
                            type: StructureType.String,
                            title: "Description",
                            value:
                                "Take your TV experience from great to incredible with the Hisense 4K ULED™ TV. Our exclusive ULED™ technology including the Hi-View™ engine boosts color, contrast, brightness and motion.",
                        },
                    },
                    value: [
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Upload Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: "ULED—Beautiful from the Inside Out",
                            },
                            description: {
                                id: 2,
                                type: StructureType.String,
                                title: "Description",
                                value:
                                    "Take your TV experience from great to incredible with the Hisense 4K ULED™ TV. Our exclusive ULED™ technology including the Hi-View™ engine boosts color, contrast, brightness and motion.",
                            },
                        },
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "Upload Image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/ca24e975cc/U8H-Infill-Front-Review__ScaleMaxWidthWzMwNDhd.png-xdmsfe.png",
                                alt: "Some note about this image",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "Title",
                                value: "ULED—Beautiful from the Inside Out",
                            },
                            description: {
                                id: 2,
                                type: StructureType.String,
                                title: "Description",
                                value:
                                    "Take your TV experience from great to incredible with the Hisense 4K ULED™ TV. Our exclusive ULED™ technology including the Hi-View™ engine boosts color, contrast, brightness and motion.",
                            },
                        },
                    ],
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

<style type="text/css"></style>
