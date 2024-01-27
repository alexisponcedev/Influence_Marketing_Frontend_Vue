<template>
    <div class="tw-flex tw-items-center tw-justify-center tw-py-4">
        <div :style="{ width: width + 'px' }">
            <editor v-if="model.text" v-model="model.text.value" />
            <!--      <structure-editor-text v-if="model.text" v-model="model.text" placeholder="please enter the content ..."/>-->
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import { Theme } from "@/interfaces/ThemeEnum";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class BlockCommercialBecomeAPartner extends Vue {
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {

        blockAddItem(this.model, "theme", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: this.Theme.light },
                { title: "Dark", value: this.Theme.dark },
            ],
        });

        blockAddItem(this.model, "template", {
            id: 0,
            type: StructureType.Select,
            title: "Template",
            itemText: "title",
            itemValue: "value",
            value: "template_1",
            items: [
                { title: "Template 1", value: "template_1" },
                { title: "Template 2", value: "template_2" },
            ],
        });

        blockAddItem(this.model, "width", {
            id: 1,
            type: StructureType.String,
            title: "Width",
            value: "800",
        });

        blockAddItem(this.model, "text", {
            id: 2,
            type: StructureType.Null,
            title: "",
            value: "<p>Welcome to the text editor</p> <p>please enter your content ...</p>",
        });

        blockAddItem(this.model, "backgroundColor", {
            id: 3,
            type: StructureType.Color,
            title: "Background color",
            value: "#fff",
        });

        this.model = { ...this.model };
    }

    get width() {
        return this.model.width ? Number(this.model.width.value) : 800;
    }
}
</script>

<style type="text/css"></style>
