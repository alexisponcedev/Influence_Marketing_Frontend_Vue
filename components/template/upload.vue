<template>
    <v-card>
        <v-card-title>
            Template Manager
        </v-card-title>

        <v-card-text>
            <form-field-text :field="nameField" v-model="model.name"/>

            <p class="tw-ml-2">Please select a unique name for your template</p>

            <v-progress-linear v-if="Api.Template.loading" indeterminate color="cyan"/>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="Api.Template.loading" @click="save" text color="green"> Save</v-btn>
            <v-btn :disabled="Api.Template.loading" @click="cancel" text color="red"> Cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel, Emit} from "vue-property-decorator";
import {StructureField} from "~/interfaces/StructureField";
import {Api} from "~/utils/store-accessor";
import {Asset, Template, TemplateResource} from "~/repositories";
import {AssetTokens} from "~/models/AssetTokens";


@Component
export default class StructureFileUploader extends Vue {
    @VModel({type: Object}) model!: TemplateResource

    Api = Api;

    file: any = null;

    name: string = '';

    nameField = {
        label: 'Template name',
        placeholder: 'Enter Template name',
        rules: [],
        colAttrs: {cols: 12}
    }

    @Emit()
    cancel() {
    }

    save() {
        Api.Template.create(this.model)
            .then(template => {
                this.saved(template);
            })
    }

    saved(template: Template): Template {
        this.$emit('saved', template);
        return template;
    }
}
</script>
