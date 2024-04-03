<template>
    <div :style="borderStyle">
        <img
            v-if="model.image"
            :src="model.image.src"
            :alt="model.image.alt"
            :style="containerStyle"
        />
        <img
            v-else
            src="/blocks/ProductImageBox.png"
            alt=""
            :style="containerStyle"
        />
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";


@Component
export default class BlockProductImageBox extends Vue {
    @Prop(Number) readonly id: number | undefined
    @Prop(Number) readonly product_id!: number
    @VModel({type: Object}) model!: any

    Theme = Theme;
    borderColor: string = "#ffffff";
    borderBlock: number = 0;
    borderRadius: number = 0;
    margin: number = 0;

    reset(oldValue: any = {}) {

        if (oldValue && Object.keys(oldValue).length > 0) {
            this.model = {
                ...oldValue, ...{
                    backgroundColor: {id: 7, type: StructureType.Color, title: 'Background color', value: '#fff'}
                }
            }
        } else
            this.model = {
                theme: {
                    id: 0,
                    type: StructureType.Select,
                    title: 'Theme',
                    value: Theme.dark,
                    items: [
                        {title: 'Light', value: this.Theme.light},
                        {title: 'Dark', value: this.Theme.dark},
                    ]
                },
                image: {
                    id: 1,
                    type: StructureType.Image,
                    title: 'Upload Image',
                    src: 'https://assets.hisense-usa.com/assets/ContentBuilderImages/c7a41f8e33/A7H_Lifestyle_ScaleMaxWidthWzMwNDhd__ScaleMaxWidthWzMwNDhd.jpg-s4crsj.png-vt2y8s.png',
                    alt: 'Some note about this image',
                },
                borderColor: {
                    id: 2,
                    type: StructureType.Color,
                    title: "Border color [top and bottom]",
                    value: "#fff",
                },
                borderBlock: {
                    id: 3,
                    type: StructureType.Number,
                    title: "Border width [top and bottom]",
                    value: 5,
                },
                marginDesktop: {
                    id: 4,
                    type: StructureType.Number,
                    title: "Margin Desktop",
                    value: 40,
                },
                marginMobile: {
                    id: 5,
                    type: StructureType.Number,
                    title: "Margin Mobile",
                    value: 20,
                },
                borderRadiusDesktop: {
                    id: 6,
                    type: StructureType.Number,
                    title: "Border Radius Desktop",
                    value: 0,
                },
                borderRadiusMobile: {
                    id: 7,
                    type: StructureType.Number,
                    title: "Border Radius Mobile",
                    value: 0,
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    beforeDestroy() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize() {
        this.borderColor = this.model.borderColor?.value ?? "#ffffff";
        this.borderBlock = this.model.borderBlock?.value ?? 0;
        this.margin =
            window.innerWidth > 768
                ? this.model.marginDesktop?.value ?? 0
                : this.model.marginMobile?.value ?? 0;
        this.borderRadius =
            window.innerWidth > 768
                ? this.model.borderRadiusDesktop?.value ?? 0
                : this.model.borderRadiusMobile?.value ?? 0;
    }

    get containerStyle() {
        return {
            borderRadius: `${this.borderRadius}px`,
            height: "auto",
            margin: `${this.margin}px`,
            maxWidth: `calc(100% - ${this.margin * 2}px)`,
        };
    }

    get borderStyle() {
        return {
            borderStyle: "solid",
            borderColor: this.borderColor,
            borderBlockWidth: `${this.borderBlock}px`,
            borderInlineWidth: 0,
            display: "inline-flex",
        };
    }

    get marginValue() {
        return window.innerWidth > 768
            ? this.model.hasOwnProperty("marginDesktop")
                ? parseInt(this.model.marginDesktop.value)
                : 0
            : this.model.hasOwnProperty("marginMobile")
            ? parseInt(this.model.marginMobile.value)
            : 0;
    }

    get border() {
        return this.model.hasOwnProperty("borderBlock")
            ? parseInt(this.model.borderBlock.value)
            : 0;
    }

    get BorderColor() {
        return this.model.hasOwnProperty("borderColor")
            ? this.model.borderColor.value
            : "#ffffff";
    }

    get BorderRadius() {
        return window.innerWidth > 768
            ? this.model.hasOwnProperty("borderRadiusDesktop")
                ? parseInt(this.model.borderRadiusDesktop.value)
                : 0
            : this.model.hasOwnProperty("borderRadiusMobile")
            ? parseInt(this.model.borderRadiusMobile.value)
            : 0; 
    }

    @Watch("border")
    onBorderChanged(newValue: number) {
        this.borderBlock = newValue;
    }

    @Watch("BorderRadius")
    onBorderRadiusChanged(newValue: number) {
        this.borderRadius = newValue;
    }

    @Watch("BorderColor")
    onBorderColorChanged(newValue: string) {
        this.borderColor = newValue;
    }

    @Watch("marginValue")
    onMarginValueChanged(newValue: number) {
        this.margin = newValue;
    }

    @Watch("isEmpty")
    onValueChanged() {
        if (this.isEmpty) this.reset();
    }
}
</script>

<style type="text/css"></style>