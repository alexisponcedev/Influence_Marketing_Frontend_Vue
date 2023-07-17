<template>
    <div>
        <img src="/blocks/BlackFridayNavigation.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlackFridayNavigation extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "list", {
            id: 0,
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
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
