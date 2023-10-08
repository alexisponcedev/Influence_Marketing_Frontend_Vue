<template>
    <div>
        <img src="/blocks/CareersTextBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockRemoveItem from "@/utils/blockRemoveItem";
import blockAddItem from "@/utils/blockAddItem";

@Component
export default class CareersTextBox extends Vue {
    @VModel({ type: Object }) model!: any;

    prepare() {
        blockAddItem(this.model, "text", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        if (this.model.template.value === "v1") {
            blockAddItem(this.model, "backgroundColor", {
                id: 0,
                type: StructureType.Color,
                title: "Background Color",
                value: "",
            });

            blockAddItem(this.model, "image", {
                id: 0,
                type: StructureType.Image,
                title: "Logo",
                src: "",
                alt: "",
            });
            blockAddItem(this.model, "link", {
                id: 1,
                type: StructureType.Url,
                title: "Link",
                value: "",
            });
        } else
            blockRemoveItem(this.model, ["backgroundColor", "image", "link"]);

        this.model = { ...this.model };
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
}
</script>
