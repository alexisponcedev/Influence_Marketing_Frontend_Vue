<template>
    <div>
        <img src="/blocks/LetsGetRealTextBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class BlockLetsGetRealTextBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "template", {
            id: 0,
            type: StructureType.Select,
            title: "Template",
            value: "v1",
            items: [
                { title: "V1", value: "v1" },
                { title: "V2", value: "v2" },
            ],
        });
        blockAddItem(this.model, "theme", {
            id: 1,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: this.Theme.light },
                { title: "Dark", value: this.Theme.dark },
            ],
        });
        blockAddItem(this.model, "title", {
            id: 2,
            type: StructureType.Text,
            title: "Title",
            value: '<h2 class="ql-align-center">Let\'s Get real.</h2><h2 class="ql-align-center">Youre here because </h2><h2 class="ql-align-center">you want a new TV.</h2>',
        });
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css"></style>
