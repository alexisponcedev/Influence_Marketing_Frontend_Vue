<template>
    <div>
        <img src="/blocks/CESTexBlock2.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class CesTexBlock2 extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
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
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.SimpleText,
            title: "Main Title",
            value: "",
        });
        blockAddItem(this.model, "subtitle", {
            id: 1,
            type: StructureType.String,
            title: "Subtitle",
            value: "",
        });
        blockAddItem(this.model, "description", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Subtitle",
            value: "",
        });
        blockAddItem(this.model, "link1", {
            id: 3,
            type: StructureType.Url,
            target: "_self",
            title: "",
            value: "",
        });
        blockAddItem(this.model, "specs", {
            id: 4,
            type: StructureType.String,
            title: "Specs Title",
            value: "",
        });
        blockAddItem(this.model, "list", {
            id: 5,
            type: StructureType.List,
            title: "List",
            newItem: {
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Title",
                    value: "",
                },
            },
            value: [
                {
                    title: {
                        id: 1,
                        type: StructureType.String,
                        title: "Title",
                        value: "",
                    },
                },
            ],
        });
        blockAddItem(this.model, "link2", {
            id: 6,
            type: StructureType.Url,
            target: "_self",
            title: "",
            value: "",
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
