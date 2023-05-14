<template>
    <div>
        <img src="/blocks/NewsSingleSlider.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class NewsSingleSlider extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "List",
            newItem: {
                subtitle: {
                    id: 1,
                    type: StructureType.String,
                    title: "Subtitle",
                    value: "",
                },
                image: {
                    id: 2,
                    type: StructureType.Image,
                    title: "Image",
                    src: "",
                    alt: "Image Alt",
                },
                EnlargeBtn: {
                    id: 3,
                    type: StructureType.Url,
                    title: "Enlarge Image",
                    value: "",
                },
                downloadBtn: {
                    id: 4,
                    type: StructureType.Url,
                    title: "Download Image",
                    value: "",
                },
                link: {
                    id: 4,
                    type: StructureType.Url,
                    title: "Link",
                    value: "",
                },
            },
            value: [],
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
