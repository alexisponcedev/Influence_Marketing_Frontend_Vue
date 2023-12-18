<template>
    <form-field-date-standard
        v-if="typeof model.hidden === 'undefined' || !model.hidden"
        type="datetime"
        v-model="internalValue"
        :dateFormat="dateFormat"
        :displayDateFormat="dateFormat"
        :field="{
            label: model.title,
            colAttrs: 12,
        }"
    />
</template>

<script lang="ts">
import { Vue, Component, VModel, Watch } from "vue-property-decorator";
import { StructureField } from "@/interfaces/StructureField";
const moment = require("moment-jalaali");

@Component
export default class StructureDatetimeEditor extends Vue {
    @VModel() model!: StructureField;

    dateFormat: string = "YYYY/MM/DD HH:mm:ss";

    internalValue: string = "";

    mounted() {
        this.internalValue =
            this.model?.value || moment().format(this.dateFormat);
    }

    @Watch("internalValue")
    valueChanged() {
        this.model.value = this.internalValue;
    }
}
</script>
