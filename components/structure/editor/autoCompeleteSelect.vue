<template>
    <v-row v-if="typeof model.hidden === 'undefined' || !model.hidden">
        <v-col cols="11" class="pr-0">
            <form-field-select-autocomplete
                :field="field"
                v-model="internalValue"
            />
        </v-col>
        <v-col cols="1" class="px-0">
            <v-btn icon class="mt-7" color="primary" @click="selectValue">
                <v-icon> {{ field.icon }} </v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureField } from "@/interfaces/StructureField";

@Component
export default class StructureAutoCompeleteEditor extends Vue {
    @VModel() model!: StructureField;

    internalValue: any = "";

    field = {
        label: "Filed",
        rules: [],
        "item-text": "title",
        "item-value": "value",
        colAttrs: { cols: 12 },
        items: [],
        loading: false,
        icon: "mdi-plus",
    };

    mounted() {
        this.field.label = this.model.title ?? "field";
        this.field["item-text"] = this.model.itemText ?? "title";
        this.field["item-value"] = this.model.itemValue ?? "value";
        this.field.items = this.model.items;
        this.field.loading = this.model.loading as any;
        this.field.icon = this.model?.data?.icon ?? "mdi-plus";

        if (!this.internalValue) this.internalValue = this.model.value;
    }

    selectValue() {
        this.model.value = this.internalValue;
    }
}
</script>
