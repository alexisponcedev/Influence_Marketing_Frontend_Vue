<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div
                class="tw-pb-6 md:tw-pb-10 tw-pt-12 md:tw-pt-[90px] tw-max-w-[320px] md:tw-max-w-[640px] lg:tw-max-w-[800px] xl:tw-max-w-[1000px] 2xl:tw-max-w-[1300px] 3xl:tw-max-w-[1740px] tw-mx-auto tw-px-4"
            >
                <div
                    class="tw-flex tw-flex-wrap md:tw-flex-nowrap tw-justify-between tw-items-start"
                >
                    <ul
                        class="tw-text-skyblue tw-list-disc tw-mb-10 md:tw-mb-0 tw-pl-4"
                    >
                        <li v-html="model.title.value"></li>
                    </ul>
                    <div
                        class="tw-text-white tw-w-full md:tw-w-1/2"
                        v-html="model.text.value"
                    ></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class TeamTextBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "title",
            value: "",
        });
        blockAddItem(this.model, "text", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
