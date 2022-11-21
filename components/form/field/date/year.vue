<template>
    <form-field-date-standard
        v-model="model"
        :field="field"
        type="year"
        dateFormat="YYYY"
        displayDateFormat="YYYY"
    />
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {FormField} from "@/models";

@Component
export default class YearDateFormField extends Vue {
    @VModel() model!: string;
    @Prop(Object) readonly field!: FormField;
}
</script>
