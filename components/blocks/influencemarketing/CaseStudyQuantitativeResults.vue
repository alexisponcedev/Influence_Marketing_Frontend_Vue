<template>
    <section v-if="!isEmpty">
        <div :style="{ backgroundColor: model?.backgroundColor?.value ? model?.backgroundColor?.value : '#131E29' }">
            <div class="tw-p-[10px]">
                <div
                    class="tw-max-w-[1340px] tw-mx-auto tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-justify-center tw-items-center tw-gap-4 tw-flex-wrap">
                    <div v-for="(item, index) in model?.list?.value" :key=index
                        class="tw-p-8 tw-w-full tw-h-full tw-flex tw-justify-start tw-items-center tw-gap-8 xl:tw-gap-16 tw-flex-wrap sm:tw-flex-nowrap md:tw-flex-wrap xl:tw-flex-nowrap tw-bg-[#424B54]">
                        <h4
                            class="tw-text-[#FA4616] tw-text-7xl lg:tw-text-8xl tw-font-bold tw-tracking-[-1.92px] tw-w-full sm:tw-w-fit md:tw-w-full xl:tw-w-fit">
                            {{ item?.result?.value }}
                        </h4>
                        <h5 class="tw-text-xl md:tw-text-2xl tw-text-white" v-html=item?.description?.value></h5>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class CaseStudyQuantitativeResults extends Vue {
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "backgroundColor", {
            id: 0,
            type: StructureType.Color,
            title: "Background Color",
            value: "#fff",
        });

        blockAddItem(this.model, "list", {
            id: 1,
            type: StructureType.List,
            title: "Results",
            newItem: {
                result: {
                    id: 0,
                    type: StructureType.String,
                    title: "result",
                    value: "",
                },
                description: {
                    id: 1,
                    type: StructureType.SimpleText,
                    title: "Description",
                    value: "",
                },
            },
            value: [],
        });

        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
