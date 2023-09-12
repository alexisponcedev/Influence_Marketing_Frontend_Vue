<template>
    <div>
        <img src="/blocks/CareersAccordion.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class CareersAccordion extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    prepare() {
        if (this.model.template.value === "v1") {
            blockAddItem(this.model, "list", {
                id: 1,
                type: StructureType.List,
                title: "List",
                newItem: {
                    title: {
                        id: 0,
                        type: StructureType.String,
                        title: "Title of list",
                        value: "",
                    },
                    list: {
                        id: 1,
                        type: StructureType.List,
                        title: "sublist of list",
                        newItem: {
                            title: {
                                id: 0,
                                type: StructureType.String,
                                title: "Title of sublist",
                                value: "",
                            },
                            subtitle: {
                                id: 2,
                                type: StructureType.SimpleText,
                                title: "Description of sublist",
                                value: "",
                            },
                            link: {
                                id: 3,
                                type: StructureType.Url,
                                target: "_self",
                                title: "Link of sublist",
                                value: "",
                            },
                        },
                        value: [
                            {
                                title: {
                                    id: 0,
                                    type: StructureType.String,
                                    title: "Title of sublist",
                                    value: "",
                                },
                                subtitle: {
                                    id: 2,
                                    type: StructureType.SimpleText,
                                    title: "Description of sublist",
                                    value: "",
                                },
                                link: {
                                    id: 3,
                                    type: StructureType.Url,
                                    target: "_self",
                                    title: "Link of sublist",
                                    value: "",
                                },
                            },
                        ],
                    },
                },
                value: [
                    {
                        title: {
                            id: 0,
                            type: StructureType.String,
                            title: "Title of list",
                            value: "",
                        },
                        list: {
                            id: 1,
                            type: StructureType.List,
                            title: "sublist of list",
                            newItem: {
                                title: {
                                    id: 0,
                                    type: StructureType.String,
                                    title: "Title of sublist",
                                    value: "",
                                },
                                subtitle: {
                                    id: 2,
                                    type: StructureType.SimpleText,
                                    title: "Description of sublist",
                                    value: "",
                                },
                                link: {
                                    id: 3,
                                    type: StructureType.Url,
                                    target: "_self",
                                    title: "Link of sublist",
                                    value: "",
                                },
                            },
                            value: [
                                {
                                    title: {
                                        id: 0,
                                        type: StructureType.String,
                                        title: "Title of sublist",
                                        value: "",
                                    },
                                    subtitle: {
                                        id: 2,
                                        type: StructureType.SimpleText,
                                        title: "Description of sublist",
                                        value: "",
                                    },
                                    link: {
                                        id: 3,
                                        type: StructureType.Url,
                                        target: "_self",
                                        title: "Link of sublist",
                                        value: "",
                                    },
                                },
                            ],
                        },
                    },
                ],
            });
        } else blockRemoveItem(this.model, ["list"]);

        if (this.model.template.value === "v2") {
            blockAddItem(this.model, "listv2", {
                id: 1,
                type: StructureType.List,
                title: "List",
                newItem: {
                    title: {
                        id: 0,
                        type: StructureType.String,
                        title: "Title of list",
                        value: "",
                    },
                    subtitle: {
                        id: 0,
                        type: StructureType.String,
                        title: "Title of sublist",
                        value: "",
                    },
                    text: {
                        id: 2,
                        type: StructureType.SimpleText,
                        title: "Description of sublist",
                        value: "",
                    },
                },
                value: [
                    {
                        title: {
                            id: 0,
                            type: StructureType.String,
                            title: "Title of list",
                            value: "",
                        },
                        subtitle: {
                            id: 0,
                            type: StructureType.String,
                            title: "Title of sublist",
                            value: "",
                        },
                        text: {
                            id: 2,
                            type: StructureType.SimpleText,
                            title: "Description of sublist",
                            value: "",
                        },
                    },
                ],
            });
        } else blockRemoveItem(this.model, ["listv2"]);
    }

    mounted() {
        blockAddItem(this.model, "template", {
            id: 0,
            type: StructureType.Select,
            title: "Template",
            value: "v1",
            items: [
                { title: "Version 1", value: "v1" },
                { title: "Version 2", value: "v2" },
            ],
        });
        this.prepare();
    }

    get template() {
        return this.model && this.model.template
            ? this.model.template.value
            : "";
    }

    @Watch("template")
    onTemplateChanged() {
        this.prepare();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
