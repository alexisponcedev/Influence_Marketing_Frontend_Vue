<template>
    <div>
        <img src="/blocks/TvAndAudioSmartChoice.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import { Theme } from "~/interfaces/ThemeEnum";

@Component
export default class BlockTvAndAudioSmartChoice extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({ type: Object }) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;

    reset(oldValue: any = {}) {
        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue,
                ...{
                    backgroundColor: {
                        id: 7,
                        type: StructureType.Color,
                        title: "Background color",
                        value: "#fff",
                    },
                },
            };
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        { title: "Light", value: this.Theme.light },
                        { title: "Dark", value: this.Theme.dark },
                    ],
                },
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Black Title",
                    value: "Make The",
                },
                coloredTitle: {
                    id: 2,
                    type: StructureType.String,
                    title: "Colored Title",
                    value: "Smart Choice",
                },
                paragraph: {
                    id: 3,
                    type: StructureType.Text,
                    title: "Paragraph",
                    value: "Owning a Smart TV makes life easy! Navigate the simple interface to stream over 500,000 movies and TV shows with the Roku OS. With Android TV, you can use your voice to ask the Google Assistant to find your favorite channels or connect your Alexa-enabled devices for hands-free control. Whether you’re looking to cut the cord or stream content, there's no shortage of options from which to choose.",
                },
                image: {
                    id: 4,
                    type: StructureType.Image,
                    title: "Upload left Image",
                    src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/867b78c83f/download_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.png-akouj4.png-xl6sfw.png",
                    alt: "Some note about this image",
                },
                link: {
                    id: 5,
                    type: StructureType.Url,
                    target: "_self",
                    title: "learn more",
                    value: "/products",
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch("isEmpty")
    onValueChanged() {
        if (this.isEmpty) this.reset();
    }
}
</script>

<style type="text/css"></style>
