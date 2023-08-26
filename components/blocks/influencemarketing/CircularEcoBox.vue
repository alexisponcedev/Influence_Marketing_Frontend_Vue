<template>
    <section v-if="!isEmpty">
        <div class="tw-bg-midnight">
            <div class="tw-relative tw-overflow-hidden tw-py-32">
                <div
                    class="tw-container tw-mx-auto tw-px-4 tw-my-14 tw-relative tw-z-[2]"
                >
                    <div class="tw-w-full tw-max-w-xl tw-mx-auto">
                        <div
                            class="tw-relative tw-bg-skyblue tw-rounded-full tw-flex tw-justify-center tw-items-center tw-w-full tw-pt-[100%]"
                        >
                            <div
                                class="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-rounded-full tw-h-full tw-bg-[radial-gradient(55.6%_55.6%_at_100%_100%,_#B6DCE4_0%,_rgba(182,_220,_228,_0)_100%)]"
                            ></div>
                            <div
                                class="tw-absolute tw-w-[90%] tw-left-1/2 -tw-translate-x-1/2 tw-top-1/2 -tw-translate-y-1/2 tw-text-center"
                            >
                                <h3
                                    class="tw-text-2xl sm:tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-midnight -tw-tracking-wide tw-mb-7 tw-uppercase"
                                    v-html="model.title.value"
                                ></h3>
                                <a
                                    :href="model.link.value"
                                    class="btn tw-block tw-w-fit tw-mx-auto tw-cursor-pointer tw-tracking-wide hover:tw-text-skyblue"
                                >
                                    {{ model.link.title }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="tw-w-1/2 tw-absolute tw-right-24 sm:tw-right-48 tw-top-1/2 tw-h-1/2 tw-z-[1] -tw-translate-y-1/2 tw-min-h-[320px] sm:tw-min-h-[544px] md:tw-min-h-[580px]"
                >
                    <div v-for="n in 15" :key="n" :class="`ripple_animation`">
                        <div
                            class="tw-relative tw-border-skyblue tw-border-8 tw-border-solid tw-rounded-full tw-flex tw-justify-center tw-items-center tw-w-full tw-pt-[100%]"
                        ></div>
                    </div>
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
export default class CircularEcoBox extends Vue {
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
        blockAddItem(this.model, "link", {
            id: 2,
            type: StructureType.Url,
            title: "Link",
            value: "",
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
