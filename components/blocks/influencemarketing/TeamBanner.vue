<template>
    <section v-if="!isEmpty">
        <div class="tw-h-screen tw-relative">
            <img
                :src="model.image.src"
                :alt="model.image.alt"
                class="tw-h-full tw-w-full tw-absolute tw-left-0 tw-top-0 tw-object-cover"
            />
            <div
                class="tw-w-full tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-text-center tw-max-w-4xl"
            >
                <h2
                    class="multicolor skyblue tw-font-bold tw-text-midnight tw-text-4xl md:tw-text-6xl tw-mb-7 -tw-tracking-wide tw-uppercase"
                    v-html="model.title.value"
                ></h2>
                <div
                    class="tw-flex tw-justify-between tw-items-center tw-max-w-md tw-mx-auto"
                >
                    <a
                        class="btn tw-w-fit tw-cursor-pointer tw-tracking-wide text midnight_text tw-mx-0 tw-flex tw-justify-center tw-items-center"
                        :href="model.link1.value"
                    >
                        <span class="tw-pr-2">{{ model.link1.title }}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="14"
                            viewBox="0 0 15 14"
                            fill="none"
                        >
                            <path
                                d="M1.25 13.25L13.75 0.75M13.75 0.75H4.375M13.75 0.75V10.125"
                                stroke="#131E29"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </a>
                    <a
                        class="btn tw-w-fit tw-cursor-pointer tw-tracking-wide text midnight_text tw-mx-0 tw-flex tw-justify-center tw-items-center"
                        :href="model.link2.value"
                    >
                        <span class="tw-pr-2">{{ model.link2.title }}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="14"
                            viewBox="0 0 13 14"
                            fill="none"
                        >
                            <path
                                d="M6.5 0.75V13.25M6.5 13.25L12.125 7.625M6.5 13.25L0.875 7.625"
                                stroke="#131E29"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { Theme } from "~/interfaces/ThemeEnum";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class TeamBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });
        blockAddItem(this.model, "link1", {
            id: 2,
            type: StructureType.Url,
            title: "Link 1",
            value: "",
        });
        blockAddItem(this.model, "link2", {
            id: 3,
            type: StructureType.Url,
            title: "Link 2",
            value: "",
        });
        blockAddItem(this.model, "image", {
            id: 4,
            type: StructureType.Image,
            title: "image",
            alt: "",
            src: "",
        });
        this.model = { ...this.model };
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
