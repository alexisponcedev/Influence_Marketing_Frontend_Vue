<template>
    <div>
        <img src="/blocks/BlackFridayFooter.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockRemoveItem from "@/utils/blockRemoveItem";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class BlackFridayFooter extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    prepare() {
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "List",
            newItem: {
                link: {
                    id: 1,
                    type: StructureType.Url,
                    target: "_self",
                    title: "",
                    value: "",
                },
            },
            value: [
                {
                    link: {
                        id: 1,
                        type: StructureType.Url,
                        target: "_self",
                        title: "",
                        value: "",
                    },
                },
            ],
        });

        blockAddItem(this.model, "rightText", {
            id: 2,
            type: StructureType.String,
            title: "Title",
            value: "",
        });

        if (this.model.template.value === "v2") {
            blockAddItem(this.model, "text_color", {
                id: 3,
                type: StructureType.Color,
                title: "Text Color",
                value: "#999999",
            });

            blockAddItem(this.model, "background_color", {
                id: 4,
                type: StructureType.Color,
                title: "Background Color",
                value: "#1a2a2d",
            });

            blockAddItem(this.model, "hover", {
                id: 5,
                type: StructureType.Select,
                title: "Hover Effect",
                value: "active",
                items: [
                    { title: "Active", value: "active" },
                    { title: "Deactive", value: "deactive" },
                ],
            });
        } else
            blockRemoveItem(this.model, [
                "text_color",
                "background_color",
                "hover",
            ]);

        this.model = { ...this.model };
    }

    mounted() {
        blockAddItem(this.model, "template", {
            id: 0,
            title: "Template",
            onChanged: this.prepare,
            type: StructureType.Select,
            value: "v1",
            items: [
                { title: "Version 1", value: "v1" },
                { title: "Version 2", value: "v2" },
            ],
        });

        this.prepare();
    }
}
</script>
