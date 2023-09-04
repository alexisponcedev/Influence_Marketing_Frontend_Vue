<template>
    <div>
        <img src="/blocks/CesHero2.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class CesHero2 extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    prepare() {
        blockAddItem(this.model, "theme", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: Theme.light },
                { title: "Dark", value: Theme.dark },
            ],
        });
        blockAddItem(this.model, "backgroundImage", {
            id: 2,
            type: StructureType.Image,
            title: "Background Image",
            src: "",
            alt: "",
        });

        if (this.model.template.value === "v2") {
            blockAddItem(this.model, "title", {
                id: 4,
                type: StructureType.String,
                title: "Title",
                value: "",
            });
            blockAddItem(this.model, "text", {
                id: 5,
                type: StructureType.SimpleText,
                title: "Text",
                value: "",
            });
            blockAddItem(this.model, "link", {
                id: 6,
                type: StructureType.Url,
                title: "Link",
                value: "",
            });
            blockAddItem(this.model, "image", {
                id: 7,
                type: StructureType.Image,
                title: "Image",
                src: "",
                alt: "",
            });
        } else blockRemoveItem(this.model, ["title", "text", "link", "image"]);

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

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
