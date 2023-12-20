<template>
    <div
        v-if="typeof model.hidden === 'undefined' || !model.hidden"
        class="tw-p-2"
    >
        <v-btn
            class="tw-bg-white tw-w-full tw-h-10 tw-border tw-border-solid tw-border-gray-400 tw-rounded hover:tw-bg-green-300 hover:tw-bg-opacity-30"
            @click="$emit('onClick', model.action)"
        >
            <v-icon v-if="model.icon" :left="!!model.title">
                {{ model.icon }}
            </v-icon>
            {{ model.title }}
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureField } from "@/interfaces/StructureField";

@Component
export default class StructureButtonEditor extends Vue {
    @VModel() model!: StructureField;
}
</script>
