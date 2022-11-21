<template>
    <v-col class="py-0" v-bind="field.colAttrs">
        <label>
            {{ field.label }}
        </label>
        <div>
            {{ field.placeholder }}
        </div>
    </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import {FormField} from "@/models";

@Component
export default class LabelFormField extends Vue {
    @Prop(Object) readonly field!: FormField;
}
</script>
