<template>
    <div v-if="template"
         class="tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-p-3 tw-flex tw-items-center tw-justify-between tw-cursor-pointer hover:tw-bg-gray-100 tw-transition"
         @click.self="selected">
        <div class="tw-text-black" @click.self="selected">{{ template.name }}</div>
        <div>
            <button @click="deleteTemplate">
                <v-icon light class="danger--text">mdi-delete</v-icon>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, VModel} from "vue-property-decorator";
import {Api} from "~/utils/store-accessor";
import {Template, TemplateResource} from "~/repositories";

@Component
export default class StructureImageEditor extends Vue {
    @Prop(Object) readonly template!: TemplateResource

    Api = Api;

    selected() {
        this.$emit('selected', this.template);
    }

    deleteTemplate() {
        Api.Template.delete(Number(this.template.id))
            .then(Api.Template.getAll);
    }
}
</script>

