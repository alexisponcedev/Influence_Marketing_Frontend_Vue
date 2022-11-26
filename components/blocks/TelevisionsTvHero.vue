<template>
    <div>
        <img src="/blocks/TelevisionsTvHero.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";

@Component
export default class TelevisionsTvHero extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({default: true}) readonly editable: Boolean | undefined;
    @VModel({type: Object}) model!: any;

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
                    id: 1,
                    type: StructureType.Text,
                    title: "Title",
                    value: "It all starts with X",
                },
                subtitle: {
                    id: 2,
                    type: StructureType.Text,
                    title: "Subtitle",
                    value: "Pre-order the limited edition ULED X today.",
                },
                fullSizeCard: {
                    id: 4,
                    type: StructureType.Object,
                    title: "Full Size Box",
                    value: {
                        backgroundImage: {
                            id: 0,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                            alt: "",
                        },
                        badgeImage: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Badge Image",
                            src: "",
                            alt: "",
                        },
                        titleImage: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Title Image",
                            src: "",
                            alt: "",
                        },
                        theme: {
                            id: 0,
                            type: StructureType.Select,
                            title: "Theme (Texts)",
                            value: "light",
                            items: [
                                {title: "Light", value: "light"},
                                {title: "Dark", value: "dark"},
                            ],
                        },
                        title: {id: 1, type: StructureType.Text, title: "Title", value: ""},
                        link: {id: 1, type: StructureType.Url, title: "Link", value: ""},
                    },
                },
                simpleCard: {
                    id: 4,
                    type: StructureType.Object,
                    title: "Simple Box",
                    value: {
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                            alt: "",
                        },
                    },
                },
                noBgCard: {
                    id: 4,
                    type: StructureType.Object,
                    title: "Background Transparent Box",
                    value: {
                        logoImage: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Logo Image",
                            src: "",
                            alt: "",
                        },
                        titleImage: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Title Image",
                            src: "",
                            alt: "",
                        },
                        title: {id: 1, type: StructureType.Text, title: "Title", value: ""},
                        link: {id: 1, type: StructureType.Url, title: "Link", value: ""},
                    },
                },
                coloredCardsList: {
                    id: 4,
                    type: StructureType.List,
                    title: "Colored Cards List",
                    value: [
                        {
                            theme: {
                                id: 0,
                                type: StructureType.Select,
                                title: "Theme (Texts)",
                                value: "light",
                                items: [
                                    {title: "Light", value: "light"},
                                    {title: "Dark", value: "dark"},
                                ],
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "",
                                alt: "",
                            },
                            backgroundColor: {
                                id: 1,
                                type: StructureType.Color,
                                title: "Background Color",
                                value: "#000",
                            },
                            title: {
                                id: 1,
                                type: StructureType.Text,
                                title: "Title",
                                value: "",
                            },
                            link: {id: 1, type: StructureType.Url, title: "Link", value: ""},
                        },
                        {
                            theme: {
                                id: 0,
                                type: StructureType.Select,
                                title: "Theme (Texts)",
                                value: "light",
                                items: [
                                    {title: "Light", value: "light"},
                                    {title: "Dark", value: "dark"},
                                ],
                            },
                            image: {
                                id: 1,
                                type: StructureType.Image,
                                title: "Image",
                                src: "",
                                alt: "",
                            },
                            backgroundColor: {
                                id: 1,
                                type: StructureType.Color,
                                title: "Background Color",
                                value: "#000",
                            },
                            title: {
                                id: 1,
                                type: StructureType.Text,
                                title: "Title",
                                value: "",
                            },
                            link: {id: 1, type: StructureType.Url, title: "Link", value: ""},
                        },
                    ],
                    newItem: {
                        theme: {
                            id: 0,
                            type: StructureType.Select,
                            title: "Theme (Texts)",
                            value: "light",
                            items: [
                                {title: "Light", value: "light"},
                                {title: "Dark", value: "dark"},
                            ],
                        },
                        image: {
                            id: 1,
                            type: StructureType.Image,
                            title: "Image",
                            src: "",
                            alt: "",
                        },
                        backgroundColor: {
                            id: 1,
                            type: StructureType.Color,
                            title: "Background Color",
                            value: "#000",
                        },
                        title: {id: 1, type: StructureType.Text, title: "Title", value: ""},
                        link: {id: 1, type: StructureType.Url, title: "Link", value: ""},
                    },
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch("isEmpty")
    onValueChanged() {
        if (this.isEmpty) this.reset();
    }
}
</script>
