<template>
    <div v-if="!isEmpty">
        <section>
            <div class="tw-h-screen tw-relative">
                <img
                    :src="model.image.src"
                    :alt="model.image.alt"
                    class="tw-h-full tw-w-full tw-absolute tw-left-0 tw-top-0 tw-object-cover"
                />
                <div
                    class="tw-w-full tw-absolute tw-left-0 tw-top-1/2 -tw-translate-y-1/2 tw-text-center"
                >
                    <h2
                        :class="`multicolor ${
                            model.theme.value === 'light'
                                ? 'white-text'
                                : 'skyblue'
                        } tw-font-bold tw-text-midnight tw-text-4xl md:tw-text-6xl tw-my-7 -tw-tracking-wide tw-uppercase`"
                        v-html="model.title.value"
                    ></h2>
                    <div
                        class="tw-text-midnight tw-max-w-[625px] tw-mx-auto"
                        v-html="model.text.value"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { Theme } from "~/interfaces/ThemeEnum";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";

@Component
export default class ServicesBanner extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: boolean | undefined;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    mounted() {
        blockAddItem(this.model, "theme", {
            id: 0,
            type: StructureType.Select,
            title: "Theme",
            value: Theme.dark,
            items: [
                { title: "Light", value: this.Theme.light },
                { title: "Dark", value: this.Theme.dark },
            ],
        });
        blockAddItem(this.model, "title", {
            id: 1,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });
        blockAddItem(this.model, "text", {
            id: 2,
            type: StructureType.SimpleText,
            title: "Text",
            value: "",
        });
        blockAddItem(this.model, "image", {
            id: 3,
            type: StructureType.Image,
            title: "Upload Image",
            src: "",
            alt: "Some note about this image",
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
