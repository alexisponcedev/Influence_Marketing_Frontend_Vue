<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-container tw-mx-auto tw-px-4 tw-py-24">
                <div
                    class="tw-flex tw-justify-center tw-items-center tw-flex-wrap md:tw-flex-nowrap tw-gap-24"
                >
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="201"
                            height="59"
                            viewBox="0 0 201 59"
                            fill="none"
                        >
                            <g clip-path="url(#clip0_13_709)">
                                <path
                                    d="M0.5 29.926L17.1471
                                -0.000244141H29.9358L18.115
                                29.926H28.9722V58.3982H0.501447L0.5
                                29.926ZM45.1383 29.926L61.7862
                                -0.000244141H74.5741L62.7533
                                29.926H73.6113V58.3982H45.1383V29.926Z"
                                    :fill="model.color.value"
                                />
                                <path
                                    d="M200.5
                                28.4727L183.853 58.3982H171.064L182.886
                                28.4727H172.027V-0.000244141H200.5V28.4727ZM155.862
                                28.4727L139.214 58.3982H126.426L138.247
                                28.4727H127.39V0.00120262H155.863L155.862
                                28.4727Z"
                                    :fill="model.color.value"
                                />
                            </g>
                            <defs>
                                <clip-path id="clip0_13_709">
                                    <rect
                                        width="200"
                                        height="58.397"
                                        fill="white"
                                        transform="translate(0.5)"
                                    />
                                </clip-path>
                            </defs>
                        </svg>
                        <Commas color="" />
                    </div>
                    <div class="tw-w-full md:tw-w-2/3">
                        <div
                            class="tw-text-xl tw-text-white tw-mb-7"
                            v-html="model.text.value"
                        ></div>
                        <div class="tw-text-white">
                            <p>
                                <strong>
                                    {{ model.subtitle.value }}
                                </strong>
                            </p>
                        </div>
                    </div>
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
export default class TextBoxCommas extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "color", {
            id: 1,
            type: StructureType.Color,
            title: "Color",
            value: "#9678D3",
        });
        blockAddItem(this.model, "subtitle", {
            id: 1,
            type: StructureType.String,
            title: "Subtitle",
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
