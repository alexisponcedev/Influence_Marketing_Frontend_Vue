<template>
    <div>
        <img src="/blocks/NewsRoomAnnouncementsForm.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class NewsRoomAnnouncementsForm extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    
    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "button_title", {
            id: 1,
            type: StructureType.String,
            title: "Button Title",
            value: "Subscribe",
        });

        this.model = { ...this.model };
    }

}
</script>
