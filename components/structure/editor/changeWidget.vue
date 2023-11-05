<template>
    <v-container>
        <v-btn
            v-if="model.title"
            block
            outlined
            color="primary"
            @click="changeWidget"
        >
            {{ model.title }}
        </v-btn>
        <div
            v-else
            class="tw-border-2 tw-border-solid tw-border-gray-200 tw-rounded-lg tw-bg-gray-50 tw-mb-2 tw-overflow-hidden tw-cursor-pointer"
            @click="changeWidget"
        >
            <div
                class="tw-relative tw-h-[0] tw-pt-[48%] tw-overflow-hidden tw-rounded tw-bg-gray-50 tw-w-full"
            >
                <img
                    :src="`/blocks/${model.toWidget.image}`"
                    alt="component thumbnail"
                    style="min-height: 16px"
                    class="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-full tw-object-cover"
                />
            </div>
            <div
                class="tw-flex tw-items-start tw-justify-between tw-space-x-2 tw-p-2"
            >
                <div class="tw-font-italic" style="margin-bottom: 0 !important">
                    {{ model.toWidget.title }}
                </div>
                <div class="tw-text-xs tw-text-orange-700">
                    {{ model.toWidget.category }}
                </div>
            </div>
        </div>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureField } from "@/interfaces/StructureField";

@Component
export default class StructureTESTEditor extends Vue {
    @VModel() model!: StructureField;

    changeWidget() {
        this.$emit("changeWidget", this.model.toWidget);
    }
}
</script>
