<template>
    <div>
        <img src="/blocks/ULEDTextBox.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockULEDTextBox extends Vue {
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
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "Title",
                    value: "LASER TVS",
                },

                paragraphOne: {
                    id: 2,
                    type: StructureType.String,
                    title: "Description",
                    value: "Discover a New Expanse of Color",
                },
                paragraphTwo: {
                    id: 2,
                    type: StructureType.String,
                    title: "Description",
                    value: "Discover a New Expanse of Color",
                },
                text: {
                    id: 3,
                    type: StructureType.Text,
                    title: 'Text',
                    value: 'Say hello to your new TV. Our ULED Series of TVs brings you bigger screens, multiple platforms and premium tech like 4K ULED. The result? Pictures get brighter, colors are more accurate, motion moves more fluidly and contrast is stronger. So streaming shows, watching sports and gaming, err, games, all looks better than ever.'
                }
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

<style type="text/css">

</style>
