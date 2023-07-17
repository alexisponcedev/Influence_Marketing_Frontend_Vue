<template>
    <div>
        <img src="/blocks/NotFound.jpg" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class NotFound extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        console.log(this.model);
        blockAddItem(this.model, "text", {
            id: 0,
            type: StructureType.Text,
            title: "Text",
            value: "",
        });
        blockAddItem(this.model, "image", {
            id: 1,
            type: StructureType.Image,
            title: "Image",
            src: "",
            alt: "",
        });
        blockAddItem(this.model, "title", {
            id: 2,
            type: StructureType.String,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "link1", {
            id: 3,
            type: StructureType.Url,
            target: "_self",
            title: "Link 1",
            value: "",
        });
        blockAddItem(this.model, "link2", {
            id: 4,
            type: StructureType.Url,
            target: "_self",
            title: "Link 2",
            value: "",
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
