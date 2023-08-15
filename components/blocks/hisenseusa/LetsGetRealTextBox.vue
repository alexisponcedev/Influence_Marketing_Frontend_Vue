<template>
    <div>
        <img src="/blocks/LetsGetRealTextBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "@/models/StructureType";
import blockAddItem from "@/utils/blockAddItem";
import { Theme } from "@/interfaces/ThemeEnum";

@Component
export default class BlockLetsGetRealTextBox extends Vue {
    @VModel({ type: Object }) model!: any;

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
                { title: "Light", value: Theme.light },
                { title: "Dark", value: Theme.dark },
            ],
        });

        blockAddItem(this.model, "title", {
            id: 2,
            type: StructureType.Text,
            title: "Title",
            value: '<h2 class="ql-align-center">Let\'s Get real.</h2><h2 class="ql-align-center">Youre here because </h2><h2 class="ql-align-center">you want a new TV.</h2>',
        });

        blockAddItem(this.model, "textColor", {
            id: 3,
            type: StructureType.Color,
            title: "Text Color",
            value: "#8C8F8F",
        });

        this.model = { ...this.model };
    }
}
</script>
