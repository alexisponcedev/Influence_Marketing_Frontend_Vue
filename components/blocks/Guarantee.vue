<template>
    <div>
        <img src="/blocks/Guarantee.png" alt=""/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel, Watch} from "vue-property-decorator";
import {StructureType} from "~/models/StructureType";
import {Theme} from "~/interfaces/ThemeEnum";

@Component
export default class BlockGuarantee extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop(Number) readonly product_id!: number;
    @VModel({type: Object}) model!: Object;

    Theme = Theme;

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
                image: {
                    id: 1, type: StructureType.Image, title: 'Image',
                    src: 'https://public.hisenseportal.com/_next/static/media/guarantee.70088343.png',
                    alt: 'Image Alt'
                },
                title: {id: 2, type: StructureType.String, title: 'Title', value: ''},
                text: {
                    id: 3,
                    type: StructureType.Text,
                    title: 'gray Title',
                    value: '<p>For full program details, visit:<a href="#">http://hisense-promos.com/noregrets</a></p>'
                },

                leftTitle: {id: 4, type: StructureType.String, title: 'Left Title', value: 'Shop all eligible models'},
                leftText: {
                    id: 5,
                    type: StructureType.String,
                    title: 'Left Text',
                    value: 'Find the TV that’s right for you.'
                },

                rightTitle: {id: 6, type: StructureType.String, title: 'Right Title', value: 'Register your purchase'},
                rightText: {
                    id: 7,
                    type: StructureType.String,
                    title: 'Right Text',
                    value: 'Register your TV within 14 days.'
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
