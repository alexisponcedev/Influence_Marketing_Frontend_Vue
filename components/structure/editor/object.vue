<template>
    <div
        v-if="typeof model.hidden === 'undefined' || !model.hidden"
        class="tw-p-2 tw-rounded-lg"
    >
        <h6 style="margin-bottom: 3px">{{ model.title }}</h6>
        <div class="tw-mb-4">
            <div
                class="tw-border tw-border-gray-200 tw-rounded-lg tw-border-solid tw-mb-4"
            >
                <structure-editor
                    :key="model.title + model.id"
                    :simple="true"
                    v-model="model.value"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from "vue-property-decorator";

@Component
export default class StructureListEditor extends Vue {
    @VModel({ type: Array }) model!: any;

    field = {
        label: "Filed",
        rules: [],
        colAttrs: { cols: 12 },
    };

    open: number = -1;

    key = Math.round(Math.random() * 100000);

    mounted() {
        this.field.label = this.model.title ?? "field";
    }

    addNew() {
        this.model.value.push(JSON.parse(JSON.stringify(this.model.newItem)));
        this.open = this.model.value.length - 1;
    }

    removeItem(i: any) {
        this.model.value.splice(i, 1);
    }
}
</script>
