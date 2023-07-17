<template>
    <div>
        <img src="/blocks/BlockCategories.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";

@Component
export default class BlockCategories extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue,
                ...{
                    backgroundColor: {
                        id: 7,
                        type: StructureType.Color,
                        title: "Background color",
                        value: "#fff",
                    },
                },
            };
        } else
            this.model = {
                title: {
                    id: 0,
                    type: StructureType.Text,
                    title: "Title",
                    value: "We make fantastic appliances, too.",
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
                            value: "Televisions",
                        },
                        link: {
                            id: 2,
                            type: StructureType.Url,
                            target: "_self",
                            title: "Shop Now URL",
                            value: "/products",
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
                                value: "Televisions",
                            },
                            link: {
                                id: 2,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now URL",
                                value: "/products",
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
                                value: "Soundbars",
                            },
                            link: {
                                id: 2,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now URL",
                                value: "/products",
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
                                value: "Air Products",
                            },
                            link: {
                                id: 2,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now URL",
                                value: "/products",
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
                                value: "Refrigeration",
                            },
                            link: {
                                id: 2,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now URL",
                                value: "/products",
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
                                value: "Ranges",
                            },
                            link: {
                                id: 2,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now URL",
                                value: "/products",
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
                                value: "Dishwashers",
                            },
                            link: {
                                id: 2,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now URL",
                                value: "/products",
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
                                value: "Microwave Ovens",
                            },
                            link: {
                                id: 2,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now URL",
                                value: "/products",
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
                                value: "Kitchen-Suite",
                            },
                            link: {
                                id: 2,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Shop Now URL",
                                value: "/products",
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

    addItem(name: string, item: any) {
        if (!this.model.hasOwnProperty(name)) this.model[name] = item;
        this.model[name].id = item.id;

        if (this.model[name].type !== item.type)
            this.model[name].type = item.type;
        if (item.type === StructureType.Image) {
            this.model[name].src = "";
            this.model[name].alt = "Image Alt";
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
