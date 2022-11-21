<template>
    <v-col class="py-0 pb-6 word-wrap-break-word" v-bind="field.colAttrs">
        <small>
            {{ field.label }}
        </small>
        <div>
            <v-btn
                download
                v-if="field.to"
                :href="field.to"
                :color="field.color || 'secondary'"
            >
                <v-icon left>mdi-download</v-icon>
                Download
            </v-btn>
            <v-btn
                :color="field.color || 'secondary'"
                @click="field.onClick"
                v-else-if="field.onClick"
            >
                <v-icon left>mdi-download</v-icon>
                Download
            </v-btn>
            <v-btn
                download
                v-else-if="model"
                :href="model"
                :color="field.color || 'secondary'"
            >
                <v-icon left>mdi-download</v-icon>
                Download
            </v-btn>
        </div>
    </v-col>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from "vue-property-decorator";
import {FormField} from "@/models";

@Component
export default class LabelFormField extends Vue {
    @Prop(Object) readonly field!: FormField;
    @VModel() model!: any;
}
</script>
