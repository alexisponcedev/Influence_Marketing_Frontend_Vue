<template>
    <div class="tw-col-span-1 tw-flex tw-flex-col tw-justify-start tw-gap-2">
        <div class="tw-px-8 tw-py-2 tw-bg-white tw-rounded-[10px]">
            <v-checkbox
                :label="label"
                color="#000"
                class="tw-font-bold"
                v-model="tables"
                :value="table"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";

@Component
export default class cardSelect extends Vue {
    @Prop(String) readonly label!: String;
    @Prop(String) readonly table!: String;

    @VModel({ type: Array })
    tables!: Array<string>;
}
</script>
