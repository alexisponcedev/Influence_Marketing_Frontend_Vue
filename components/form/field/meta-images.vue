<template>
    <div
        class="tw-grid tw-grid-cols-2 tw-gap-2"
        v-if="model.meta && model.meta.length > 0"
    >
        <div class="tw-space-y-1.5">
            <div
                v-if="ogImageIndex >= 0"
                class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center tw-relative"
            >
                <div
                    class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start"
                >
                    HORIZONTAL IMAGE
                </div>
                <input
                    type="text"
                    placeholder="Enter image url"
                    class="x-input tw-flex-1"
                    v-model="model.meta[ogImageIndex].content"
                />
            </div>

            <div
                v-if="ogImageVerticalIndex >= 0"
                class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center tw-relative"
            >
                <div
                    class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start"
                >
                    VERTICAL IMAGE
                </div>
                <input
                    type="text"
                    placeholder="Enter image url"
                    class="x-input tw-flex-1"
                    v-model="model.meta[ogImageVerticalIndex].content"
                />
            </div>

            <div
                v-if="ogImageSquareIndex >= 0"
                class="tw-bg-gray-50 tw-overflow-hidden tw-border tw-border-solid tw-border-gray-200 tw-rounded-lg tw-flex twl-items-center tw-relative"
            >
                <div
                    class="tw-px-3 tw-w-40 tw-font-semibold tw-flex tw-items-center tw-justify-start"
                >
                    SQUARE IMAGE
                </div>
                <input
                    type="text"
                    placeholder="Enter image url"
                    class="x-input tw-flex-1"
                    v-model="model.meta[ogImageSquareIndex].content"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { MetaInterface } from "@/models/Meta.model";

@Component
export default class TextMetaFormField extends Vue {
    @VModel() model!: any;

    addRow(rel = "blank", name = "", content = "") {
        this.model.meta.push({ rel, name, content });
        return this.model.meta.length - 1;
    }

    get ogImageIndex() {
        let index = this.model.meta.findIndex(
            (i: MetaInterface) => i.rel && i.rel.includes("og:image")
        );
        return index >= 0
            ? index
            : this.addRow('property="og:image"', 'property="og:image"', "");
    }

    get ogImageVerticalIndex() {
        let index = this.model.meta.findIndex(
            (i: MetaInterface) => i.rel && i.rel.includes("og:image:vertical")
        );
        return index >= 0
            ? index
            : this.addRow(
                  'property="og:image:vertical"',
                  'property="og:image:vertical"',
                  ""
              );
    }

    get ogImageSquareIndex() {
        let index = this.model.meta.findIndex(
            (i: MetaInterface) => i.rel && i.rel.includes("og:image:square")
        );
        return index >= 0
            ? index
            : this.addRow(
                  'property="og:image:square"',
                  'property="og:image:square"',
                  ""
              );
    }
}
</script>

<style scoped>
.hr-border {
    height: 1px;
    background-color: #d3d3d3;
    border: none;
}

.x-input {
    border: none;
    background-color: white;
    padding: 11px;
}

.x-input:focus {
    outline: none;
}

.x-gray-input {
    border: none;
    background-color: rgb(233, 233, 233);
    padding: 11px;
}

.x-gray-input:focus {
    outline: none;
}
</style>
