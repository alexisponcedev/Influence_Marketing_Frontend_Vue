<template>
    <div v-if="!isEmpty">
        <div
            class="tw-flex tw-items-center tw-flex-col tw-justify-center tw-bg-[#E7ECFE] tw-py-6"
            v-if="model?.template?.value === 'v1'"
        >
            <div
                class="tw-flex tw-flex-col tw-items-center tw-justify-center h-full tw-p-9"
            >
                <h2 class="tw-text-[#030D30] tw-text-[32px] tw-m-0 tw-mb-2">
                    {{ model?.smallTitle?.value }}
                </h2>
                <h4 class="tw-text-[#1042F1] tw-text-lg tw-m-0">
                    {{ model?.text?.value }}
                </h4>
            </div>
            <div class="tw-flex tw-p-10">
                <div
                    class="tw-flex tw-flex-col tw-items-center tw-py-[50px] tw-px-[60px] tw-relative tw-bg-white hover:tw-scale-[1.07] hover:tw-bg-[#1954ED] tw-group tw-ransition tw-ease-in-out hover:-tw-translate-y-1 tw-duration-300 hover:tw-z-20"
                >
                    <h2
                        class="tw-text-[24px] tw-font-bold tw-mb-[13px] group-hover:tw-text-white tw-z-10"
                    >
                        {{ model?.leftBoxTitle?.value }}
                    </h2>
                    <div
                        v-html="model?.leftBoxValue?.value"
                        class="tw-text-sm group-hover:tw-text-white tw-z-10"
                    />
                    <img
                        src="blocks/feature.svg"
                        alt=""
                        class="tw-absolute tw-top-0 tw-bottom-0 tw-right-0 tw-left-0 tw-opacity-0 group-hover:tw-opacity-100"
                    />
                </div>
                <div
                    class="tw-flex tw-flex-col tw-items-center tw-py-[50px] tw-px-[60px] tw-relative tw-bg-white hover:tw-scale-[1.07] hover:tw-bg-[#1954ED] tw-group tw-ransition tw-ease-in-out hover:-tw-translate-y-1 tw-duration-300 hover:tw-z-20"
                >
                    <h2
                        class="tw-text-[24px] tw-font-bold tw-mb-[13px] group-hover:tw-text-white tw-z-10"
                    >
                        {{ model?.centerBoxTitle?.value }}
                    </h2>
                    <div
                        v-html="model?.centerBoxValue?.value"
                        class="tw-text-sm group-hover:tw-text-white tw-z-10"
                    />
                    <img
                        src="blocks/feature.svg"
                        alt=""
                        class="tw-absolute tw-top-0 tw-bottom-0 tw-right-0 tw-left-0 tw-opacity-0 group-hover:tw-opacity-100"
                    />
                </div>
                <div
                    class="tw-flex tw-flex-col tw-items-center tw-py-[50px] tw-px-[60px] tw-relative tw-bg-white hover:tw-scale-[1.07] hover:tw-bg-[#1954ED] tw-group tw-ransition tw-ease-in-out hover:-tw-translate-y-1 tw-duration-300 hover:tw-z-20"
                >
                    <h2
                        class="tw-text-[24px] tw-font-bold tw-mb-[13px] group-hover:tw-text-white tw-z-10"
                    >
                        {{ model?.rightBoxTitle?.value }}
                    </h2>
                    <div
                        v-html="model?.rightBoxValue?.value"
                        class="tw-text-sm group-hover:tw-text-white tw-z-10"
                    />
                    <img
                        src="blocks/feature.svg"
                        alt=""
                        class="tw-absolute tw-top-0 tw-bottom-0 tw-right-0 tw-left-0 tw-opacity-0 group-hover:tw-opacity-100"
                    />
                </div>
            </div>
        </div>

        <div
            class="tw-flex tw-items-center tw-flex-col tw-justify-center tw-bg-[#E7ECFE] tw-py-6"
            v-else
        >
            <div
                class="tw-flex tw-flex-col tw-items-center tw-justify-center h-full tw-p-9"
            >
                <h2 class="tw-text-[#030D30] tw-text-[32px] tw-m-0 tw-mb-2">
                    {{ model?.smallTitle?.value }}
                </h2>
                <h4 class="tw-text-[#1042F1] tw-text-lg tw-m-0">
                    {{ model?.text?.value }}
                </h4>
            </div>
            <div class="tw-flex tw-gap-2 tw-p-10">
                <div
                    class="tw-flex tw-flex-col tw-items-center tw-py-[50px] tw-px-[60px] tw-bg-white"
                >
                    <h2
                        class="tw-text-[24px] tw-font-bold tw-mb-[13px] group-hover:tw-text-white"
                    >
                        {{ model?.leftBoxTitle?.value }}
                    </h2>
                    <div
                        v-html="model?.leftBoxValue?.value"
                        class="tw-text-sm group-hover:tw-text-white"
                    />
                </div>
                <div
                    class="tw-flex tw-flex-col tw-items-center tw-py-[50px] tw-px-[60px] tw-bg-white"
                >
                    <h2
                        class="tw-text-[24px] tw-font-bold tw-mb-[13px] group-hover:tw-text-white"
                    >
                        {{ model?.centerBoxTitle?.value }}
                    </h2>
                    <div
                        v-html="model?.centerBoxValue?.value"
                        class="tw-text-sm group-hover:tw-text-white"
                    />
                </div>
                <div
                    class="tw-flex tw-flex-col tw-items-center tw-py-[50px] tw-px-[60px] tw-bg-white"
                >
                    <h2
                        class="tw-text-[24px] tw-font-bold tw-mb-[13px] group-hover:tw-text-white"
                    >
                        {{ model?.rightBoxTitle?.value }}
                    </h2>
                    <div
                        v-html="model?.rightBoxValue?.value"
                        class="tw-text-sm group-hover:tw-text-white"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

