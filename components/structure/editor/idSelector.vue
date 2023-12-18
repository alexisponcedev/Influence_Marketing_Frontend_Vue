<template>
    <div
        v-if="typeof model.hidden === 'undefined' || !model.hidden"
        class="tw-p-2"
    >
        <button
            class="tw-bg-white tw-w-full tw-h-14 tw-border tw-border-solid tw-border-gray-400 tw-rounded hover:tw-bg-green-300 hover:tw-bg-opacity-30"
            @click="enableSelectMode"
        >
            <span v-if="model.value" class="tw-text-green-400">{{
                model.value
            }}</span>
            <span v-else>Select Component ID</span>
        </button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, VModel } from "vue-property-decorator";
import Validation from "~/utils/validation";
import { StructureField } from "~/interfaces/StructureField";
import { EventBus } from "~/plugins/event.client";

@Component
export default class StructureIdSelector extends Vue {
    @VModel({ type: Object }) model!: any;

    field = {
        label: "Filed",
        rules: [],
        colAttrs: { cols: 12 },
    };

    mounted() {
        this.field.label = this.model.title ?? "field";
    }

    enableSelectMode() {
        EventBus.fire("enable-select-mode", this.model);
    }
}
</script>
