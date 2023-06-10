<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-container tw-mx-auto tw-px-4 tw-py-14">
                <img :src="model.image.src" :alt="model.image.alt" />
                <div class="tw-w-full tw-max-w-lg tw-mx-auto">
                    <div
                        class="tw-relative tw-rounded-full tw-flex tw-justify-center tw-items-center tw-w-full tw-pt-[100%]"
                        :style="`background: ${model.color.value}`"
                    >
                        <div
                            class="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-z-[1] tw-rounded-full tw-h-full tw-bg-[radial-gradient(55.6%_55.6%_at_100%_100%,_#B6DCE4_0%,_rgba(182,_220,_228,_0)_100%)]"
                        ></div>
                        <div
                            class="tw-absolute tw-w-[90%] tw-left-1/2 tw-z-[2] -tw-translate-x-1/2 tw-top-1/2 -tw-translate-y-1/2 tw-text-center"
                        >
                            <h3
                                class="tw-text-2xl sm:tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white -tw-tracking-wide tw-mb-7 tw-uppercase tw-break-words"
                                v-html="model.title.value"
                            ></h3>
                            <a
                                :href="model.link.value"
                                class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer outline_white tw-tracking-wide"
                            >
                                {{ model.link.title }}
                            </a>
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
export default class CircularBox extends Vue {
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
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Title",
            value: "",
        });
        blockAddItem(this.model, "link", {
            id: 2,
            type: StructureType.Url,
            title: "Link",
            value: "",
        });
        blockAddItem(this.model, "image", {
            id: 3,
            type: StructureType.Image,
            title: "background",
            src: "",
            alt: "",
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
