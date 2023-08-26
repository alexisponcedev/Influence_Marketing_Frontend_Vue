<template>
    <div>
        <img src="/blocks/PressArchive.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Api } from "@/store";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class PressArchive extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Api = Api;

    async mounted() {
        blockAddItem(this.model, 'title', {
            id: 0,
            type: StructureType.String,
            title: 'Title',
            value: 'Press Archive'
        });
        blockAddItem(this.model, "count", {
            id: 2,
            type: StructureType.String,
            title: "Total News to Show",
            value: 4,
        });
        // blockAddItem(this.model, "list", {
        //     id: 1,
        //     type: StructureType.List,
        //     title: "List",
        //     newItem: {
        //         title: {
        //             id: 1,
        //             type: StructureType.String,
        //             title: "Title",
        //             value: "",
        //         },
        //         subtitle: {
        //             id: 2,
        //             type: StructureType.String,
        //             title: "Press Release",
        //             value: "",
        //         },
        //         date: {
        //             id: 3,
        //             type: StructureType.String,
        //             title: "Date",
        //             value: "",
        //         },
        //         image: {
        //             id: 4,
        //             type: StructureType.Image,
        //             title: "Image",
        //             src: "",
        //             alt: "",
        //         },
        //         link: {
        //             id: 5,
        //             type: StructureType.Url,
        //             target: "_self",
        //             title: "Link",
        //             value: "",
        //         },
        //     },
        //     value: [],
        // });

        this.model = { ...this.model };
    }
    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
