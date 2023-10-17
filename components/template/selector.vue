<template>
    <v-dialog v-model="show" max-width="500">
        <template-upload
            v-if="addNewTemplate"
            v-model="template"
            @saved="selected"
            @cancel="addNewTemplate = false"
        />

        <template-list
            v-else
            @selected="selected"
            @cancel="close"
            @addNewTemplate="addNewTemplate = true"
        />
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TemplateResource } from "@/repositories";
import { Api } from "@/utils/store-accessor";

@Component
export default class TemplateSelector extends Vue {
    // @VModel({type: Object}) model!: any

    Api = Api;

    addNewTemplate: Boolean = false;

    show: Boolean = false;

    template: TemplateResource = {};

    selected(template: TemplateResource) {
        console.log("you have selected asset : ", template);
        this.$emit("template-selected", template);
        this.close();
    }

    open(addNew = false, content = []) {
        this.template.widgets = content;
        this.addNewTemplate = addNew;
        this.show = true;
    }

    close() {
        this.show = false;
        this.addNewTemplate = false;
    }
}
</script>