@Component
export default class BlockTextIntroduction extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    prepare() {
        blockAddItem(this.model, "smallTitle", {
            id: 0,
            type: StructureType.String,
            title: "Samll Title",
            value: "Manage your brand with IM Products",
        });
        blockAddItem(this.model, "text", {
            id: 1,
            type: StructureType.String,
            title: "Text",
            value: "Pick your market, we’ve got you covered.",
        });
        blockAddItem(this.model, "rightBoxTitle", {
            id: 2,
            type: StructureType.String,
            title: "Right Box Title",
            value: "Save Money",
        });
        blockAddItem(this.model, "rightBoxValue", {
            id: 3,
            type: StructureType.SimpleText,
            title: "Right Box Content",
            value: "Customer engagement marketing is a marketing strategy that delivers timely, relevant, and personalized messages to consumers.",
        });
        blockAddItem(this.model, "centerBoxTitle", {
            id: 5,
            type: StructureType.String,
            title: "Center Box Title",
            value: "Support",
        });
        blockAddItem(this.model, "centerBoxValue", {
            id: 6,
            type: StructureType.SimpleText,
            title: "Center Box Content",
            value: "Customer engagement marketing is a marketing strategy that delivers timely, relevant, and personalized messages to consumers.",
        });
        blockAddItem(this.model, "leftBoxTitle", {
            id: 8,
            type: StructureType.String,
            title: "Left Box Title",
            value: "Customer Engagement",
        });
        blockAddItem(this.model, "leftBoxValue", {
            id: 9,
            type: StructureType.SimpleText,
            title: "Left Box Content",
            value: "Customer engagement marketing is a marketing strategy that delivers timely, relevant, and personalized messages to consumers.",
        });

        if (this.model.template.value === "v1") {
            blockAddItem(this.model, "rightBoxLink", {
                id: 4,
                type: StructureType.Url,
                title: "Right Box Link",
                value: "link",
            });
            blockAddItem(this.model, "centerBoxLink", {
                id: 7,
                type: StructureType.Url,
                title: "Center Box Link",
                value: "link",
            });
            blockAddItem(this.model, "leftBoxLink", {
                id: 10,
                type: StructureType.Url,
                title: "Left Box Link",
                value: "link",
            });
        } else
            blockRemoveItem(this.model, [
                "rightBoxLink",
                "centerBoxLink",
                "leftBoxLink",
            ]);

        this.model = { ...this.model };
    }

    mounted() {
        blockAddItem(this.model, "template", {
            id: 0,
            type: StructureType.Select,
            title: "Template",
            value: "v1",
            items: [
                { title: "Version 1", value: "v1" },
                { title: "Version 2", value: "v2" },
            ],
        });
        this.prepare();
    }

    get template() {
        return this.model && this.model.template
            ? this.model.template.value
            : "";
    }

    @Watch("template")
    onTemplateChanged() {
        this.prepare();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>

<style type="text/css">
.large-title {
    font-size: 42px;
    font-weight: 700;
}

.paragraph {
    font-size: 18px;
    font-weight: 400;
}
</style>
