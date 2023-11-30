<template>
    <div>
        <img src="/blocks/BlockCards.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";

@Component
export default class BlockCards extends Vue {
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
                    value: "With a lot more to love.",
                },
                list: {
                    id: 2,
                    type: StructureType.List,
                    title: "Items",
                    newItem: {
                        title: {
                            id: 0,
                            type: StructureType.String,
                            title: "Title",
                            value: "Win a trip to the World Cup finals.",
                        },
                        backgroundImage: {
                            id: 1,
                            alt: "some note about this asset",
                            src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355af8cdb941.webp",
                            type: StructureType.Image,
                            title: "Background Image",
                        },
                        topImage: {
                            id: 2,
                            type: StructureType.Image,
                            title: "Top Image",
                            alt: "some note about this asset",
                            src: "",
                        },
                        bottomImage: {
                            id: 3,
                            type: StructureType.Image,
                            title: "Bottom Image",
                            src: "",
                            alt: "some note about this asset",
                        },
                        fullWidth: {
                            id: 4,
                            type: StructureType.Select,
                            title: "Full Width",
                            value: false,
                            items: [
                                { title: "True", value: true },
                                { title: "False", value: false },
                            ],
                        },
                        link: {
                            id: 5,
                            type: StructureType.Url,
                            target: "_self",
                            title: "Learn More",
                            value: "/",
                        },
                        gradient: {
                            id: 6,
                            type: StructureType.Select,
                            title: "Gradient Fade",
                            value: true,
                            items: [
                                { title: "Active", value: true },
                                { title: "Deactive", value: false },
                            ],
                        },
                        lightbox: {
                            id: 7,
                            type: StructureType.Select,
                            title: "Open Light Box (this option will ignore the Link)",
                            value: true,
                            items: [
                                { title: "Active", value: true },
                                { title: "Deactive", value: false },
                            ],
                        }
                    },
                    value: [
                        {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Title",
                                value: "Win a trip to the World Cup finals.",
                            },
                            backgroundImage: {
                                id: 1,
                                alt: "some note about this asset",
                                src: "http://assets.dev-api.hisenseportal.com/storage/hisense/asset/images/66355af8cdb941.webp",
                                type: StructureType.Image,
                                title: "Background Image",
                            },
                            topImage: {
                                id: 2,
                                type: StructureType.Image,
                                title: "Top Image",
                                alt: "some note about this asset",
                                src: "",
                            },
                            bottomImage: {
                                id: 3,
                                type: StructureType.Image,
                                title: "Bottom Image",
                                src: "",
                                alt: "some note about this asset",
                            },
                            fullWidth: {
                                id: 4,
                                type: StructureType.Select,
                                title: "Full Width",
                                value: false,
                                items: [
                                    { title: "True", value: true },
                                    { title: "False", value: false },
                                ],
                            },
                            link: {
                                id: 5,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Learn More",
                                value: "/",
                            },
                            gradient: {
                                id: 6,
                                type: StructureType.Select,
                                title: "Gradient Fade",
                                value: true,
                                items: [
                                    { title: "Active", value: true },
                                    { title: "Deactive", value: false },
                                ],
                            },
                            lightbox: {
                                id: 7,
                                type: StructureType.Select,
                                title: "Open Light Box (this option will ignore the Link)",
                                value: true,
                                items: [
                                    { title: "Active", value: true },
                                    { title: "Deactive", value: false },
                                ],
                            }
                        },
                    ],
                },
                link: {
                    id: 2,
                    type: StructureType.Url,
                    target: "_self",
                    title: "See More News",
                    value: "/",
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
