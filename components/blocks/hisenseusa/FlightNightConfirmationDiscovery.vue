<template>
    <div>
        <img src="/blocks/FlightNightConfirmationDiscovery.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class FlightNightConfirmationDiscovery extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });

        blockAddItem(this.model, "list", {
            id: 2,
            type: StructureType.List,
            title: "List",
            newItem: {
                image: {
                    id: 0,
                    title: "Image",
                    type: StructureType.Image,
                    src: "",
                    alt: "",
                },
                title: {
                    id: 1,
                    title: "title",
                    type: StructureType.SimpleText,
                    value: "",
                },
                link: {
                    id: 1,
                    title: "link",
                    type: StructureType.Url,
                    target: "_self",
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
