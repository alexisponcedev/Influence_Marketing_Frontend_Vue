<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-container tw-mx-auto tw-px-4 tw-py-11">
                <div
                    class="tw-flex tw-justify-center tw-items-center tw-flex-wrap md:tw-flex-nowrap"
                >
                    <h6
                        class="tw-text-xl tw-font-normal tw-text-white tw-mb-12 md:tw-mb-0"
                    >
                        {{ model.title.value }}
                    </h6>
                    <div
                        class="tw-w-full md:tw-w-[85%] tw-relative tw-overflow-hidden"
                    >
                        <div
                            class="tw-absolute tw-z-[2] tw-top-0 tw-left-0 tw-h-full tw-w-16 tw-from-midnight tw-to-transparent tw-bg-gradient-to-r"
                        ></div>
                        <div
                            class="tw-absolute tw-z-[2] tw-top-0 tw-right-0 tw-h-full tw-w-16 tw-from-midnight tw-to-transparent tw-bg-gradient-to-l"
                        ></div>
                        <div
                            class="tw-w-[200vw] tw-z-[1] tw-flex tw-items-center tw-justify-start tw-gap-4"
                        >
                            <div
                                v-for="(item, index) in model.list.value"
                                :key="index"
                                class="tw-w-24"
                            >
                                <img
                                    :src="item.image.src"
                                    :alt="item.image.alt"
                                    class="tw-w-full"
                                />
                            </div>
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
export default class ClientsSlider extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.String,
            title: "Title",
            value: ".",
        });
        blockAddItem(this.model, "list", {
            id: 4,
            type: StructureType.List,
            title: "Card List",
            newItem: {
                image: {
                    id: 3,
                    type: StructureType.Image,
                    title: "Client image",
                    src: "",
                    alt: "featured image",
                },
            },
            value: [
                {
                    image: {
                        id: 3,
                        type: StructureType.Image,
                        title: "Client image",
                        src: "",
                        alt: "featured image",
                    },
                },
            ],
        });
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
