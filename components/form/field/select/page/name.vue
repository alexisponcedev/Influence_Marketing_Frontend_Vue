<template>
    <v-col class="py-0" v-bind="field.colAttrs">
        <label>
            {{ field.label }}
        </label>
        <v-autocomplete
            outlined
            v-model="model"
            @input="pageSelected"
            :rules="field.rules"
            :item-text="field['item-text']"
            :item-value="field['item-value']"
            placeholder="Parent Route"
            :items="Api.Page.routes"
            :loading="typeof field.loading === 'function' ? field.loading() : field.loading "
            :readonly="typeof field.readonly === 'function' ? field.readonly() : field.readonly"
            :disabled=" typeof field.disabled === 'function' ? field.disabled() : field.disabled "
            :multiple=" typeof field.multiple === 'function' ? field.multiple() : field.multiple "
        >
            <template v-slot:item="{ item }">
                <v-list-item-content>
                    <v-list-item-title :class="{ 'blue--text' : item.model_id > 0}"
                                       v-text="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.domain"></v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </v-autocomplete>
    </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {FormField} from "~/models";
import {Api} from "~/utils/store-accessor";
import {Page} from "~/repositories";

@Component
export default class AutoCompleteSelectPageNameFormField extends Vue {
    @VModel() model!: Array<String>

    @Prop({
        type: Object, default: {
            label: 'Page Url',
            placeholder: 'Enter page name',
            'item-text': 'title',
            'item-value': 'route',
            rules: [],
            colAttrs: {cols: 12},
        }
    }) readonly field!: FormField;

    Api = Api;

    async mounted() {
        if (Api.Page.routes.length <= 1) await Api.Page.getRoutes();
    }

    pageSelected(index: number) {
        this.$emit('update:selected-page', Api.Page.routes.find(i => i.id === index))
    }
}
</script>
