<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div
                class="tw-container tw-mx-auto tw-px-4 tw-py-16 md:tw-py-[100px]"
            >
                <div
                    class="tw-flex tw-items-start tw-justify-between tw-flex-wrap"
                >
                    <h4
                        class="tw-w-full md:tw-w-1/3 tw-text-2xl md:tw-text-[34px] tw-text-white tw-leading-none tw-font-bold tw-uppercase -tw-tracking-wide tw-mb-8 md:tw-mb-[60px]"
                        v-html="model.title.value"
                    ></h4>
                    <div
                        class="tw-w-full md:tw-w-1/2 xl:tw-w-1/2 tw-grid tw-grid-cols-4 tw-gap-[15px]"
                    >
                        <div
                            v-for="(item, index) in model.list.value"
                            :key="index"
                            class="tw-col-span-4 xs:tw-col-span-2 md:tw-col-span-1 tw-border tw-border-solid tw-border-purple tw-rounded-md tw-flex tw-justify-center tw-items-center tw-px-4 tw-h-0 tw-pt-[100%] tw-relative tw-overflow-hidden"
                        >
                            <img
                                :src="item.image.src"
                                :alt="item.image.alt"
                                class="tw-w-full tw-h-full tw-object-cover tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-y-1/2 -tw-translate-x-1/2"
                            />
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
export default class SolutionsClients extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 0,
            type: StructureType.SimpleText,
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
