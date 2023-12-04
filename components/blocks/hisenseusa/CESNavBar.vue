<template>
    <div>
        <img src="/blocks/CESNavBar.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class CESNavBar extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    prepare() {
        blockAddItem(this.model, "fontColor", {
            id: 1,
            type: StructureType.Color,
            title: "Font Color",
            value: "",
        });
        blockAddItem(this.model, "backgroundColor", {
            id: 2,
            type: StructureType.Color,
            title: "Background Color",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 3,
            type: StructureType.List,
            title: "Navigation Items",
            value: [],
            newItem: {
                link: {
                    id: 0,
                    type: StructureType.Url,
                    target: "_self",
                    title: "Link",
                    value: "",
                },
                lightBox: {
                    id: 1,
                    type: StructureType.Select,
                    title: 'Open Light Box (this option will ignore the Link value but use the link title as inner content)',
                    value: true,
                    items: [
                        { title: 'Active', value: true },
                        { title: 'Deactive', value: false }
                    ]
                },
                lightBoxObject: {
                    id: 2,
                    type: StructureType.Object,
                    title: 'Light Box Data',
                    value: {
                        caption: {
                            id: 0,
                            type: StructureType.SimpleText,
                            title: 'Title',
                            value: ''
                        },
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: 'Image',
                            src: '',
                            alt: 'some note about this asset'
                        },
                        video: {
                            id: 2,
                            type: StructureType.String,
                            title: 'Iframe Link',
                            value: ''
                        },
                        link: {
                            id: 3,
                            type: StructureType.Url,
                            title: 'Download',
                            value: '/'
                        }
                    }
                }
            }
        });
        if (this.model.version.value === "secondary") {
            blockAddItem(this.model, "list", {
                id: 3,
                type: StructureType.List,
                title: "Navigation Items",
                value: [],
                newItem: {
                    link: {
                        id: 0,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Link",
                        value: "",
                    },
                }
            });
        } else {
            blockRemoveItem(this.model, ["list"])
            blockAddItem(this.model, "list", {
                id: 3,
                type: StructureType.List,
                title: "Navigation Items",
                value: [],
                newItem: {
                    link: {
                        id: 0,
                        type: StructureType.Url,
                        target: "_self",
                        title: "Link",
                        value: "",
                    },
                    lightBox: {
                        id: 1,
                        type: StructureType.Select,
                        title: 'Open Light Box (this option will ignore the Link value but use the link title as inner content)',
                        value: true,
                        items: [
                            { title: 'Active', value: true },
                            { title: 'Deactive', value: false }
                        ]
                    },
                    lightBoxObject: {
                        id: 2,
                        type: StructureType.Object,
                        title: 'Light Box Data',
                        value: {
                            caption: {
                                id: 0,
                                type: StructureType.SimpleText,
                                title: 'Title',
                                value: ''
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: 'Image',
                                src: '',
                                alt: 'some note about this asset'
                            },
                            video: {
                                id: 2,
                                type: StructureType.String,
                                title: 'Iframe Link',
                                value: ''
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                title: 'Download',
                                value: '/'
                            }
                        }
                    }
                }
            });
        };
        this.model = { ...this.model };
    }

    mounted() {
        blockAddItem(this.model, "version", {
            id: 0,
            type: StructureType.Select,
            title: "Version",
            value: "primary",
            items: [
                { title: "Primary", value: "primary" },
                { title: "Secondary", value: "secondary" }
            ]
        });


        this.prepare();
    }

    get version() {
        return this.model && this.model.version
            ? this.model.version.value
            : "";
    }

    @Watch("version")
    onVersionChanged() {
        this.prepare();
    }

}
</script>
