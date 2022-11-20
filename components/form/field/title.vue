<template>
    <v-col v-bind="field.colAttrs">
        <strong>
            {{ field.label }}
        </strong>
    </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import {FormField} from "@/models";

@Component
export default class TitleFormField extends Vue {
    @Prop(Object) readonly field!: FormField;
}
</script>
