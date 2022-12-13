<template>
    <div>
        <img src="/blocks/ProductTextWithIcon.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockProductTextWithIcon extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: any;

    Theme = Theme;

    product: Object = {};
    loadingProduct: boolean = true;


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
                    title: "Theme",
                    value: Theme.dark,
                    items: [
                        {title: "Light", value: this.Theme.light},
                        {title: "Dark", value: this.Theme.dark},
                    ],
                },
                list: {
                    id: 1,
                    type: StructureType.List,
                    title: "features with icon items",
                    newItem: {
                        image: {
                            id: 0,
                            type: StructureType.Image,
                            title: "image",
                            src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/3494e63c06/Film_Maker_Mode__ScaleMaxWidthWzMwNDhd.png-tzyefj.png",
                            alt: "featured image",
                        },
                        title: {
                            id: 1,
                            type: StructureType.String,
                            title: "title",
                            value: "Filmmaker Mode",
                        },
                        description: {
                            id: 2,
                            type: StructureType.String,
                            title: "feature description",
                            value:
                                "By disabling all post-processing (e.g. motion smoothing) and preserving the correct aspect ratios, colors and frame rates, Filmmaker Mode enables your TV to display the movie or television show’s content precisely as it was intended by the filmmaker.",
                        },
                    },
                    value: [
                        {
                            image: {
                                id: 0,
                                type: StructureType.Image,
                                title: "image",
                                src: "https://assets.hisense-usa.com/assets/ContentBuilderImages/3494e63c06/Film_Maker_Mode__ScaleMaxWidthWzMwNDhd.png-tzyefj.png",
                                alt: "featured image",
                            },
                            title: {
                                id: 1,
                                type: StructureType.String,
                                title: "title",
                                value: "Filmmaker Mode",
                            },
                            description: {
                                id: 2,
                                type: StructureType.String,
                                title: "feature description",
                                value:
                                    "By disabling all post-processing (e.g. motion smoothing) and preserving the correct aspect ratios, colors and frame rates, Filmmaker Mode enables your TV to display the movie or television show’s content precisely as it was intended by the filmmaker.",
                            },
                        },
                    ],
                },
            };
    }

    mounted() {
        if (this.isEmpty) this.reset();

    }


    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }

    @Watch('isEmpty')
    onValueChanged() {

        if (this.isEmpty) this.reset();
    }
}
</script>

<style type="text/css"></style>
