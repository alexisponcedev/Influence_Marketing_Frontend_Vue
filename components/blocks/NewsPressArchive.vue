<template>
    <div>
        <img src="/blocks/NewsPressArchive.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Api } from "@/store";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class NewsPressArchive extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Api = Api;

    async mounted() {
        blockAddItem(this.model, 'title', {
            id: 0,
            type: StructureType.String,
            title: 'Title 1',
            value: 'Press Archive'
        });
        blockAddItem(this.model, 'title', {
            id: 0,
            type: StructureType.String,
            title: 'Title 2',
            value: 'Press Archive'
        });
        

        this.model = { ...this.model };
    }
    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
